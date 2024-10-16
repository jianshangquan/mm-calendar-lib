import { BinarySearch } from "./binarysearch";
import { getChineseNewYear } from "./chinese-events";
import { Lunar, Solar } from 'lunar-typescript';
import { cloneDeep } from 'lodash';
import moment, { Moment } from "moment";
import { Astro, Culture, GregorianCalendarDate, IDate, IRecursiveEventDate, JulianCalendarDate, MahaBote, MoonPhase, MyanmarCalendarDate, MyanmarCalendarDateInfo, MyanmarCalendarOverlapInfo, MyanmarMonths, Nakhat, NgarHle, NullableTimeGregorianCalendarDate, RecursiveEventDate, WeekDay } from "./types";
import { LUNER_MONTH, MYANMAR_EPOCH, SOLAR_YEAR } from "./constant";
import { ChineseFixedPublicHolidaysInGregorianCalendar, InternationalFixedPublicHolidaysInGregorianCalendar, MyanmarFixedPublicHolidaysInGregorianCalendar } from "./fixed-events";
import { Language } from './intl';

// import { convertGregorianToJulianDate } from './lib';


const cultures: Culture[] = ['chinese', 'burmese', 'international', 'hindi'];











//Era definition
export const MyanmarEras: {
    eraId: number,
    begin: number,
    end: number,
    WO: number,
    NM: number,
    fme: number[][],
    wte: number[][]
}[] = [
        //-------------------------------------------------------------------------
        //The first era (the era of Myanmar kings: ME1216 and before)
        //Makaranta system 1 (ME 0 - 797)
        {
            "eraId": 1.1,//era id
            "begin": -999,//beginning Myanmar year
            "end": 797,//ending Myanmar year
            "WO": -1.1,// watat offset to compensate
            "NM": -1,//number of months to find excess days
            "fme": [[205, 1], [246, 1], [471, 1], [572, -1], [651, 1], [653, 2], [656, 1], [672, 1],
            [729, 1], [767, -1]],//exceptions for full moon days
            "wte": []//exceptions for watat years
        },
        //Makaranta system 2 (ME 798 - 1099)
        {
            "eraId": 1.2,//era id
            "begin": 798,//beginning Myanmar year
            "end": 1099,//ending Myanmar year
            "WO": -1.1,// watat offset to compensate
            "NM": -1,//number of months to find excess days
            "fme": [
                [813, -1], [849, -1], [851, -1], [854, -1], [927, -1], [933, -1], [936, -1],
                [938, -1], [949, -1], [952, -1], [963, -1], [968, -1], [1039, -1]
            ],
            //exceptions for full moon days
            "wte": []//exceptions for watat years
        },
        //Thandeikta (ME 1100 - 1216)
        {
            "eraId": 1.3,//era id
            "begin": 1100,//beginning Myanmar year
            "end": 1216,//ending Myanmar year
            "WO": -0.85,// watat offset to compensate
            "NM": -1,//number of months to find excess days
            "fme": [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]],//exceptions for full moon days
            "wte": [[1201, 1], [1202, 0]]//exceptions for watat years
        },
        //---------------------------------------------------------
        //The second era (the era under British colony: 1217 ME - 1311 ME)
        {
            "eraId": 2,//era id
            "begin": 1217,//beginning Myanmar year
            "end": 1311,//ending Myanmar year
            "WO": -1,// watat offset to compensate
            "NM": 4,//number of months to find excess days
            "fme": [[1234, 1], [1261, -1]],//exceptions for full moon days
            "wte": [[1263, 1], [1264, 0]]//exceptions for watat years
        },
        //---------------------------------------------------------
        //The third era (the era after Independence 1312 ME and after)
        {
            "eraId": 3,//era id
            "begin": 1312,//beginning Myanmar year
            "end": 9999,//ending Myanmar year
            "WO": -0.5,// watat offset to compensate
            "NM": 8,//number of months to find excess days
            "fme": [[1377, 1]],//exceptions for full moon days
            "wte": [[1344, 1], [1345, 0]]//exceptions for watat years
        }
    ];









function convertGregorianToJulianDate(date: GregorianCalendarDate): number {
    const a = Math.floor((14 - date.month) / 12);
    const y = date.year + 4800 - a;
    const m = date.month + 12 * a - 3;
    const jd =
        date.day +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) -
        Math.floor(y / 100) +
        Math.floor(y / 400) -
        32045;


    const jTime =
        ((date.hour - 12) / 24) +
        (date.minute / 1440) +
        (date.second / 86400);
    return jd + jTime;
}


