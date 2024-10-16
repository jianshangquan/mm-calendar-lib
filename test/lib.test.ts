import { GregorianCalendarDate } from '../src/types';
import {  MMDate, } from './../src/lib';


const date: GregorianCalendarDate = { year: 2000, month: 1, day: 1, hour: 18, minute: 0, second: 0 };




// test("get myanmar holiday", () => {
//     // const holidies = getMyanmarPublicHolidaysInGregorianCalendarYearOf(2025);
//     const holidies = MMDate.getHolidaysInYear(2024);
//     console.log(holidies);
// })


// test("MM date", () => {
//     const date = new MMDate({ day: 16, month: 10, year: 2024});
//     console.log(date.astro.nagahle);
//     console.log(date.astro.mahabote);
//     console.log(date.astro.nakhat);
//     console.log(date.toLunisolar());
//     console.log(date.getRaw());
// })



test("MM date", () => {
    const holidays = MMDate.getHolidaysOfYear(2024);
    console.log(holidays);
})


// test("MM date", () => {
//     const date = new MMDate({ day: 16, month: 10, year: 2024 });
//     console.log(date.isFullmoonDay());
// })