import React, { useState } from 'react';
import joinClassNames from 'src/utils/join-class-names';
import $ from './year-selector.module.scss';
import { Button } from 'src/ui/components/molecules/button';

import { Period } from 'src/ui/hooks/use-dates';

interface P {
    selectedYear: number,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    periods: Period[],
}

const YearSelector: React.FC<P> = ({
    selectedYear, setYear, periods,
}) => {
    const optionList = React.useRef() as React.RefObject<HTMLUListElement>;
    console.log(periods)
    const [showOptions, setShowOptions] = useState(false);

    const dropDownIcon = () => {
        if (periods.length > 1) {
            if (!showOptions) return 'chevDown';
            if (showOptions) return 'chevUp';
        } return undefined;
    };

    const container = React.useRef<HTMLDivElement>(null);

    return (
        <div
            className={$.periodBody}
            ref={container}
        >
            <h3>Year</h3>
            <Button
                disabled={!(periods?.length > 1)}
                event={setShowOptions}
                eventValue={showOptions}
                label={selectedYear.toString()}
                type="dropDown"
            />
            <ul
                className={
                    showOptions ? joinClassNames($.periodContainer, $.open)
                        : $.periodContainer
                }
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
            >
                {periods?.map((period) => (
                    <li
                        className={joinClassNames($.listItem, $.year)}
                        key={period.year}
                    >
                        <Button
                            active={selectedYear === period.year}
                            event={setYear}
                            eventValue={period.year}
                            type="dropDown"
                            label={period.year.toString()}
                            tabindex={showOptions ? 0 : -1}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YearSelector;