function convertJulianDateToGregorianDate(julian: number): GregorianCalendarDate {
    julian = julian - 1721119;

    let year: number = Math.floor((4 * julian - 1) / 146097);
    julian = 4 * julian - 1 - 146097 * year;

    let day: number = Math.floor(julian / 4);
    julian = Math.floor((4 * day + 3) / 1461);

    day = 4 * day + 3 - 1461 * julian;
    day = Math.floor((day + 4) / 4);

    let month = Math.floor((5 * day - 3) / 153);

    day = 5 * day - 3 - 153 * month;
    day = Math.floor((day + 5) / 5);

    year = 100 * year + julian;
    if (month < 10) {
        month = month + 3
    }
    else {
        month = month - 9;
        year = year + 1
    }

    return {
        day: day,
        month: month,
        year: year,
        hour: 0,
        minute: 0,
        second: 0
    }
}




function convertJulianCalendarToJulianDate(julianDate: JulianCalendarDate) {
    const a = Math.floor((14 - julianDate.month) / 12);
    const y = julianDate.year + 4800 - a;
    const m = julianDate.month + (12 * a) - 3;
    const jd =
        julianDate.day +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) - 32083;
    return jd;
}


function convertJulianDateToJulianCalendar(julianDate: number): JulianCalendarDate {
    const b = julianDate + 1524;
    const century = Math.floor((b - 122.1) / 365.25);
    const f = Math.floor(365.25 * century);
    const e = Math.floor((b - f) / 30.6001);

    let month, day, year;
    if (e > 13) {
        month = e - 13;
    }
    else {
        month = e - 1
    }
    day = b - f - Math.floor(30.6001 * e);

    if (month < 3) {
        year = century - 4715
    } else {
        year = century - 4716
    }

    return {
        day: day,
        month: month,
        year: year
    }

}












// references: function ThingyanTime(my)
function getMyanmarThingyanTimeInJulianDate(myanmarYear: number) {
    var SE3 = 1312;
    //beginning of 3rd Era
    const ja = SOLAR_YEAR * myanmarYear + MYANMAR_EPOCH;
    let jk;
    if (myanmarYear >= SE3) {
        jk = ja - 2.169918982;
    } else {
        jk = ja - 2.1675
    };
    return {
        aTatTime: ja,
        aKyaTime: jk,
        aTatDay: Math.round(ja),
        aKyaDay: Math.round(jk)
    };
}




export function convertKaliYugaYearToJulianDate(kaliYugaYear: number): number {
    const myanmarYear = kaliYugaYear - 3739;
    return SOLAR_YEAR * myanmarYear + MYANMAR_EPOCH;
}
















// references: chk_watat()
function checkWatat(myanmarYear: number) {
    for (var i = MyanmarEras.length - 1;
        i > 0;
        i--) if (myanmarYear >= MyanmarEras[i].begin) break;//get data for respective era
    let era = MyanmarEras[i];
    var NM = era.NM, WO = era.WO;
    // var SOLAR_YEAR = 1577917828 / 4320000;
    //solar year (365.2587565)
    // let LUNER_MONTH = 1577917828 / 53433336;
    //lunar month (29.53058795) 
    // let MYANMAR_EPOCH = 1954168.050623;
    //beginning of 0 ME

    let TA = (SOLAR_YEAR / 12 - LUNER_MONTH) * (12 - NM);
    //threshold to adjust
    var excessDays = (SOLAR_YEAR * (myanmarYear + 3739)) % LUNER_MONTH;
    // excess day
    if (excessDays < TA) excessDays += LUNER_MONTH;//adjust excess days
    let fullMoon = Math.round(SOLAR_YEAR * myanmarYear + MYANMAR_EPOCH - excessDays + 4.5 * LUNER_MONTH + WO);//full moon day of 2nd Waso
    let TW = 0, watat = 0;//find watat
    if (era.eraId >= 2) {//if 2nd era or later find watat based on excess days
        TW = LUNER_MONTH - (SOLAR_YEAR / 12 - LUNER_MONTH) * NM;
        if (excessDays >= TW) watat = 1;
    }
    else {//if 1st era,find watat by 19 years metonic cycle
        //Myanmar year is divided by 19 and there is intercalary month
        //if the remainder is 2,5,7,10,13,15,18
        //https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
        watat = (myanmarYear * 7 + 2) % 19;
        if (watat < 0) watat += 19;
        watat = Math.floor(watat / 12);
    }
    i = BinarySearch.search2D(myanmarYear, era.wte);
    if (i >= 0) watat = era.wte[i][1];//correct watat exceptions
    if (watat) {
        i = BinarySearch.search2D(myanmarYear, era.fme);
        if (i >= 0) fullMoon += era.fme[i][1];
    }//correct full moon day exceptions
    return { fullMoon: fullMoon, watat: watat };
}


