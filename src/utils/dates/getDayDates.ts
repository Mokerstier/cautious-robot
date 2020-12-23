interface IProps {
    length: number;
}

export let baseDate = new Date();
const DAY_DATES = ({ length: i }: IProps) => Array.from(
    {length: i}, // Get 7 Dates from TODAY -> past
    (_, x: number) => new Date(baseDate.getTime() - x * 24 * 60 * 60 * 1000),
); // ___________________________________1 * days * hrs * mins * millis

// Returns a date X days from given date
const addDays = (current: Date, days: number) => {
    const date = new Date(current);
    date.setDate(date.getDate() + days);
    return date;
};

// Returns an array of dates from start till end.
export const DAY_RANGE = (start: Date, end: Date) => {
    const dateArray: Date[] = [];
    let currentDate = start;
    while (currentDate <= end) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
};

export const DAYS_OF_MONTH = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const dateArray: Date[] = [];

    // If month doesnt start on a monday get the first X dates of prevMonth
    if (date.getDay() !== 1) {
        // Last day of prevMonth
        baseDate = new Date(year, month, 0);
        // Get the missing days up to and including the prev monday
        dateArray.push(...DAY_DATES({ length: date.getDay() - 1 }).reverse());
    }

    while (date.getMonth() === month) {
        dateArray.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dateArray;
};

export default DAY_DATES;