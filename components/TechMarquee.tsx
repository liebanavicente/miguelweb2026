import type { Icon } from "@phosphor-icons/react";
import { MicrosoftExcelLogo, MicrosoftTeamsLogo, MicrosoftWordLogo, OpenAiLogo } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties } from "react";
import {
  siClaude,
  siCss,
  siFigma,
  siFilezilla,
  siFramer,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siResend,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWarp,
  siWordpress,
} from "simple-icons";

// simple-icons no longer ships Microsoft marks, so VS Code keeps its classic path here.
const VSCODE_PATH =
  "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z";

type Tool = { name: string; color: string } & ({ path: string } | { Icon: Icon });

const brand = (name: string, icon: { path: string; hex: string }): Tool => ({ name, path: icon.path, color: `#${icon.hex}` });

const TOOLS: Tool[] = [
  { name: "VS Code", path: VSCODE_PATH, color: "#007ACC" },
  brand("Git", siGit),
  brand("GitHub", siGithub),
  brand("Warp", siWarp),
  brand("Claude", siClaude),
  { name: "ChatGPT", Icon: OpenAiLogo, color: "#10A37F" },
  brand("Gemini", siGooglegemini),
  brand("Supabase", siSupabase),
  brand("Vercel", siVercel),
  brand("Next.js", siNextdotjs),
  brand("Node.js", siNodedotjs),
  brand("React", siReact),
  brand("TypeScript", siTypescript),
  brand("JavaScript", siJavascript),
  brand("HTML5", siHtml5),
  brand("CSS", siCss),
  brand("Tailwind", siTailwindcss),
  brand("Prisma", siPrisma),
  brand("PostgreSQL", siPostgresql),
  brand("MongoDB", siMongodb),
  brand("Stripe", siStripe),
  brand("Resend", siResend),
  brand("Framer", siFramer),
  brand("Figma", siFigma),
  brand("WordPress", siWordpress),
  brand("FileZilla", siFilezilla),
  { name: "Teams", Icon: MicrosoftTeamsLogo, color: "#6264A7" },
  { name: "Excel", Icon: MicrosoftExcelLogo, color: "#217346" },
  { name: "Word", Icon: MicrosoftWordLogo, color: "#2B579A" },
];

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <li className="tool" style={{ "--brand": tool.color } as CSSProperties}>
      {"path" in tool ? (
        <svg aria-hidden className="tool-logo" viewBox="0 0 24 24">
          <path d={tool.path} />
        </svg>
      ) : (
        <tool.Icon aria-hidden className="tool-logo" weight="fill" />
      )}
      <span>{tool.name}</span>
    </li>
  );
}

/** Quiet strip of the tools I work with: greyed logos drifting sideways, each one takes its colour on hover. */
export function TechMarquee({ t }: { t: { label: string; title: string } }) {
  return (
    <section aria-label={t.label} className="marquee">
      <p className="marquee-label">{t.title}</p>
      <div className="marquee-viewport">
        <ul className="marquee-track">
          {TOOLS.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </ul>
        {/* Second copy makes the loop seamless; screen readers only need the first. */}
        <ul aria-hidden className="marquee-track">
          {TOOLS.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </ul>
      </div>
    </section>
  );
}
