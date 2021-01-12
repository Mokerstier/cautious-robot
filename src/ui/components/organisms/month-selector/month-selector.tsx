import React, { useState } from 'react';
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
    const date = new Date();
    const [focus, setFocus] = useState<Date[]>();

    function setNextYear() {
        setYear((a) => (a + 1));
        setMonth(0);
    }

    function setPrevYear() {
        setYear((a) => (a - 1));
        setMonth(11);
    }

    React.useEffect(() => {
        if (focus) {
            const year = date.getUTCFullYear();
            const month = date.getMonth();
            setYear(year);
            setMonth(month);
        }
    }, [focus, setMonth, setYear]);

    return (
        <div className={$.periodBody}>
            <h3>{months[selectedMonth]}</h3>
            <div className={$.subGrid}>
                <Button
                    event={selectedMonth === 0 ? setPrevYear : setMonth}
                    eventValue={selectedMonth !== 0 && selectedMonth - 1}
                    type="navigation"
                    label="<"
                />
                <Button
                    event={selectedMonth === 11 ? setNextYear : setMonth}
                    eventValue={selectedMonth !== 11 && selectedMonth + 1}
                    type="navigation"
                    label=">"
                />
            </div>
        </div>
    );
};

export default MonthSelector;
