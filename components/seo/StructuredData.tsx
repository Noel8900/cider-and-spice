// Server component — no "use client" directive
// Renders a JSON-LD <script> tag for structured data.

interface Props {
  schema: Record<string, unknown>;
}

export default function StructuredData({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
