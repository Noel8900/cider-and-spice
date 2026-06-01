export const runtime = 'edge';

export async function POST() {
  return new Response(JSON.stringify({ error: 'Not available' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}
