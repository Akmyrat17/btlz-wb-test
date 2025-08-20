export function parseNumber(value?: string | number): number {
    if (!value || value === "-") return 0;
    if (typeof value === "number") return value;
    return parseFloat(value.replace(",", ".")) || 0;
}
