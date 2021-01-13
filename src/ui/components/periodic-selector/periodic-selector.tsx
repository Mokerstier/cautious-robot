import React from 'react';
import { Button } from 'src/ui/components/molecules/button';
import $ from './periodic-selector.module.scss';
import { emptyPeriod, Period, QuarterDates } from 'src/ui/hooks/use-dates';
import joinClassNames from 'src/utils/join-class-names';

interface Props{
    selected: QuarterDates | null,
    periods: Period[],
    setRange: (value: QuarterDates) => void,
    selectedYear: number,
}

const PeriodicSelector: React.FunctionComponent<Props> = ({
    periods, setRange, selected, selectedYear,
}) => {
    const [showOptions, setShowOptions] = React.useState(false);
    const thisPeriod = periods.filter((period) => (period.year === selectedYear))[0] || emptyPeriod;

    const quartersWithRef = React.useMemo(() => thisPeriod?.quarterDates
        .map((quarter) => ({
            liRef: React.createRef<HTMLLIElement>(),
            quarter,
        })), [thisPeriod, selectedYear]);

    const dropDownIcon = () => {
        if (quartersWithRef.length > 1) {
            if (!showOptions) return 'chevDown';
            if (showOptions) return 'chevUp';
        } return undefined;
    };
    const availableQuarters = quartersWithRef.map(
        (quarterWithRef) => (quarterWithRef.quarter.available === true
            ? quarterWithRef.quarter.title : null),
    ).filter((e) => e !== null);

    const [quarterLabel, setLabel] = React.useState(availableQuarters[0] || 'Q1');

    React.useEffect(() => {
        if (!selected) return;
        setShowOptions(false);
        setLabel(selected.title);
    }, [selected]);

    React.useEffect(() => {
        if (!thisPeriod || thisPeriod === emptyPeriod) setLabel('Q1');
    }, [selectedYear, thisPeriod]);

    return (
        <div
            className={$.periodBody}
            key={quarterLabel}
        >
            <h3>Quarter</h3>
            <Button
                event={setShowOptions}
                eventValue={!showOptions}
                type="dropDown"
                label={quarterLabel}
            />
            <ul
                className={
                    showOptions ? joinClassNames($.quarterContainer, $.open)
                        : $.quarterContainer
                }
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
            >
                {quartersWithRef.map(({ quarter, liRef }) => (
                    <li
                        key={quarter.title}
                        ref={liRef}
                    >
                        <Button
                            active={thisPeriod !== emptyPeriod
                                && selected?.title === quarter.title}
                            event={setRange}
                            eventValue={quarter}
                            disabled={!quarter.available}
                            type="dropDown"
                            label={quarter.title}
                        />
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default PeriodicSelector;
