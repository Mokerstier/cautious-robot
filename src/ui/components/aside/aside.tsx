import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DaySelector from 'src/ui/components/organisms/date-selector';
import { baseDate } from 'src/utils/dates/getDayDates';
import $ from './aside.module.scss';

const Aside: React.FunctionComponent = () => {
    const match = useRouteMatch('/demo')
    const [dayRange, setDays] = React.useState<number[]>([]);
    const [selectPeriod, setRange] = React.useState<{} | null>(null);
    const [yearRange, setYearRange] = React.useState<number>(baseDate.getFullYear());
    const [monthRange, setMonthRange] = React.useState<number>(baseDate.getMonth());
    console.log(match)
    if (match) return null;
    return (
        <aside className={$.aside}>
            <DaySelector
                setDays={setDays}
                dayRange={dayRange}
                monthRange={monthRange}
                setRange={setRange}
                yearRange={yearRange}
            />
        </aside>
    );
};

export default Aside;
