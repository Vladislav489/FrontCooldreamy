import styles from './BirthdaySelectMob.module.scss';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import {useState, useEffect, FC, useRef} from 'react';
import moment from 'moment';
import Item from './components/Item/Item';

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
        var leapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        return leapYear ? 29 : 28;
  
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;
  
      default:
        return 30;
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

const currentYear = (new Date()).getFullYear()

const BirthdaySelectMob:FC<I> = ({
    minAge,
    maxAge,

    setValue,
    value,


    initDay,
    initMonth,
    initYear
}) => {
    const [dayValue, setDayValue] = useState<any>()
    const [monthValue, setMonthValue] = useState<any>(1)
    const [yearValue, setYearValue] = useState<any>(1)

    const [minYear, setMinYear] = useState<any>()
    const [maxYear, setMaxYear] = useState<any>()

    const [years, setYears] = useState<any[]>([])
    const [months, setMonths] = useState<any[]>(sequence(1,12)?.map(i => ({label: getMonthName(i), value: i})) || [])
    const [days, setDays] = useState<any[]>([])

    const [total, setTotal] = useState<number>(0)

    const refSliderYear = useRef<any>(null)
    const refSliderMonth = useRef<any>(null)
    const refSliderDay = useRef<SwiperRef>(null)

    
    useEffect(() => {
        if(years?.length > 0) setYearValue(years[1]?.value)
    }, [years])


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
        if(minAge && maxAge) {
            setMinYear(currentYear - maxAge)
            setMaxYear(currentYear - minAge)
        }
    }, [minAge, maxAge])

    useEffect(() => {
        if (dayValue && monthValue && yearValue) {
            if(setValue && moment(`${dayValue}-${monthValue}-${yearValue}`, 'DD-MM-YYYY').format("YYYY-MM-DD") !== 'Invalid date') {
                setValue(moment(`${dayValue}-${monthValue}-${yearValue}`, 'DD-MM-YYYY').format("YYYY-MM-DD"))
            }
        } else {
            setValue && setValue(null)
        }
    }, [dayValue, monthValue, yearValue, setValue])


 


    useEffect(() => {
        if(refSliderDay && refSliderDay?.current) {
            refSliderDay?.current?.swiper?.update()
            refSliderDay?.current?.swiper?.slideTo(1)
        }
    }, [yearValue, monthValue, refSliderDay])


    
    useEffect(() => {
        if(value) {
            setTotal(Math.floor((Date.now() - moment(moment(value).format()).valueOf()) / 31536000000))
        }
    }, [value])
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>When is your birthday?</div>
            <div className={styles.body}>
                
                <div className={styles.part}>
                    {
                        years?.length > 0 && yearValue && years?.findIndex(i => i?.value == yearValue) !== -1 && (
                            <>
                                <div className={styles.active}></div>
                                <Swiper
                                    initialSlide={1}
                                    direction={'vertical'}
                                    slidesPerView={3}
                                    className={`${styles.slider} bth-slider`}
                                    centeredSlides
                                    slideToClickedSlide
                                    freeMode={true}
                                    onActiveIndexChange={(e) => {
                                        setYearValue(years?.find((i,index) => index == e.activeIndex)?.value)
                                    }}
                                    ref={refSliderYear}
                                    >
                                    {
                                        years?.map((i:any, index: number) => (
                                            <SwiperSlide className={styles.slide} key={i?.value}>
                                                <Item
                                                    index={index}
                                                    value={i?.value}
                                                    label={i?.label}
                                                    setValue={setYearValue}
                                                    />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        )
                    }
                    
                </div>
                <div className={styles.part}>
                    {
                        monthValue && (
                            <>
                                <div className={styles.active}></div>
                                <Swiper
                                    direction={'vertical'}
                                    slidesPerView={3}
                                    initialSlide={1}
                                    className={`${styles.slider} bth-slider`}
                                    centeredSlides
                                    slideToClickedSlide
                                    freeMode={true}
                                    onActiveIndexChange={(e) => {
                                        setMonthValue(e.activeIndex + 1)
                                    }}
                                    ref={refSliderMonth}
                                    >
                                    {
                                        months?.map((i:any, index: number) => (
                                            <SwiperSlide className={styles.slide} key={i?.value}>
                                                <Item
                                                    index={index}
                                                    value={i?.value}
                                                    label={i?.label}
                                                    setValue={setMonthValue}
                                                    />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        )
                    }
                </div>
                <div className={styles.part}>
                    {
                        days?.length > 0 && (
                            <>
                                <div className={styles.active}></div>
                        
                                <Swiper
                                    initialSlide={1}
                                    direction={'vertical'}
                                    slidesPerView={3}
                                    className={`${styles.slider} bth-slider`}
                                    centeredSlides
                                    slideToClickedSlide
                                    freeMode={true}
                                    onActiveIndexChange={(e) => {
                                        setDayValue(e.activeIndex + 1)
                                    }}
                                    ref={refSliderDay}
                                    >
                                    {
                                        days?.map((i:any, index: number) => (
                                            <SwiperSlide className={styles.slide} key={i?.value}>
                                                <Item
                                                    setValue={setDayValue}
                                                    index={index}
                                                    value={i?.value}
                                                    label={i?.label}
                                                    />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        )
                    }
                    
                </div>
            </div>
            <div className={styles.ex}>Scroll to select</div>
            {
                total > 0 && (
                    <div className={styles.total}>Your age: {total} years.</div>        
                )
            }
            
        </div>
    )
}


export default BirthdaySelectMob;