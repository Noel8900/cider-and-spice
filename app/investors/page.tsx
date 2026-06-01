import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invest in Cider & Spice | Las Cruces Culinary Innovation Hub",
  description:
    "Private investor overview for Cider & Spice, Las Cruces' first food hall and craft cider bar.",
};

export default function InvestorsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#2c2416" }}>
      <iframe
        src="/investor-page-deploy/index.html"
        title="Cider & Spice Investor Overview"
        style={{
          width: "100%",
          minHeight: "100vh",
          border: 0,
          display: "block",
        }}
      />
    </main>
  );
}
