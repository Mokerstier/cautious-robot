import React from 'react';
import $ from './month-selector.module.scss';
import { Button } from 'src/ui/components/molecules/button';
import { months } from 'src/utils/dates/getDayDates';

interface Props {
    selectedMonth: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    setYear: React.Dispatch<React.SetStateAction<number>>,
}

const MonthSelector: React.FC<Props> = ({
    selectedMonth, setMonth, setYear,
}) => {

    function setNextYear() {
        setYear((a) => (a + 1));
        setMonth(0);
    }

    function setPrevYear() {
        setYear((a) => (a - 1));
        setMonth(11);
    }


    return (
        <div className={$.month_container}>
            <Button
                event={selectedMonth === 0 ? setPrevYear : setMonth}
                eventValue={selectedMonth !== 0 && selectedMonth - 1}
                type="button"
                label="<"
                className="small"
            />
            <h3>{months[selectedMonth]}</h3>
            <Button
                event={selectedMonth === 11 ? setNextYear : setMonth}
                eventValue={selectedMonth !== 11 && selectedMonth + 1}
                type="button"
                label=">"
                className="small"
            />
        </div>
    );
};

export default MonthSelector;