// references: chk_my()
function checkOverlap(my: number): MyanmarCalendarOverlapInfo {
    var yd = 0, y1, nd = 0, watError = 0, fullMoon = 0;
    var y2 = checkWatat(my);
    var myanmarYearType = y2.watat;
    do {
        yd++;
        y1 = checkWatat(my - yd);
    } while (y1.watat == 0 && yd < 3);

    if (myanmarYearType) {
        nd = (y2.fullMoon - y1.fullMoon) % 354;
        myanmarYearType = Math.floor(nd / 31) + 1;
        fullMoon = y2.fullMoon;
        if (nd != 30 && nd != 31) {
            watError = 1;
        }
    }
    else fullMoon = y1.fullMoon + 354 * yd;
    var firstTagu = y1.fullMoon + 354 * yd - 102;
    return {
        myanmarYearType,
        firstTagu,
        fullMoon,
        watError: watError
    };
}



// references : j2m()
function convertJulianDateToMyanmarDate(julianDate: number): MyanmarCalendarDateInfo {
    let jdn, myanmarYear, yearOverlap, dayCount, lengthOfDaysInYear, myanmarMonthType, a, b, c, e, f, myanmarMonth, myanmarDayOfMonth, myanmarMonthLength, moonPhase, fortnightDay, weekDay;
    jdn = Math.round(julianDate);//convert jd to jdn
    myanmarYear = Math.floor((jdn - 0.5 - MYANMAR_EPOCH) / SOLAR_YEAR);//Myanmar year
    yearOverlap = checkOverlap(myanmarYear);//check year
    dayCount = jdn - yearOverlap.firstTagu + 1;

    //day count
    b = Math.floor(yearOverlap.myanmarYearType / 2);
    c = Math.floor(1 / (yearOverlap.myanmarYearType + 1));

    //big wa and common yr
    lengthOfDaysInYear = 354 + (1 - c) * 30 + b;//year length
    myanmarMonthType = Math.floor((dayCount - 1) / lengthOfDaysInYear);//month type: Hnaung =1 or Oo = 0
    dayCount -= myanmarMonthType * lengthOfDaysInYear;
    a = Math.floor((dayCount + 423) / 512);

    //adjust day count and threshold
    myanmarMonth = Math.floor((dayCount - b * a + c * a * 30 + 29.26) / 29.544);//month
    e = Math.floor((myanmarMonth + 12) / 16);
    f = Math.floor((myanmarMonth + 11) / 16);
    myanmarDayOfMonth = dayCount - Math.floor(29.544 * myanmarMonth - 29.26) - b * e + c * f * 30; //day
    myanmarMonth += f * 3 - e * 4;
    myanmarMonthLength = 30 - myanmarMonth % 2; //adjust month and month length
    if (myanmarMonth == 3) myanmarMonthLength += b; //adjust if Nayon in big watat
    moonPhase = Math.floor((myanmarDayOfMonth + 1) / 16) + Math.floor(myanmarDayOfMonth / 16) + Math.floor(myanmarDayOfMonth / myanmarMonthLength);
    fortnightDay = myanmarDayOfMonth - 15 * Math.floor(myanmarDayOfMonth / 16); // waxing or waning day
    weekDay = (jdn + 2) % 7; //week day

    const buddhistYear = myanmarYear + 1182;

    return {
        year: myanmarYear,
        month: myanmarMonth,
        day: myanmarDayOfMonth,
        yearOverlap: yearOverlap,
        firstTagu: yearOverlap.firstTagu,
        lengthOfDaysInYear,
        myanmarMonthType,
        myanmarMonthLength,
        moonPhase,
        fortnightDay,
        weekDay,
        weekDayName: WeekDay[weekDay],
        buddhistYear
    }

    // return {
    //     my: myanmarYear,
    //     myt: yearOverlap.myt,
    //     myl: lengthOfDaysInYear,
    //     mm: myanmarMonth,
    //     mmt: myanmarMonthType,
    //     mml: myanmarMonthLength,
    //     md: myanmarDayOfMonth,
    //     mp: moonPhase,
    //     fd: fortnightDay,
    //     wd: weekDay
    // };
}


