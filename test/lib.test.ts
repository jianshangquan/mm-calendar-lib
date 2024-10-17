

// test("get myanmar holiday", () => {
//     // const holidies = getMyanmarPublicHolidaysInGregorianCalendarYearOf(2025);
//     const holidies = MMDate.getHolidaysInYear(2024);
//     console.log(holidies);
// })

import { HolidaysConfig, MoonPhase, MyanmarDate, MyanmarMonths, MyanmarMonthType } from "./../src/index";


// test("MM date", () => {
//     const date = new MMDate({ day: 16, month: 10, year: 2024});
//     console.log(date.astro.nagahle);
//     console.log(date.astro.mahabote);
//     console.log(date.astro.nakhat);
//     console.log(date.toLunisolar());
//     console.log(date.getRaw());
// })



// test("MM date", () => {
//     const holidays = MMDate.getHolidaysOfYear(2024);
//     console.log(holidays);
// })


// test("MM date", () => {
//     const date = new MMDate({ day: 16, month: 10, year: 2024 });
//     console.log(date.isFullmoonDay());
// })




test("MM date", () => {
    HolidaysConfig.clear();
    HolidaysConfig.add({
        name: 'Test event',
        day: 1, 
        month: MyanmarMonths.Tagu, 
        key: 'test2',
        type: 'lunar',
        culture: 'burmese',
        monthType: MyanmarMonthType.hnaung,
        moonPhase: MoonPhase.fullMoon,
        translation: {
            en: 'test',
            mm: 'အခြေ',
            cn: '测试'
        } 
    });


    const holidays = MyanmarDate.getHolidaysOfYear(2024);
    console.log(holidays);
})