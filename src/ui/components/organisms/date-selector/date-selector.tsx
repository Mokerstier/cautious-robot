import React from 'react';
import { WEEKDAYS_FROM_MONDAY } from 'src/core/constants';
import { QuarterDates } from 'src/ui/hooks/use-dates';
import { DAYS_OF_MONTH } from 'src/utils/dates/getDayDates';
import $ from './date-selector.module.scss';

interface Props {
    dayRange: number[];
    setDays: (value: number[]) => void;
    setRange: React.Dispatch<React.SetStateAction<QuarterDates | null>>
    yearRange: number;
    monthRange: number;
}

const DaySelector: React.FC<Props> = ({
    dayRange, setDays, yearRange, monthRange, setRange,
}) => {

    const [uniqueId] = React.useState(() => Math.random().toString());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthDatesWithRef = React.useMemo(() => DAYS_OF_MONTH(yearRange, monthRange)
        .map((date) => ({
            inputRef: React.createRef<HTMLInputElement>(),
            date,
        })), [monthRange, yearRange]);


    function handleChange(date: number) {
        if (dayRange.includes(date)) {
            setDays(dayRange.filter((d) => d !== date));
        } else if (dayRange.length >= 2) {
            setDays([date]);
        } else { setDays([...dayRange, date]); }
    }
    const parsedDate = (d: Date) => (d.toLocaleDateString());

    const [label, setLabel] = React.useState<string[]>([parsedDate(today), '']);

    React.useEffect(() => {
        if (dayRange.length) {
            dayRange.sort((a, b) => (a - b));
            const firstDate = parsedDate(new Date(dayRange[0]));
            const secondDate = dayRange[1] ? parsedDate(new Date(dayRange[1])) : 'Choose another..';
            setLabel([firstDate, secondDate]);
            setRange(null);
        } else setLabel(['Select a date', '']);
    }, [dayRange, setRange]);

    return (
        <div className={$.ccontainer}>
            <header className={$.cheader}>
                {label.map((date, i) => (
                    <h3
                        key={date}
                        className={$.label}
                    >
                        <span className={$.labelHead}>
                            {i > 0 ? 'To:' : 'From:'}
                        </span>
                        <span className={$.date}>{date}</span>
                    </h3>
                ))}
            </header>
            <div className={$.custom_body}>
                {WEEKDAYS_FROM_MONDAY.map((day) => (
                    <p key={day}>{day}</p>
                ))}
                {monthDatesWithRef.map((
                    { date, inputRef },
                    i,
                ) => {
                    const dateDate = date.getDate();
                    const inputId = `${date}__${uniqueId}`;
                    const prevMonth = date.getMonth() !== monthRange;
                    const thisDay = date.getTime() === today.getTime();

                    // Check for matching date when entering via query URL
                    const match = dayRange.filter((day) => (Number(day) === date.getTime()));
                    const selectionDate = (
                        date.getTime() > dayRange[0]
                        && date.getTime() < dayRange[dayRange.length - 1]
                    );

                    let className: string | undefined = '';
                    if (prevMonth) className = $.prevmonth;
                    if (thisDay) className = $.today;
                    return (
                        <div key={date.getTime()} className={$.day_container}>
                            <input
                                checked={!!match.length}
                                ref={inputRef}
                                id={inputId}
                                role="button"
                                type="checkbox"
                                name="day"
                                value={date.getTime()}
                                onChange={() => handleChange(date.getTime())}
                                data-date={dateDate}
                            />
                            <label
                                htmlFor={inputId}
                                className={selectionDate ? `${$.selection}, ${$.dayTitle}`: ''}
                            >
                                <span className={className}>{dateDate}</span>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DaySelector;
