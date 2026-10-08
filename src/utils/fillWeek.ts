export function fillWeek(records: { date: string; time: number }[], firstDate: string, lastDate: string) {
    const byDate = new Map(records.map(r => [r.date, r.time]));

    const result = [];
    const current = new Date(firstDate);
    const end = new Date(lastDate);

    while (current <= end) {
        const dateStr = formatDate(current);
        result.push({
            date: dateStr,
            time: byDate.get(dateStr) ?? 0,
        });
        current.setDate(current.getDate() + 1);
    }

    return result;
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}