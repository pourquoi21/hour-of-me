// month: 0 ~ 11 (Date.getMonth()와 동일하게)
export function getMonthCells(year: number, month: number): (string | null)[] {
    const firstDay = new Date(year, month, 1).getDay();  // 해당 달의 첫번째 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 달의 마지막 날짜

    const cells: (string | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= lastDate; d++) {
        cells.push(toDateString(new Date(year, month, d)));
    }
    return cells;
}

export function toDateString(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getCycleEndDate(startDateStr: string, cycleDays: number): string {
    const d = new Date(startDateStr);
    d.setDate(d.getDate() + cycleDays - 1);
    return toDateString(d);
}

export function changeMonth(year: number, month: number, offset: number): { year:number; month:number } {
    const date = new Date(year, month + offset, 1);

    return {
        year: date.getFullYear(),
        month: date.getMonth()
    }
}