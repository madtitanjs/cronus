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

    export function checkSameDay(ref: Date, comp: Date) {
        let _ref = new Date(ref);
        _ref.setHours(0, 0, 0, 0);
        let _comp = new Date(comp);
        _comp.setHours(0, 0, 0, 0);
        var same =
            _ref.getMonth() === _comp.getMonth() &&
            _ref.getFullYear() === _comp.getFullYear() &&
            _ref.getDate() === _comp.getDate();
        return same;
    }

}