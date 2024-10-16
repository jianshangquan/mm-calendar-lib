import { convertGregorianToJulianDate, GregorianCalendarDate, convertJulianDateToMyanmarDate, MMCalendar } from './../src/lib';


const date: GregorianCalendarDate = { year: 2000, month: 1, day: 1, hour: 18, minute: 0, second: 0 };

test("convertGregorianToJulianDate", () => {
    const value = convertGregorianToJulianDate(date);
    console.log(value);
    expect(value).toBe(2451545.25);
})


test("calculate Myanmar date", () => {

    //my : year,
    //myt :year type [0=common, 1=little watat, 2=big watat],
    //myl: year length [354, 384, or 385 days],
    //mm: month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, Tawthalin=6,
    //    Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ],
    //mmt: month type [1=hnaung, 0= Oo],
    //mml: month length [29 or 30 days],
    //md: month day [1 to 30],
    //fd: fortnight day [1 to 15],
    //mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
    //wd: week day [0=sat, 1=sun, ..., 6=fri]
    const date: GregorianCalendarDate = { year: 2025, month: 10, day: 21, hour: 0, minute: 0, second: 0 };
    const jdn = convertGregorianToJulianDate(date);
    console.log(jdn);
    // expect(jdn).toBe(2460955.5);

    const myanmarDate = convertJulianDateToMyanmarDate(jdn);
    console.log(myanmarDate);
})


// test("convertJulianToGregorianDate", () => {
//     const julianDate: number = ;
//     const value = convertJulianToGregorianDate(julianDate);
//     console.log(value);
//     expect(value).toBe(2361210);
// })

