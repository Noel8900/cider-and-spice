/**
 * lib/api.ts
 * NoCodeBackend REST API client for the LC Culinary Hub.
 *
 * MCP server: https://app.nocodebackend.com/api/mcp/sse
 * MCP config: .claude/settings.json (gitignored — see .claude/settings.example.json)
 *
 * Environment variables (set in .env.local — never commit):
 *   NEXT_PUBLIC_NCB_BASE_URL  – https://app.nocodebackend.com
 *   NCB_API_KEY               – secret key (server-side only; no NEXT_PUBLIC_ prefix)
 *
 * NEXT_PUBLIC_NCB_BASE_URL is safe to expose in the browser (it\'s just a URL).
 * NCB_API_KEY must only be used in Server Components, Route Handlers, or
 * Server Actions — never in client components.
 *
 * Endpoint path conventions for NoCodeBackend:
 *   Table list:   /api/tables/{tableName}
 *   Single row:   /api/tables/{tableName}/{id}
 *   The NCB_TABLE_PREFIX constant below sets the shared prefix so convenience
 *   wrappers only need the table name, e.g. table('vendors') → /api/tables/vendors
 */

/** Shared path prefix for all NoCodeBackend table endpoints. */
const NCB_TABLE_PREFIX = '/api/tables'

/** Build a fully-qualified table path: table('vendors') → '/api/tables/vendors' */
const table = (name: string) => `${NCB_TABLE_PREFIX}/${name}`

// ─── Types ───────────────────────────────────────────────────────────────────

/** Generic paginated list envelope returned by NoCodeBackend. */
export interface NcbListResponse<T = Record<string, unknown>> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

/** Single-record envelope. */
export interface NcbRecordResponse<T = Record<string, unknown>> {
  data: T
}

/** Standardised error shape returned by every function on failure. */
export interface NcbError {
  ok: false
  status: number
  message: string
}

/** Discriminated union — callers narrow with `if (!result.ok)`. */
export type NcbResult<T> =
  | ({ ok: true } & T)
  | NcbError

// ─── Query parameter helpers ──────────────────────────────────────────────────

export interface ListOptions {
  /** Page number (1-based). */
  page?: number
  /** Records per page. */
  pageSize?: number
  /** Field to sort by. */
  sortBy?: string
  /** 'asc' or 'desc'. */
  sortDir?: 'asc' | 'desc'
  /** Extra filter params forwarded as-is, e.g. { status: 'active' }. */
  filters?: Record<string, string | number | boolean>
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

/**
 * Low-level fetch wrapper that attaches auth headers and normalises errors.
 * Call this from the exported helpers rather than directly.
 *
 * @param path    Path appended to NEXT_PUBLIC_NCB_BASE_URL, e.g. '/vendors'
 * @param init    Standard RequestInit (method, body, etc.)
 * @returns       Parsed JSON on success, or throws an NcbError-shaped object
 */
async function ncbFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_NCB_BASE_URL
  const apiKey  = process.env.NCB_API_KEY

  if (!baseUrl) {
    throw {
      ok: false,
      status: 0,
      message: 'NEXT_PUBLIC_NCB_BASE_URL is not set. Add it to .env.local.',
    } satisfies NcbError
  }

  if (!apiKey) {
    throw {
      ok: false,
      status: 0,
      message:
        'NCB_API_KEY is not set. Add it to .env.local and only use this ' +
        'function in Server Components or Route Handlers.',
    } satisfies NcbError
  }

  const url = `${baseUrl.replace(/\/$/, '')}${path}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    ...((init.headers as Record<string, string>) ?? {}),
  }

  let response: Response
  try {
    response = await fetch(url, { ...init, headers })
  } catch (networkErr) {
    throw {
      ok: false,
      status: 0,
      message: `Network error reaching ${url}: ${String(networkErr)}`,
    } satisfies NcbError
  }

  if (!response.ok) {
    let message = `HTTP ${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.message) message = body.message
      else if (body?.error) message = body.error
    } catch {
      // Body wasn\'t JSON — keep the status-line message
    }
    throw { ok: false, status: response.status, message } satisfies NcbError
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return undefined as unknown as T

  return response.json() as Promise<T>
}

// ─── Exported API functions ───────────────────────────────────────────────────

/**
 * Fetch a list of records from the given endpoint.
 *
 * @example
 *   const result = await getRecords('/api/tables/vendors', { page: 1, pageSize: 20 })
 *   if (!result.ok) console.error(result.message)
 *   else console.log(result.data)
 */
export async function getRecords<T = Record<string, unknown>>(
  endpoint: string,
  options: ListOptions = {},
): Promise<NcbResult<NcbListResponse<T>>> {
  const { page, pageSize, sortBy, sortDir, filters } = options

  const params = new URLSearchParams()
  if (page     !== undefined) params.set('page',     String(page))
  if (pageSize !== undefined) params.set('pageSize', String(pageSize))
  if (sortBy)                 params.set('sortBy',   sortBy)
  if (sortDir)                params.set('sortDir',  sortDir)
  if (filters) {
    for (const [k, v] of Object.entries(filters)) params.set(k, String(v))
  }

  const qs = params.size ? `?${params.toString()}` : ''

  try {
    const raw = await ncbFetch<NcbListResponse<T>>(`${endpoint}${qs}`, {
      method: 'GET',
      // Server-side: revalidate every 60 s; override per call with cache option
      next: { revalidate: 60 },
    })
    return { ok: true, ...raw }
  } catch (err) {
    return err as NcbError
  }
}

