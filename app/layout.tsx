import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/shell/TopNav";
import { GlobalFilters } from "@/components/shell/GlobalFilters";
import { SideRail } from "@/components/shell/SideRail";
import { LiveTicker } from "@/components/shell/LiveTicker";
import { apiGet } from "@/lib/api";
import type { LiveMatch } from "@/lib/types";

export const metadata: Metadata = {
  title: "Chili Analysis",
  description: "Soccer analytics platform — web dashboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const live = await apiGet<LiveMatch>("/api/live-ticker");
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="app-shell">
          <TopNav />
          <GlobalFilters />
          <div className="app-body">
            <SideRail />
            <main className="content-area">{children}</main>
          </div>
          <LiveTicker match={live} />
        </div>
      </body>
    </html>
  );
}
