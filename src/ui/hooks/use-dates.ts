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
    const allDates = data.map((d) => Number(d.timestamp) * 1000);
    const [periods, setPeriodes] = useState<any | null>(null);
    let availablePeriods: any;

    useEffect(() => {
        setPeriodes(availablePeriods);
    }, [availablePeriods]);
    
    const maxDate = new Date(Math.max(...allDates));
    const minDate = new Date(Math.min(...allDates));
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
            for (let i = minDate.getMonth(); i < maxDate.getMonth(); i ++) {
                const period = {
                    month: [minDate.getMonth() + i],
                    year: minDate.getFullYear(),
                    quarterDates: [],
                };
                availableMonthsAndYears.push(period);
            }
        }
    } else {
        for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++){
            availableYears.push(i)
        }

        availableYears.map((year, i) => {
            if(i === 0) {
                const period = {
                    month: [] as number[],
                    year: year,
                    quarterDates: [],
                };
                for (let i = minDate.getMonth(); i < 11; i ++) {
                    period.month.push(i);
                }
                availableMonthsAndYears.push(period);
            } else if (i === availableYears.length - 1) {
                const period = {
                    month: [] as number[],
                    year: year,
                    quarterDates: [],
                };
                for (let i = 0; i <= maxDate.getMonth(); i ++) {
                    period.month.push(i);
                }
                availableMonthsAndYears.push(period);
            } else {
                const period = {
                    month: [] as number[],
                    year: year,
                    quarterDates: [],
                };
                for (let i = 0; i <= 11; i ++) {
                    period.month.push(i);
                } 
                availableMonthsAndYears.push(period);
            }
        })
    }

    availablePeriods = availableMonthsAndYears.map((object) => {
        const { month, year } = object;

        const period = {
            month,
            year,
            quarterDates: [
                {
                    title: 'Q1',
                    available: month.includes(0) || month.includes(1) || month.includes(2),
                    dates: {
                        startDate: new Date(year, 0, 1),
                        endDate: new Date(year, 3, 0),
                    },
                },
                {
                    title: 'Q2',
                    available: month.includes(3) || month.includes(4) || month.includes(5),
                    dates: {
                        startDate: new Date(year, 3, 1),
                        endDate: new Date(year, 6, 0),
                    },
                },
                {
                    title: 'Q3',
                    available: month.includes(6) || month.includes(7) || month.includes(8),
                    dates: {
                        startDate: new Date(year, 6, 1),
                        endDate: new Date(year, 9, 0),
                    },
                },
                {
                    title: 'Q4',
                    available: month.includes(9) || month.includes(10) || month.includes(11),
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
