export function calculateYearsToNow(date: string): string {
    const dateInMs: number = new Date(date).getTime();
    const nowInMs: number = Date.now();
    const differenceInMs: number = nowInMs - dateInMs;
    const millisecondsInYear: number = 1000 * 60 * 60 * 24 * 365.25;
    const differenceInYears: number = differenceInMs / millisecondsInYear;
    const formattedYears: string = (differenceInYears >= 0 ? "+" : "") + Math.floor(differenceInYears) + " years";
    return formattedYears;
}
