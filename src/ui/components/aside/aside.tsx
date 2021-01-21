import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Button } from 'src/ui/components/molecules/button';
import DaySelector from 'src/ui/components/organisms/date-selector';
import MonthSelector from 'src/ui/components/organisms/month-selector';
import YearSelector from 'src/ui/components/organisms/year-selector';
import PeriodicSelector from 'src/ui/components/organisms/periodic-selector';
import { QuarterDates, useDates } from 'src/ui/hooks/use-dates';
import { baseDate } from 'src/utils/dates/getDayDates';
import $ from './aside.module.scss';
import Page from 'src/view/page';

const Aside: React.FunctionComponent = () => {
    const history = useHistory();
    const match = useRouteMatch('/demo');
    const { periods } = useDates();
    const [dayRange, setDays] = React.useState<number[]>([]);
    const [selectPeriod, setRange] = React.useState<QuarterDates | null>(null);
    const [yearRange, setYearRange] = React.useState<number>(baseDate.getFullYear());
    const [monthRange, setMonthRange] = React.useState<number>(baseDate.getMonth());


    function clearFilter() {
        setDays([]);
        history.push({
            search: '',
            state: 'filter',
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const qsDay = Object.keys(dayRange)
            .map((key) => `day=${encodeURIComponent(dayRange[key])}`)
            .join('&');

        history.push({
            search: `${qsDay}`,
            state: 'filter',
        });
    }
    
    if (match) return null;
    return (   
        <aside className={$.aside}>
            <nav>
                <h2>Change view</h2>
                <ul>
                    <li>
                        <Link to="/graph">
                            Show graphs
                        </Link>
                    </li>
                    <li>
                        <Link to="/demo">
                            Azure Demo
                        </Link>
                    </li>
                </ul>
            </nav>
            <form 
                action=""
                onSubmit={(e) => handleSubmit(e)}
            >
                <PeriodicSelector 
                    selected={selectPeriod}
                    periods={periods}
                    setRange={setRange}
                    selectedYear={yearRange}
                />
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
                <Button
                    className="button" 
                    type="submit"
                    label="Submit"
                />
                <Button
                    className="button" 
                    type="button"
                    label="Clear Filter"
                    event={() => clearFilter()}
                />
            </form>

        </aside>
    );
};

export default Aside;
