import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DaySelector from 'src/ui/components/organisms/date-selector';
import MonthSelector from 'src/ui/components/organisms/month-selector';
import YearSelector from 'src/ui/components/organisms/year-selector';
import { useDates } from 'src/ui/hooks/use-dates';
import { baseDate } from 'src/utils/dates/getDayDates';
import $ from './aside.module.scss';

const Aside: React.FunctionComponent = () => {
    const match = useRouteMatch('/demo')
    const { periods } = useDates();
    const [dayRange, setDays] = React.useState<number[]>([]);
    const [selectPeriod, setRange] = React.useState<{} | null>(null);
    const [yearRange, setYearRange] = React.useState<number>(baseDate.getFullYear());
    const [monthRange, setMonthRange] = React.useState<number>(baseDate.getMonth());
    console.log(selectPeriod);
    
    if (match) return null;
    return (
        <aside className={$.aside}>
            <form action="">
                <YearSelector 
                    selectedYear={yearRange}
                    setYear={setYearRange}
                    periods={periods}
                />
                <MonthSelector 
                    selectedMonth={monthRange}
                    setMonth={setMonthRange}
                    setYear={setYearRange}
                />
                <DaySelector
                    setDays={setDays}
                    dayRange={dayRange}
                    monthRange={monthRange}
                    setRange={setRange}
                    yearRange={yearRange}
                />

            </form>

        </aside>
    );
};

export default Aside;
