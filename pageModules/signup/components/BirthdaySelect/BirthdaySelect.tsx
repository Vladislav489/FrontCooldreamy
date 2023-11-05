import styles from './BirthdaySelect.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';
import {FC, useEffect, useState} from 'react';
import moment from 'moment';


interface I {
    minAge?: number,
    maxAge?: number

    value?: any,
    setValue?: (...args: any[]) => any,


    initYear?: any,
    initMonth?: any,
    initDay?: any
}


const  sequence = (start: any, end: any) => {
    var array = [];
    for (var i = start; i <= end; i += 1) {
        array.push(i);
    }
    return array;
}

const  datesInMonth = (year: number, month: number) => {
    switch (month) {
      case 2:
        // 二月，閏年判斷
        var leapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        return leapYear ? 29 : 28;
  
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31; // 大月
  
      default:
        return 30; // 小月
    }
  }

const getMonthName = (index: number) => {
    switch(index) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
    }
}


const BirthdaySelect:FC<I> = ({
    minAge,
    maxAge,

    
    setValue,

    initYear,
    initMonth,
    initDay
}) => {
    const [dayValue, setDayValue] = useState<any>()
    const [monthValue, setMonthValue] = useState<any>()
    const [yearValue, setYearValue] = useState<any>()

    const [currentYear, setCurrentYear] = useState<any>((new Date()).getFullYear())
    const [minYear, setMinYear] = useState<any>()
    const [maxYear, setMaxYear] = useState<any>()

    const [years, setYears] = useState<any>()
    const [months, setMonths] = useState<any[]>(sequence(1,12)?.map(i => ({label: getMonthName(i), value: i})) || [])
    const [days, setDays] = useState<any[]>([])


    useEffect(() => {
        initDay && setDayValue(initDay)
        initMonth && setMonthValue(initMonth)
        initYear && setYearValue(initYear)
    }, [initDay, initMonth, initYear])


    useEffect(() => {
        if(minYear && maxYear) {
            setYears(sequence(minYear, maxYear)?.map(i => ({value: i, label: i?.toString()}))?.reverse())
        }
    }, [minYear, maxYear])


    useEffect(() => {
        if(yearValue && monthValue) {
            setDays(sequence(1, datesInMonth(yearValue, monthValue))?.map(i => ({value: i, label: i})))
        } 
    }, [yearValue, monthValue])

    useEffect(() => {
        if(minAge && maxAge && currentYear) {
            setMinYear(currentYear - maxAge)
            setMaxYear(currentYear - minAge)
        }
    }, [minAge, maxAge, currentYear])

    useEffect(() => {
        if (dayValue && monthValue && yearValue) {
            setValue && setValue(moment(`${dayValue}-${monthValue}-${yearValue}`, 'DD-MM-YYYY').format("YYYY-MM-DD"))
        } else {
            setValue && setValue(null)
        }
    }, [dayValue, monthValue, yearValue])

    useEffect(() => {
        setDayValue(null)
    }, [monthValue])


    return (
        <div className={styles.wrapper}>
            <div className={`${styles.item}`}>
                <SelectDef
                    placeholder='Year'
                    isRound
                    list={years}
                    onChange={setYearValue}
                    value={yearValue}
                    />
            </div>
            <div className={`${styles.item}`}>
                <SelectDef
                    placeholder='Month'
                    isRound
                    list={months}
                    onChange={setMonthValue}
                    value={monthValue}
                    />
            </div>
            <div className={`${styles.item}`}>
                <SelectDef
                    disabled={!(yearValue && monthValue)}
                    placeholder='Day'
                    isRound
                    list={days}
                    onChange={setDayValue}
                    value={dayValue}
                    />
            </div>
            
            
        </div>
    )
}



export default BirthdaySelect;