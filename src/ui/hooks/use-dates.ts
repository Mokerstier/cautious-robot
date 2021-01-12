import { useState, useEffect } from 'react';
import dataJson from 'src/fakeData/dataGenerator.json';

export interface QuarterDates {
    title: string;
        available: boolean;
        dates: {
            startDate: Date,
            endDate: Date,
        }
}
export const emptyPeriod = {
    quarterDates: [
        {
            title: 'Q1',
            available: false,
        },
        {
            title: 'Q2',
            available: false,
        },
        {
            title: 'Q3',
            available: false,
        },
        {
            title: 'Q4',
            available: false,
        },
    ],
};
export interface Period {
    month: number[];
    year: number;
    quarterDates: QuarterDates[];
}

export function useDates() {
    const { data } = dataJson;
    const allDates = data.map((d) => Number(d.timestamp));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [periods, setPeriodes] = useState<any | null>(null);
    const QUARTERSBYINDEX = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
    let availablePeriods: any;

    useEffect(() => {
        setPeriodes(availablePeriods);
    }, [availablePeriods]);
    
    const maxDate = new Date(Math.max(...allDates) * 1000);
    const minDate = new Date(Math.min(...allDates) * 1000);
    minDate.setHours(0, 0, 0, 0);
    const availableYears: number[] = [];
    let availableMonthsAndYears: Period[] = [];

    if (maxDate.getFullYear() === minDate.getFullYear()) {
        if (maxDate.getMonth() === minDate.getMonth()) {
            const monthYear = {
                month: [minDate.getMonth()],
                year: minDate.getFullYear(),
                quarterDates: [],
            };
            availableMonthsAndYears = [monthYear];
        } else {
            for (let i = minDate.getMonth(); i < maxDate.getMonth(); i + 1) {
                const period = {
                    month: [minDate.getMonth() + i],
                    year: minDate.getFullYear(),
                    quarterDates: [],
                };
                availableMonthsAndYears.push(period);
            }
        }
    } else {
        for (let i = minDate.getFullYear(); i < maxDate.getFullYear(); i += 1) {
            availableYears.push(i);
        }
    }

    availablePeriods = availableMonthsAndYears.map((object) => {
        const { month, year } = object;
        const availableQuarters = QUARTERSBYINDEX.map(
            (array) => (array.includes(month[0])),
        );

        const period = {
            month,
            year,
            quarterDates: [
                {
                    title: 'Q1',
                    available: availableQuarters[0],
                    dates: {
                        startDate: new Date(year, 0, 1),
                        endDate: new Date(year, 3, 0),
                    },
                },
                {
                    title: 'Q2',
                    available: availableQuarters[1],
                    dates: {
                        startDate: new Date(year, 3, 1),
                        endDate: new Date(year, 6, 0),
                    },
                },
                {
                    title: 'Q3',
                    available: availableQuarters[2],
                    dates: {
                        startDate: new Date(year, 6, 1),
                        endDate: new Date(year, 9, 0),
                    },
                },
                {
                    title: 'Q4',
                    available: availableQuarters[3],
                    dates: {
                        startDate: new Date(year, 9, 1),
                        endDate: new Date(year, 12, 0),
                    },
                },
            ],
        };
        return period;
    });

    return { periods, maxDate, minDate };
}