/**
 * Fetch a single record by ID.
 *
 * @example
 *   const result = await getRecord('/api/tables/vendors', 'abc123')
 *   if (!result.ok) console.error(result.message)
 *   else console.log(result.data)
 */
export async function getRecord<T = Record<string, unknown>>(
  endpoint: string,
  id: string,
): Promise<NcbResult<NcbRecordResponse<T>>> {
  try {
    const raw = await ncbFetch<NcbRecordResponse<T>>(
      `${endpoint}/${encodeURIComponent(id)}`,
      { method: 'GET', next: { revalidate: 60 } },
    )
    return { ok: true, ...raw }
  } catch (err) {
    return err as NcbError
  }
}

/**
 * Create a new record.
 *
 * @example
 *   const result = await createRecord('/api/tables/leads', {
 *     name: 'Jane Smith',
 *     email: 'jane@example.com',
 *     interest: 'vendor',
 *   })
 */
export async function createRecord<
  TPayload = Record<string, unknown>,
  TResponse = Record<string, unknown>,
>(
  endpoint: string,
  data: TPayload,
): Promise<NcbResult<NcbRecordResponse<TResponse>>> {
  try {
    const raw = await ncbFetch<NcbRecordResponse<TResponse>>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return { ok: true, ...raw }
  } catch (err) {
    return err as NcbError
  }
}

/**
 * Update an existing record by ID (PATCH — partial update).
 *
 * @example
 *   const result = await updateRecord('/api/tables/vendors', 'abc123', { status: 'approved' })
 */
export async function updateRecord<
  TPayload = Record<string, unknown>,
  TResponse = Record<string, unknown>,
>(
  endpoint: string,
  id: string,
  data: TPayload,
): Promise<NcbResult<NcbRecordResponse<TResponse>>> {
  try {
    const raw = await ncbFetch<NcbRecordResponse<TResponse>>(
      `${endpoint}/${encodeURIComponent(id)}`,
      { method: 'PATCH', body: JSON.stringify(data) },
    )
    return { ok: true, ...raw }
  } catch (err) {
    return err as NcbError
  }
}

/**
 * Delete a record by ID. Returns `{ ok: true }` on success (204 No Content).
 *
 * @example
 *   const result = await deleteRecord('/api/tables/leads', 'abc123')
 *   if (!result.ok) console.error(result.message)
 */
export async function deleteRecord(
  endpoint: string,
  id: string,
): Promise<NcbResult<Record<never, never>>> {
  try {
    await ncbFetch<undefined>(
      `${endpoint}/${encodeURIComponent(id)}`,
      { method: 'DELETE' },
    )
    return { ok: true }
  } catch (err) {
    return err as NcbError
  }
}

// ─── Domain-specific convenience wrappers ────────────────────────────────────
// These thin wrappers enforce the endpoint path and give callers typed payloads.
// Add more as the data model grows (see CLAUDE.md → Data Models).

export interface Vendor {
  id?: string
  /** Full legal name of the applicant */
  name: string
  /** Trade name / food-concept name shown to the public */
  business_name: string
  /** Contact e-mail address */
  email: string
  /** Contact phone number (optional) */
  phone?: string
  /** Primary cuisine category */
  cuisine_type: string
  /** Preferred booth size key, e.g. 'small_8x8' | 'medium_8x12' */
  booth_preference?: string
  /** Short concept description — max ~500 chars */
  description?: string
  status?: 'pending' | 'approved' | 'active' | 'inactive'
}

export interface Lead {
  id?: string
  name: string
  email: string
  interest: 'vendor' | 'investor' | 'cider-club' | 'general'
  source?: string
}

export interface CiderClubSignup {
  id?: string
  email: string
  tier: 'taster' | 'enthusiast' | 'connoisseur'
  submitted_at?: string
}

/** List vendors — for use in Server Components or Route Handlers. */
export const getVendors = (opts?: ListOptions) =>
  getRecords<Vendor>(table('vendors'), opts)

/** Submit a vendor application. */
export const submitVendorApplication = (data: Omit<Vendor, 'id' | 'status'>) =>
  createRecord<Omit<Vendor, 'id' | 'status'>, Vendor>(table('vendors'), data)

/** Submit a general interest / newsletter lead. */
export const submitLead = (data: Omit<Lead, 'id'>) =>
  createRecord<Omit<Lead, 'id'>, Lead>(table('leads'), data)

/** Submit a Cider Club membership signup. */
export const submitCiderClub = (data: Omit<CiderClubSignup, 'id' | 'submitted_at'>) =>
  createRecord<Omit<CiderClubSignup, 'id' | 'submitted_at'>, CiderClubSignup>(
    table('cider-club'),
    data,
  )