// references : m2j()
function convertMyanmarDateToJulianDate(myanmarYear: number, myanmarMonth: number, myanmarMonthType: number, moonPhase: number, fortnightDay: number) {
    let b, c: number, mml, m1, m2, md, dd;
    let yo = checkOverlap(myanmarYear);//check year
    b = Math.floor(yo.myanmarYearType / 2);
    c = yo.myanmarYearType == 0 ? 1 : 0; // if big watat and common year
    mml = 30 - myanmarMonth % 2;//month length
    if (myanmarMonth == 3) mml += b;//adjust if Nayon in big watat
    m1 = moonPhase % 2; m2 = Math.floor(moonPhase / 2); md = m1 * (15 + m2 * (mml - 15)) + (1 - m1) * (fortnightDay + 15 * m2);
    myanmarMonth += 4 - Math.floor((myanmarMonth + 15) / 16) * 4 + Math.floor((myanmarMonth + 12) / 16);//adjust month
    dd = md + Math.floor(29.544 * myanmarMonth - 29.26) - c * Math.floor((myanmarMonth + 11) / 16) * 30
        + b * Math.floor((myanmarMonth + 12) / 16);
    let myanmarYearLength = 354 + (1 - c) * 30 + b; //year length
    dd += myanmarMonthType * myanmarYearLength; //adjust day count
    return dd + yo.firstTagu - 1;
}






