"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import {
  ArrowDownToLine,
  Bot,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Store,
  TriangleAlert,
} from "lucide-react";
import { MessageResponse } from "@/components/ai-elements/message";
import type { BusinessPlanData, BusinessPlanSection } from "@/lib/business-plan/types";

const STARTER_QUESTION_GROUPS = [
  {
    label: "Investment",
    questions: [
      "What is the investment case?",
      "How do the incubator and kitchen support the investment case?",
    ],
  },
  {
    label: "Incubator",
    questions: [
      "How does the incubator graduation pathway work?",
      "What support does a vendor receive before graduation?",
    ],
  },
  {
    label: "Kitchen",
    questions: [
      "What are the shared commercial kitchen rules?",
      "What food safety controls are in the kitchen manual?",
    ],
  },
];

const LOCATION_CONCEPTS = [
  {
    name: "West Picacho / Motel Boulevard MRA corridor",
    format: "Lead redevelopment concept",
    rationale:
      "Best grant and public-impact story because the MRA framework emphasizes revitalization, pedestrian-friendly reuse, commercial activity, and community-serving public space.",
    risk: "Requires site-by-site broker, zoning, code, landlord, and cost diligence before any lease or buildout decision.",
    nextStep:
      "Open City Economic Development and MRA conversations; shortlist vacant or underused commercial spaces with food-service feasibility.",
  },
  {
    name: "3400 W Picacho Ave area",
    format: "Phased indoor/outdoor incubator hub",
    rationale:
      "Large westside commercial land concept with arterial visibility, outdoor-event potential, commissary expansion room, and a strong phased-growth story.",
    risk: "May need stronger destination programming, utilities review, access review, and careful capital phasing to avoid overbuilding early.",
    nextStep:
      "Confirm parcel availability, infrastructure capacity, parking, outdoor assembly rules, and realistic first-phase square footage.",
  },
  {
    name: "Pan Am Shopping Center / 1719 E University Ave",
    format: "University-corridor student and community hall",
    rationale:
      "Strong fit for NMSU-adjacent traffic, students, staff, families, visiting teams, and weekday lunch/evening programming.",
    risk: "Retail bay dimensions, parking demand, landlord use restrictions, and alcohol-service compatibility need diligence.",
    nextStep:
      "Validate available bay sizes near the 8,000-10,000 SF target and test NMSU/DACC partnership interest.",
  },
  {
    name: "Mesilla Valley Mall / 700 S Telshor Blvd",
    format: "Large-format adaptive reuse destination",
    rationale:
      "Best destination-scale reuse concept for a food hall, entertainment section, rental rooms, local retail, and visible kitchen production zones.",
    risk: "Anchor-scale space can raise leasehold, mechanical, wayfinding, and mall-traffic dependency risks.",
    nextStep:
      "Review mall ownership goals, anchor-box subdivisions, event allowances, grease/hood infrastructure, and tenant-improvement economics.",
  },
];

const MOCKUPS = [
  {
    title: "MRA Redevelopment Food Hall",
    image: "/assets/mockups/mra-redevelopment-food-hall.png",
    alt: "Concept mockup of an adaptive reuse Las Cruces food hall with vendor stalls, stage, seating, glass rooms, cider bar, retail, and visible kitchens.",
    caption: "Lead corridor concept with outdoor plaza energy and a visible commissary zone.",
  },
  {
    title: "West Picacho Incubator Hub",
    image: "/assets/mockups/west-picacho-incubator-hub.png",
    alt: "Concept mockup of a West Picacho indoor outdoor food hall incubator hub with shade plaza, stalls, seating, stage, retail, and kitchen zones.",
    caption: "Phased indoor/outdoor hub with event plaza and expansion-ready layout.",
  },
  {
    title: "University-Corridor Food Hall",
    image: "/assets/mockups/university-corridor-food-hall.png",
    alt: "Concept mockup of a university corridor food hall with students, vendor stalls, shared seating, stage, cider bar, rentable rooms, and retail.",
    caption: "Student and community format with study-friendly seating and programming rooms.",
  },
  {
    title: "Mall Adaptive-Reuse Destination",
    image: "/assets/mockups/mall-adaptive-reuse-food-hall.png",
    alt: "Concept mockup of a mall adaptive reuse food hall with entertainment stage, vendor stalls, cider bar, retail wall, rental rooms, and kitchen areas.",
    caption: "Large-format destination concept for entertainment, events, and local retail.",
  },
];

type ReaderData = Omit<BusinessPlanData, "chunks">;

