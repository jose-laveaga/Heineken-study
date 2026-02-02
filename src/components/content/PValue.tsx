
type PValueTone = "auto" | "strong" | "moderate" | "none";

type StatPillProps = {
    label: string;
    comparisonOperator?: "=" | ">" | "<" | ">=" | "<=" | string;
    valueText: string; // e.g. "0.03", "p=0.03", "<0.001", "P < 0.05"
    className?: string;

    // Thresholds (defaults are standard)
    alpha?: number;        // 0.05
    strongAlpha?: number;  // 0.01

    // Optional: override the tier instead of auto-calculating
    tone?: PValueTone;

    // Optional: format displayed text
    formatValueText?: (valueText: string) => string;
};

function parsePValue(valueText: string): { p: number | null; hasLessThan: boolean; hasLessOrEqual: boolean } {
    const hasLessThan = /</.test(valueText);
    const hasLessOrEqual = /≤/.test(valueText) || /<=/.test(valueText);

    const cleaned = valueText
        .replace(/p\s*=?/gi, "") // remove "p=" / "P="
        .replace(/[^0-9.eE+-]/g, " ") // keep numeric-ish tokens
        .trim();

    // Take the first numeric token found
    const token = cleaned.split(/\s+/).find(Boolean);
    if (!token) return { p: null, hasLessThan, hasLessOrEqual };

    const p = Number.parseFloat(token);
    if (!Number.isFinite(p)) return { p: null, hasLessThan, hasLessOrEqual };

    return { p, hasLessThan, hasLessOrEqual };
}

function pValueToneAuto(
    valueText: string,
    alpha: number,
    strongAlpha: number
): { tone: Exclude<PValueTone, "auto">; p: number | null } {
    const { p, hasLessThan, hasLessOrEqual } = parsePValue(valueText);
    if (p === null) return { tone: "none", p: null };

    // If the text explicitly says "< alpha" or "≤ alpha", treat it as significant
    const isStrictLess = hasLessThan && p <= alpha;
    const isLessOrEq = hasLessOrEqual && p <= alpha;

    if (p < strongAlpha) return { tone: "strong", p };
    if (p < alpha || isStrictLess || isLessOrEq) return { tone: "moderate", p };
    return { tone: "none", p };
}

function toneClasses(tone: Exclude<PValueTone, "auto">) {
    switch (tone) {
        case "strong":
            return "text-emerald-800 bg-emerald-50 ring-1 ring-emerald-200";
        case "moderate":
            return "text-amber-800 bg-amber-50 ring-1 ring-amber-200";
        case "none":
        default:
            return "text-slate-700 bg-slate-50 ring-1 ring-slate-200";
    }
}

export function StatPill({
                             label,
                             comparisonOperator,
                             valueText,
                             className = "",
                             alpha = 0.05,
                             strongAlpha = 0.01,
                             tone = "auto",
                             formatValueText = (v) => v,
                         }: StatPillProps) {
    const resolved = tone === "auto" ? pValueToneAuto(valueText, alpha, strongAlpha).tone : tone;

    return (
        <span
            className={[
                "inline-flex items-center gap-2 rounded-l rounded-tr-md rounded-br border border-slate-400 px-3 py-1 ",
                className,
            ].join(" ")}
        >
      <span className="text-slate-600">
        {label} {comparisonOperator}
      </span>

      <span className={["rounded px-2 py-0.5 text-sm", toneClasses(resolved)].join(" ")}>
        {formatValueText(valueText)}
      </span>
    </span>
    );
}