// sabbath,  ဥပုသ်
// sabbatheve, အဖိတ်နေ့
// yatyaza, ရက်ရာဇာ
// pyathada, ပြဿဒါး
// thamanyo, သမားညို
// amyeittasote, အမြိတ္တစုတ်
// warameittugyi, ဝါရမိတ္တုကြီး
// warameittunge, ဝါရမိတ္တုငယ်
// yatpote, ရက်ပုပ်
// thamaphyu, သမားဖြူ
// nagapor, နဂါးပေါ်
// yatyotema, ရက်ယုတ်မာ
// mahayatkyan, မဟာရက်ကြမ်း
// shanyat, ရှမ်းရက်
// nagahle [0=west, 1=north, 2=east, 3=south], နဂါးခေါင်းလှည့်
// mahabote [0=Binga, 1=Atun, 2=Yaza, 3=Adipati, 4= Marana, 5=Thike, 6=Puti] မဟာဘုတ်
// nakhat [0=orc, 1=elf, 2=human] နက္ခတ်
function astro({ myanmarMonth, myanmarMonthLength, myanmarDayOfMonth, weekday, myanmarYear }: { myanmarMonth: number, myanmarMonthLength: number, myanmarDayOfMonth: number, weekday: number, myanmarYear: number }): Astro {


    var d, sabbath, sabbatheve, yatyaza, pyathada, thamanyo, amyeittasote;
    var warameittugyi, warameittunge, yatpote, thamaphyu, nagapor, yatyotema;
    var mahayatkyan, shanyat, nagahle, m1, wd1, wd2, wda, sya, mahabote;

    if (myanmarMonth <= 0) myanmarMonth = 4; //first waso is considered waso
    d = myanmarDayOfMonth - 15 * Math.floor(myanmarDayOfMonth / 16); //waxing or waning day [0-15]

    sabbath = 0;
    if ((myanmarDayOfMonth == 8) || (myanmarDayOfMonth == 15) || (myanmarDayOfMonth == 23) || (myanmarDayOfMonth == myanmarMonthLength)) sabbath = 1;

    sabbatheve = 0;
    if ((myanmarDayOfMonth == 7) || (myanmarDayOfMonth == 14) || (myanmarDayOfMonth == 22) || (myanmarDayOfMonth == (myanmarMonthLength - 1))) sabbatheve = 1;

    yatyaza = 0;
    m1 = myanmarMonth % 4;
    wd1 = Math.floor(m1 / 2) + 4;
    wd2 = ((1 - Math.floor(m1 / 2)) + m1 % 2) * (1 + 2 * (m1 % 2));
    if ((weekday == wd1) || (weekday == wd2)) yatyaza = 1;

    pyathada = 0;
    wda = [1, 3, 3, 0, 2, 1, 2];
    if (m1 == wda[weekday]) pyathada = 1;
    if ((m1 == 0) && (weekday == 4)) pyathada = 2;//afternoon pyathada

    thamanyo = 0;
    m1 = myanmarMonth - 1 - Math.floor(myanmarMonth / 9);
    wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
    wd2 = (weekday + 7 - wd1) % 7;
    if (wd2 <= 1) thamanyo = 1;

    amyeittasote = 0;
    wda = [5, 8, 3, 7, 2, 4, 1];
    if (d == wda[weekday]) amyeittasote = 1;

    warameittugyi = 0;
    wda = [7, 1, 4, 8, 9, 6, 3];
    if (d == wda[weekday]) warameittugyi = 1;

    warameittunge = 0;
    let wn = (weekday + 6) % 7;
    if ((12 - d) == wn) warameittunge = 1;

    yatpote = 0;
    wda = [8, 1, 4, 6, 9, 8, 7];
    if (d == wda[weekday]) yatpote = 1;

    thamaphyu = 0;
    wda = [1, 2, 6, 6, 5, 6, 7];
    if (d == wda[weekday]) thamaphyu = 1;

    wda = [0, 1, 0, 0, 0, 3, 3];
    if (d == wda[weekday]) thamaphyu = 1;
    if ((d == 4) && (weekday == 5)) thamaphyu = 1;

    nagapor = 0;
    wda = [26, 21, 2, 10, 18, 2, 21];
    if (myanmarDayOfMonth == wda[weekday]) nagapor = 1;
    wda = [17, 19, 1, 0, 9, 0, 0];
    if (myanmarDayOfMonth == wda[weekday]) nagapor = 1;
    if (((myanmarDayOfMonth == 2) && (weekday == 1)) || (((myanmarDayOfMonth == 12) || (myanmarDayOfMonth == 4) || (myanmarDayOfMonth == 18)) && (weekday == 2))) nagapor = 1;

    yatyotema = 0;
    m1 = (myanmarMonth % 2) ? myanmarMonth : ((myanmarMonth + 9) % 12);
    m1 = (m1 + 4) % 12 + 1;
    if (d == m1) yatyotema = 1;

    mahayatkyan = 0;
    m1 = (Math.floor((myanmarMonth % 12) / 2) + 4) % 6 + 1;
    if (d == m1) mahayatkyan = 1;

    shanyat = 0;
    sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
    if (d == sya[myanmarMonth - 1]) shanyat = 1;

    nagahle = Math.floor((myanmarMonth % 12) / 3);

    mahabote = (myanmarYear - weekday) % 7;

    let nakhat = myanmarYear % 3;

    return {
        sabbath: sabbath == 1,
        sabbatheve: sabbatheve == 1,
        yatyaza: yatyaza == 1,
        pyathada: pyathada == 1,
        thamanyo: thamanyo == 1,
        amyeittasote: amyeittasote == 1,
        warameittugyi: warameittugyi == 1,
        warameittunge: warameittunge == 1,
        yatpote: yatpote == 1,
        thamaphyu: thamaphyu == 1,
        nagapor: nagapor == 1,
        yatyotema: yatyotema == 1,
        mahayatkyan: mahayatkyan == 1,
        shanyat: shanyat == 1,
        nagahle: NgarHle[nagahle],
        mahabote: MahaBote[mahabote],
        nakhat: Nakhat[nakhat],
    };
}