type Props = {
  initialAuthorized: boolean;
  passcodeConfigured: boolean;
};

function SectionContent({ section }: { section: BusinessPlanSection }) {
  const lines = section.content.split("\n").filter((line) => line.trim().length > 0);

  return (
    <section id={section.id} className="plan-section">
      <p className="section-document-label">{section.documentTitle}</p>
      <h2>{section.title}</h2>
      {lines.map((line, index) => {
        const isTableLine = line.includes(" | ");
        return (
          <p key={`${section.id}-${index}`} className={isTableLine ? "table-like-line" : undefined}>
            {line}
          </p>
        );
      })}
    </section>
  );
}

function LocationsMockupsSection() {
  return (
    <section id="locations-and-mockups" className="locations-section">
      <div className="locations-heading">
        <div>
          <p className="eyebrow">Locations + Mockups</p>
          <h2>Las Cruces Site Concepts</h2>
        </div>
        <div className="candidate-note">
          <TriangleAlert size={18} />
          Candidate concepts pending broker/site diligence.
        </div>
      </div>

      <p className="locations-lede">
        This shortlist prioritizes grant potential, redevelopment impact, and public pitch value.
        The current grant assumption remains a $25,000 maximum for Renovate Main Street where
        applicable.
      </p>

      <div className="location-card-grid">
        {LOCATION_CONCEPTS.map((location) => (
          <article key={location.name} className="location-card">
            <div className="location-card-icon">
              <MapPin size={20} />
            </div>
            <p className="location-format">{location.format}</p>
            <h3>{location.name}</h3>
            <p>{location.rationale}</p>
            <div className="location-callouts">
              <div>
                <TriangleAlert size={16} />
                <span>{location.risk}</span>
              </div>
              <div>
                <ClipboardCheck size={16} />
                <span>{location.nextStep}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="comparison-wrap" aria-label="Location comparison table">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Candidate concept</th>
              <th>Strength</th>
              <th>Primary risk</th>
              <th>Ideal format</th>
              <th>Next diligence step</th>
            </tr>
          </thead>
          <tbody>
            {LOCATION_CONCEPTS.map((location) => (
              <tr key={location.name}>
                <td>{location.name}</td>
                <td>{location.rationale}</td>
                <td>{location.risk}</td>
                <td>{location.format}</td>
                <td>{location.nextStep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mockup-gallery" aria-label="Concept interior mockups">
        {MOCKUPS.map((mockup) => (
          <figure key={mockup.title} className="mockup-card">
            <Image src={mockup.image} alt={mockup.alt} width={1400} height={800} />
            <figcaption>
              <span>
                <Store size={16} />
                {mockup.title}
              </span>
              {mockup.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function LockScreen({
  onUnlocked,
  passcodeConfigured,
}: {
  onUnlocked: () => void;
  passcodeConfigured: boolean;
}) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/business-plan/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Unable to unlock the review room.");
      }

      onUnlocked();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to unlock the review room.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="locked-shell">
      <section className="locked-panel">
        <div className="lock-icon">
          <LockKeyhole size={28} />
        </div>
        <p className="eyebrow">Protected Review Room</p>
        <h1>Business Plan Access</h1>
        <p>
          Enter the shared review passcode to read the full Las Cruces Culinary Innovation Hub
          business plan and ask document-grounded AI questions.
        </p>
        {!passcodeConfigured ? (
          <div className="error-box">
            BUSINESS_PLAN_PASSCODE is not configured. Add it to your deployment environment before
            sharing this page.
          </div>
        ) : (
          <form className="passcode-form" onSubmit={handleSubmit}>
            <label htmlFor="passcode">Review passcode</label>
            <input
              id="passcode"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Enter passcode"
            />
            {error ? <p className="form-error">{error}</p> : null}
            <button disabled={isSubmitting || !passcode} type="submit">
              <ShieldCheck size={18} />
              {isSubmitting ? "Checking..." : "Unlock Review Room"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function ChatPanel({ onCitationClick }: { onCitationClick: (sectionId: string) => void }) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/business-plan-chat" }),
  });
  const isBusy = status === "submitted" || status === "streaming";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const latestAssistantText = useMemo(() => {
    const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");
    if (!latestAssistant) return "";

    return latestAssistant.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("\n")
      .trim();
  }, [messages]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  function ask(text: string) {
    if (!text.trim()) return;
    sendMessage({ text: text.trim() });
    setInput("");
    setCopied(false);
  }

  function clearChat() {
    setMessages([]);
    setInput("");
    setCopied(false);
  }

  async function copyLatestAnswer() {
    if (!latestAssistantText) return;
    await navigator.clipboard.writeText(latestAssistantText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <aside className="assistant-panel" aria-label="Business plan AI assistant">
      <header className="assistant-header">
        <div>
          <p className="eyebrow">Diligence-grounded AI</p>
          <h2>Ask the Plan</h2>
        </div>
        <Bot size={24} />
      </header>
      <div className="assistant-disclaimer">
        Answers are limited to the business plan, incubator playbook, and kitchen manual. If the
        library does not specify an answer, the assistant should say so.
      </div>
      <div className="assistant-tools" aria-label="Assistant actions">
        <button disabled={!latestAssistantText} onClick={copyLatestAnswer} type="button">
          <ClipboardCheck size={15} />
          {copied ? "Copied" : "Copy answer"}
        </button>
        <button disabled={messages.length === 0} onClick={clearChat} type="button">
          <RotateCcw size={15} />
          Clear
        </button>
      </div>
      <div
        ref={scrollerRef}
        className="messages"
        onClick={(event) => {
          const target = event.target;
          if (!(target instanceof HTMLAnchorElement)) return;
          if (!target.hash) return;

          event.preventDefault();
          onCitationClick(target.hash.slice(1));
        }}
      >
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Start with a focused diligence question, or use one of these prompts.</p>
            {STARTER_QUESTION_GROUPS.map((group) => (
              <div className="starter-group" key={group.label}>
                <span>{group.label}</span>
                <div className="starter-grid">
                  {group.questions.map((question) => (
                    <button key={question} onClick={() => ask(question)} type="button">
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          messages.map((message) => (
            <article key={message.id} className={`message ${message.role}`}>
              <span>{message.role === "user" ? "You" : "Assistant"}</span>
              <div>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>;
                  }
                  return null;
                })}
              </div>
            </article>
          ))
        )}
        {error ? (
          <div className="error-box">
            The review room could not answer that request. Try a more specific question about the
            business plan, incubator, kitchen, funding, compliance, or implementation details.
          </div>
        ) : null}
      </div>
      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              ask(input);
            }
          }}
          placeholder="Ask about funding, incubator cohorts, kitchen rules, food safety, risks, or implementation..."
          rows={3}
        />
        <button disabled={isBusy || !input.trim()} type="submit" aria-label="Send question">
          <Send size={18} />
        </button>
        <p className="assistant-hint">Use Ctrl+Enter to send. Citations jump to source sections.</p>
      </form>
    </aside>
  );
}

export function BusinessPlanReviewRoom({ initialAuthorized, passcodeConfigured }: Props) {
  const [authorized, setAuthorized] = useState(initialAuthorized);
  const [activeMobileTab, setActiveMobileTab] = useState<"reader" | "assistant">("reader");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeDocumentId, setActiveDocumentId] = useState("all");
  const [data, setData] = useState<ReaderData | null>(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!authorized) return;

    let cancelled = false;
    fetch("/api/business-plan/content")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load the protected business plan.");
        return (await response.json()) as ReaderData;
      })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Unable to load document.");
      });

    return () => {
      cancelled = true;
    };
  }, [authorized]);

  const filteredSections = useMemo(() => {
    if (!data) return [];
    const trimmed = query.trim().toLowerCase();
    const documentFilteredSections =
      activeDocumentId === "all"
        ? data.sections
        : data.sections.filter((section) => section.documentId === activeDocumentId);

    if (!trimmed) return documentFilteredSections;

    return documentFilteredSections.filter(
      (section) =>
        section.documentTitle.toLowerCase().includes(trimmed) ||
        section.title.toLowerCase().includes(trimmed) ||
        section.content.toLowerCase().includes(trimmed),
    );
  }, [activeDocumentId, data, query]);

  const locationSectionMatches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (activeDocumentId !== "all" && activeDocumentId !== "business-plan") return false;
    if (!trimmed) return true;
    const searchable = [
      "locations mockups candidate concepts broker site diligence $25,000 maximum renovate main street",
      ...LOCATION_CONCEPTS.flatMap((location) => [
        location.name,
        location.format,
        location.rationale,
        location.risk,
        location.nextStep,
      ]),
      ...MOCKUPS.flatMap((mockup) => [mockup.title, mockup.caption, mockup.alt]),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(trimmed);
  }, [activeDocumentId, query]);

  const activeDocumentTitle = useMemo(() => {
    if (!data || activeDocumentId === "all") return "Full diligence library";
    return data.documents.find((document) => document.id === activeDocumentId)?.title || "Selected document";
  }, [activeDocumentId, data]);

  async function handleLogout() {
    await fetch("/api/business-plan/auth", { method: "DELETE" });
    setAuthorized(false);
    setData(null);
  }

  function handleCitationClick(sectionId: string) {
    setActiveMobileTab("reader");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  if (!authorized) {
    return (
      <LockScreen
        passcodeConfigured={passcodeConfigured}
        onUnlocked={() => {
          setAuthorized(true);
        }}
      />
    );
  }

  return (
    <main className="review-room">
      <header className="review-topbar">
        <div>
          <p className="eyebrow">Protected Review Room</p>
          <h1>{data?.title || "Business Plan Review Room"}</h1>
        </div>
        <nav>
          {data?.documents.map((document) => (
            <a
              href={`/api/business-plan/download?document=${encodeURIComponent(document.id)}`}
              key={document.id}
            >
              <ArrowDownToLine size={18} />
              {document.id === "business-plan" ? "Business Plan" : document.id === "incubator-playbook" ? "Incubator" : "Kitchen"}
            </a>
          ))}
          <button onClick={handleLogout} type="button">
            <LogOut size={18} />
            Sign out
          </button>
        </nav>
      </header>

      <div className="mobile-tabs" role="tablist" aria-label="Review room panels">
        <button
          className={activeMobileTab === "reader" ? "active" : ""}
          onClick={() => setActiveMobileTab("reader")}
          type="button"
        >
          <FileText size={18} />
          Read Plan
        </button>
        <button
          className={activeMobileTab === "assistant" ? "active" : ""}
          onClick={() => setActiveMobileTab("assistant")}
          type="button"
        >
          <Bot size={18} />
          Ask AI
        </button>
      </div>

      <div className="review-grid">
        <aside className={`outline-panel ${menuOpen ? "open" : ""}`}>
          <button className="outline-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">
            <Menu size={18} />
            Document Outline
          </button>
          <div className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the library"
            />
          </div>
          {data ? (
            <div className="document-filter" aria-label="Filter by document">
              <button
                className={activeDocumentId === "all" ? "active" : ""}
                onClick={() => setActiveDocumentId("all")}
                type="button"
              >
                All
              </button>
              {data.documents.map((document) => (
                <button
                  className={activeDocumentId === document.id ? "active" : ""}
                  key={document.id}
                  onClick={() => setActiveDocumentId(document.id)}
                  type="button"
                >
                  {document.id === "business-plan" ? "Plan" : document.id === "incubator-playbook" ? "Incubator" : "Kitchen"}
                </button>
              ))}
            </div>
          ) : null}
          <nav aria-label="Business plan outline">
            {activeDocumentId === "all" || activeDocumentId === "business-plan" ? (
              <a href="#locations-and-mockups" onClick={() => setMenuOpen(false)}>
                Locations + Mockups
              </a>
            ) : null}
            {filteredSections.map((section) => (
              <a
                key={section.id}
                className={section.level > 2 ? "subsection-link" : undefined}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className={`reader-panel ${activeMobileTab === "reader" ? "active" : ""}`}>
          {loadError ? <div className="error-box">{loadError}</div> : null}
          {!data && !loadError ? <div className="loading-state">Loading protected document...</div> : null}
          {data ? (
            <>
              <section className="reader-intro">
                  <p className="eyebrow">Diligence library</p>
                <h2>
                  {query
                    ? `${filteredSections.length + (locationSectionMatches ? 1 : 0)} matching sections`
                    : activeDocumentTitle}
                </h2>
                <p>
                  Use the outline or search to navigate the full diligence library. AI citations
                  link back to these document sections. Use the document filter to focus on the
                  business plan, incubator playbook, or kitchen manual.
                </p>
              </section>
              {locationSectionMatches ? <LocationsMockupsSection /> : null}
              {filteredSections.map((section) => (
                <SectionContent key={section.id} section={section} />
              ))}
              {filteredSections.length === 0 ? (
                <div className="empty-results">
                  <h2>No matching sections</h2>
                  <p>Try a broader search term such as grant, cider, jobs, or risk.</p>
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        <div className={`assistant-mobile-wrap ${activeMobileTab === "assistant" ? "active" : ""}`}>
          <ChatPanel onCitationClick={handleCitationClick} />
        </div>
      </div>
    </main>
  );
}
