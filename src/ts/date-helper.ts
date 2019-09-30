export module DateHelper {
    const MONTHS = [
        "January", "February", "March", "April", "May", "June", "July","August",
        "September", "October", "November", "December"
    ]

    export function daysInMonth(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    }

    export function getMonthName(month: number): string {
        return MONTHS[month];
    }



}