function getMyanmarPublicHolidaysInGregorianCalendarOfYear(year: number, {lang}: { lang: Language } = {lang: 'mm'}): RecursiveEventDate[] {

    const events: IRecursiveEventDate[] = [
        ...InternationalFixedPublicHolidaysInGregorianCalendar,
        ...MyanmarFixedPublicHolidaysInGregorianCalendar,
        ...ChineseFixedPublicHolidaysInGregorianCalendar
    ];

    const date: IDate = { day: 1, month: 1, year: year };
    const julianDate = convertGregorianToJulianDate({ ...date, hour: 0, minute: 0, second: 0 });
    const myanmarDate = convertJulianDateToMyanmarDate(julianDate);


    const thingyanInJulianDate = getMyanmarThingyanTimeInJulianDate(myanmarDate.year);
    const atat = convertJulianDateToGregorianDate(thingyanInJulianDate.aTatDay);
    const aKyaDay = convertJulianDateToGregorianDate(thingyanInJulianDate.aKyaDay);
    events.push({ name: 'thingyan akyo', key: 'thingyan-akyo', day: aKyaDay.day - 1, month: atat.month, culture: 'burmese', type: 'lunar' });
    events.push({ name: 'thingyan akya', key: 'thingyan-akya', day: aKyaDay.day, month: aKyaDay.month, culture: 'burmese', type: 'lunar' });
    for (let i = aKyaDay.day; i < atat.day - 1; i++) {
        events.push({ name: 'thingyan', key: 'thingyan', day: i + 1, month: aKyaDay.month, culture: 'burmese', type: 'lunar' });
    }
    events.push({ name: 'thingyan atat', key: 'thingyan-atat', day: atat.day, month: atat.month, culture: 'burmese', type: 'lunar' });
    events.push({ name: 'thingyan nhit san day', key: 'thingyan-new-year', day: atat.day + 1, month: atat.month, culture: 'burmese', type: 'lunar' });


    // dabaung
    const dabaungDate = convertMyanmarDateToJulianDate(myanmarDate.year, MyanmarMonths.Tabaung, myanmarDate.myanmarMonthType, MoonPhase.fullMoon, 29);
    const dabaungDateGregorian = convertJulianDateToGregorianDate(dabaungDate);
    events.push({ name: 'တပေါင်းလပြည့်နေ', key: 'thaboung-fullmoon', day: dabaungDateGregorian.day, month: dabaungDateGregorian.month, culture: 'burmese', type: 'lunar' });

    // thadingyut 
    const thadingyutDate = convertMyanmarDateToJulianDate(myanmarDate.year + 1, MyanmarMonths.Thadingyut, myanmarDate.myanmarMonthType, MoonPhase.fullMoon, 1);
    const gDate = convertJulianDateToGregorianDate(thadingyutDate);
    events.push({ name: 'thadingyut', key: 'thingyan', day: gDate.day - 1, month: gDate.month, culture: 'burmese', type: 'lunar' });
    events.push({ name: 'thadingyut', key: 'thingyan', day: gDate.day, month: gDate.month, culture: 'burmese', type: 'lunar' });
    events.push({ name: 'thadingyut', key: 'thingyan', day: gDate.day + 1, month: gDate.month, culture: 'burmese', type: 'lunar' });

    // dhamaSakyar
    const dhamaSakyarDate = convertMyanmarDateToJulianDate(myanmarDate.year + 1, MyanmarMonths.Waso, myanmarDate.myanmarMonthType, MoonPhase.fullMoon, 29);
    const dhamaSakyarDateGregorian = convertJulianDateToGregorianDate(dhamaSakyarDate);
    events.push({ name: 'dhamaSakyar', key: 'dhamasakyar-fullmoon', day: dhamaSakyarDateGregorian.day, month: dhamaSakyarDateGregorian.month, culture: 'burmese', type: 'lunar' });

    // kason nyaung yay toon event
    const kasonNyaungYayToonDate = convertMyanmarDateToJulianDate(myanmarDate.year + 1, MyanmarMonths.Kason, myanmarDate.myanmarMonthType, MoonPhase.fullMoon, 29);
    const kasonNyaungYayToonDateGregorian = convertJulianDateToGregorianDate(kasonNyaungYayToonDate);
    events.push({ name: 'ကဆုန်ညောင်ရေသွန်းပွဲ', key: 'kason-fullmoon', day: kasonNyaungYayToonDateGregorian.day, month: kasonNyaungYayToonDateGregorian.month, culture: 'burmese', type: 'lunar' });

    // တန်းဆောင်မုန်းလပြည့်နေ့
    const thasaungmonFullmoonDate = convertMyanmarDateToJulianDate(myanmarDate.year + 1, MyanmarMonths.Tazaungmon, myanmarDate.myanmarMonthType, MoonPhase.fullMoon, 15);
    const thasaungmonFullmoonDateGregorian = convertJulianDateToGregorianDate(thasaungmonFullmoonDate);
    events.push({ name: 'တန်းဆောင်မုန်းလပြည့်နေ့', key: 'tasaungmone-fullmoon', day: thasaungmonFullmoonDateGregorian.day, month: thasaungmonFullmoonDateGregorian.month, culture: 'burmese', type: 'lunar' });

    // ကရင်နှစ်သစ်ကူး
    const karenNewYearDate = convertMyanmarDateToJulianDate(myanmarDate.year + 1, MyanmarMonths.Pyatho, myanmarDate.myanmarMonthType, MoonPhase.waxing, 1);
    const karenNewYearDateGregorian = convertJulianDateToGregorianDate(karenNewYearDate);
    events.push({ name: 'Karen new year', key: 'karen-new-year', day: karenNewYearDateGregorian.day, month: karenNewYearDateGregorian.month, culture: 'burmese', type: 'lunar' });





    const chuXi = Lunar.fromYmd(year, 1, 1).getSolar();
    events.push({ name: '除夕', key: 'qi-xi', day: chuXi.getDay(), month: chuXi.getMonth(), culture: 'chinese', type: 'lunar' });

    const chineseNewYear = getChineseNewYear(year);
    events.push({ name: 'chinese new year', key: 'xin-nian', day: chineseNewYear.getDate(), month: chineseNewYear.getMonth() + 1, culture: 'chinese', type: 'lunar' });

    const qingShuiZuShiJie = Lunar.fromYmd(year, 1, 6).getSolar();
    events.push({ name: '清水祖师', key: 'qing-shui-zu-shi-jie', day: qingShuiZuShiJie.getDay(), month: qingShuiZuShiJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const tiangongbirthday = Lunar.fromYmd(year, 1, 9).getSolar();
    events.push({ name: '天宫宝生', key: 'tian-gong-birthday', day: tiangongbirthday.getDay(), month: tiangongbirthday.getMonth(), culture: 'chinese', type: 'lunar' });

    const yuanxiaojie = Lunar.fromYmd(year, 1, 15).getSolar();
    events.push({ name: '元宵节', key: 'yuan-xiao-jie', day: yuanxiaojie.getDay(), month: yuanxiaojie.getMonth(), culture: 'chinese', type: 'lunar' });

    const daizhi = Lunar.fromYmd(year, 1, 18).getSolar();
    events.push({ name: '岱枝兴福', key: 'dai-zhi', day: daizhi.getDay(), month: daizhi.getMonth(), culture: 'chinese', type: 'lunar' });

    const fuDe = Lunar.fromYmd(year, 2, 2).getSolar();
    events.push({ name: '福德正神诞辰', key: 'fu-de', day: fuDe.getDay(), month: fuDe.getMonth(), culture: 'chinese', type: 'lunar' });

    const guanYinBirthday = Lunar.fromYmd(year, 2, 19).getSolar();
    events.push({ name: '观音宝诞', key: 'guan-yin-birthday', day: guanYinBirthday.getDay(), month: guanYinBirthday.getMonth(), culture: 'chinese', type: 'lunar' });

    const qingMingJie = Lunar.fromYmd(year, 3, 7).getSolar();
    events.push({ name: '清明节', key: 'qing-ming', day: qingMingJie.getDay(), month: qingMingJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const maZuoJie = Lunar.fromYmd(year, 3, 23).getSolar();
    events.push({ name: '马祖宝生', key: 'ma-zuo', day: maZuoJie.getDay(), month: maZuoJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const duanWuJie = Lunar.fromYmd(year, 5, 5).getSolar();
    events.push({ name: '端午节', key: 'duan-wu', day: duanWuJie.getDay(), month: duanWuJie.getMonth(), culture: 'chinese', type: 'lunar' })

    const guanYinDeDao = Lunar.fromYmd(year, 6, 19).getSolar();
    events.push({ name: '观音得道', key: 'guan-yin-de-dao', day: guanYinDeDao.getDay(), month: guanYinDeDao.getMonth(), culture: 'chinese', type: 'lunar' })

    const qiXi = Lunar.fromYmd(year, 7, 7).getSolar();
    events.push({ name: '七夕', key: 'qi-xi', day: qiXi.getDay(), month: qiXi.getMonth(), culture: 'chinese', type: 'lunar' });

    const zhongYuanJie = Lunar.fromYmd(year, 7, 15).getSolar();
    events.push({ name: '中元节', key:'zhong-yuan', day: zhongYuanJie.getDay(), month: zhongYuanJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const kongZiBirthday = Lunar.fromYmd(year, 8, 7).getSolar();
    events.push({ name: '孔子诞辰', key: 'kong-zi-birthday', day: kongZiBirthday.getDay(), month: kongZiBirthday.getMonth(), culture: 'chinese', type: 'lunar' });

    const zhongQiuJie = Lunar.fromYmd(year, 8, 15).getSolar();
    events.push({ name: '中秋节', key: 'zhong-qiu', day: zhongQiuJie.getDay(), month: zhongQiuJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const zhongYangJie = Lunar.fromYmd(year, 9, 9).getSolar();
    events.push({ name: '重阳节（တရုတ်ရှင်ဥပဂုတ္တပူဇော်ပွဲ）', key: 'zhong-yang', day: zhongYangJie.getDay(), month: zhongYangJie.getMonth(), culture: 'chinese', type: 'lunar' });

    const guanYinChuJia = Lunar.fromYmd(year, 9, 19).getSolar();
    events.push({ name: '观音出家', key: 'guan-yin-chu-jia', day: guanYinChuJia.getDay(), month: guanYinChuJia.getMonth(), culture: 'chinese', type: 'lunar' });

    const dongzhi = Lunar.fromYmd(year, 11, 2).getSolar();
    events.push({ name: '冬至', key: 'dong-zhi', day: dongzhi.getDay(), month: dongzhi.getMonth(), culture: 'chinese', type: 'lunar' });



    return events.sort((a: IRecursiveEventDate, b: IRecursiveEventDate) => {
        if (a.month == b.month) {
            return a.day - b.day;
        }
        return a.month - b.month;
    }).map(event => {
        const e = new RecursiveEventDate({...event, lang});
        return e;
    });
}



export class MMDate {
    private date: GregorianCalendarDate;
    private myanmarDate: MyanmarCalendarDateInfo;
    private holiday: RecursiveEventDate[] | null = null;
    private lang: Language = 'mm';

    constructor(date: NullableTimeGregorianCalendarDate) {
        this.date = {
            day: date.day,
            month: date.month,
            year: date.year,
            hour: date.hour || 0,
            minute: date.minute || 0,
            second: date.second || 0
        };
        const jdn = convertGregorianToJulianDate(this.date);
        this.myanmarDate = convertJulianDateToMyanmarDate(jdn);
    }

    static fromMyanmarDate(date: MyanmarCalendarDate): MMDate {
        const jdn = convertMyanmarDateToJulianDate(date.year, date.month, date.myanmarMonthType, date.moonPhase, date.fortnightDay);
        const gregorianDate = convertJulianDateToGregorianDate(jdn);
        return new MMDate(gregorianDate);
    }

    static getHolidaysOfYear(year: number, { lang } : { lang: Language } = {lang: 'mm'}) {
        return getMyanmarPublicHolidaysInGregorianCalendarOfYear(year, {lang});
    }


    get astro(): Astro {
        const myanmarDate = this.myanmarDate;
        return astro({
            myanmarYear: myanmarDate.year,
            myanmarDayOfMonth: myanmarDate.day,
            myanmarMonth: myanmarDate.month,
            myanmarMonthLength: myanmarDate.myanmarMonthLength,
            weekday: myanmarDate.weekDay,
        });
    }

    toJulian(): number {
        return convertGregorianToJulianDate(this.date);
    }

    toGregorian(): GregorianCalendarDate {
        return this.date;
    }

    toDate(): Date {
        return new Date(this.date.year, this.date.month - 1, this.date.day, this.date.hour, this.date.minute, this.date.second);
    }

    toMoment(): Moment {
        return moment(this.toDate());
    }

    getRaw(): MyanmarCalendarDateInfo {
        return this.myanmarDate;
    }

    toLunisolar(): MyanmarCalendarDate {
        const jdn = this.toJulian();
        const toMyanmarDate = convertJulianDateToMyanmarDate(jdn);
        return {
            day: toMyanmarDate.day,
            month: toMyanmarDate.month,
            year: toMyanmarDate.year,
            moonPhase: toMyanmarDate.moonPhase,
            weekDay: toMyanmarDate.weekDay,
            weekDayName: WeekDay[toMyanmarDate.weekDay],
            myanmarMonthType: toMyanmarDate.myanmarMonthType,
            fortnightDay: toMyanmarDate.fortnightDay,
            buddhistYear: toMyanmarDate.buddhistYear
        }
    }

    isMyanmarHoliday(): boolean {
        return this.isLunarBasedHoliday() || this.isFixedDateHoliday();
    }

    isLunarBasedHoliday(): boolean {
        this.#assignHoliday();
        return !!this.holiday!.find(h => h.type == 'lunar');
    }

    isFixedDateHoliday(): boolean {
        this.#assignHoliday();
        return !!this.holiday!.find(h => h.type == 'fixed');
    }

    isFullmoonDay(): boolean{
        return this.myanmarDate.fortnightDay == 15;
    }

    get holidays() : RecursiveEventDate[]{
        this.#assignHoliday();
        return this.holiday!;
    }

    #assignHoliday(){
        if(this.holiday == null){
            const holi = getMyanmarPublicHolidaysInGregorianCalendarOfYear(this.date.year);
            this.holiday = holi.filter(h => h.month == this.date.month && h.day == this.date.day);
        }
    }
    
    clone(): MMDate {
        return new MMDate(cloneDeep(this.date));
    }
}