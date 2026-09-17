import { toDateString } from "./date";

export function getCycleDays(startDate: string, length: number): string[] {
    const start = new Date(startDate);
    return Array.from({ length }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return toDateString(d);
    });
}