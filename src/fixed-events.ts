import { Lunar } from "lunar-typescript";
import { IRecursiveEventDate, IRecursiveMyanmarEventDate } from "./types"
import { convertJulianDateToGregorianDate, convertMyanmarDateToJulianDate } from "./lib";
import { Language } from '../dist/intl';
import Lang from "./intl";
import { Utils } from "./utils";

export const InternationalFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: 'new year', key: 'new-year', day: 1, month: 1, culture: 'international', type: 'fixed' }, // new year
    { name: 'valentine day', key: 'valentine', day: 14, month: 2, culture: 'international', type: 'fixed' }, // valentine day
    { name: 'woman day', key: 'woman-day', day: 8, month: 3, culture: 'international', type: 'fixed' }, // international woman day
    { name: 'april fool', key: 'april-fool', day: 1, month: 4, culture: 'international', type: 'fixed' }, // april fool
    { name: 'may day', key: 'may-day', day: 1, month: 5, culture: 'international', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'mother day', key: 'mother-day', day: 11, month: 5, culture: 'international', type: 'fixed' }, // mother day
    { name: 'father day', key: 'father-day', day: 15, month: 6, culture: 'international', type: 'fixed' }, // father day
    { name: 'chirstmas', key: 'christmas', day: 25, month: 12, culture: 'international', type: 'fixed' }, // Christmas
]

export const MyanmarFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: 'indenpendence day', key: 'independent-day', day: 14, month: 1, culture: 'international', type: 'fixed' }, // new year
    { name: 'union day', key: 'union-day', day: 12, month: 2, culture: 'burmese', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'general aung san birthday', key: 'aung-san-birthday', day: 13, month: 2, culture: 'burmese', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'peasants day', key: 'peasants-day', day: 2, month: 3, culture: 'burmese', type: 'fixed' }, // Peasants' Day တောင်သူလယ်သမားနေ့
    { name: 'တော်လှန်ရေးနေ့', key: 'martyrs-day', day: 27, month: 3, culture: 'burmese', type: 'fixed' }, // တော်လှန်ရေးနေ့
    { name: '19july', key: 'guo-qing-jie', day: 19, month: 7, culture: 'burmese', type: 'fixed' }, // 19 july general aung san birthday အာဇာနီနေ့
    { name: 'national day', key: 'national-day', day: 14, month: 11, culture: 'burmese', type: 'fixed' }, // National Day အမျိုးသားနေ့
]

export const ChineseFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: '国庆节', key: 'guo-qing-jie', day: 1, month: 10, culture: 'chinese', type: 'fixed' }, // 国庆节
]


export let SHOW_DEFAULT_HOLIDAYS = true;



export type CustomHolidayCallback = (year: number) => IRecursiveEventDate;
export let CustomHolidays: (IRecursiveEventDate | CustomHolidayCallback)[] = [];


interface HolidayCustomTranslation {
    translation: { [keyof in Language]: string }
}

export const HolidaysConfig = {
    clear() {
        this.clearCustomHoliday();
        this.hideDefaultHoliday();
    },
    clearCustomHoliday() {
        CustomHolidays = [];
    },
    hideDefaultHoliday() {
        SHOW_DEFAULT_HOLIDAYS = false;
    },
    deleteCustomHoliday(key: string) {
        const index = CustomHolidays.findIndex(item => {
            const h = item as any;
            return h.key == key;
        });
        if (index >= 0) {
            CustomHolidays.splice(index, 1);
            delete Lang['cn'][key];
            delete Lang['en'][key];
            delete Lang['mm'][key];
        }
    },
    add(event: (IRecursiveEventDate | IRecursiveMyanmarEventDate) & HolidayCustomTranslation) {
        const { name, key, day, month, culture, type } = event;
        if (type == 'fixed') {
            CustomHolidays.push({ name, key, day, month, culture, type });
        } else {
            const callback = (inputYear: number) => {
                if (culture == 'chinese') {
                    const solar = Lunar.fromYmd(inputYear, month, day).getSolar();
                    return { name, key, day: solar.getDay(), month: solar.getMonth(), culture, type };
                } else if (culture == 'burmese') {
                    const { monthType, moonPhase } = (event as IRecursiveMyanmarEventDate)

                    if(Utils.isNothing(monthType) || Utils.isNothing(moonPhase))
                        throw new Error('monthType or moonPhase cannot be null')
                    
                    const jdn = convertMyanmarDateToJulianDate(inputYear, month, monthType, moonPhase, day);
                    const myanmarDate = convertJulianDateToGregorianDate(jdn);
                    return { name, key, day: myanmarDate.day, month: myanmarDate.month, culture, type };
                }
                return { name, key, day, month, culture, type };
            };

            Object.defineProperty(callback, 'key', {
                get: function () {
                    return key;
                },
                configurable: true, // Whether the property can be deleted or changed
                enumerable: true    // Whether the property shows up during enumeration (e.g., in a for...in loop)
            });

            CustomHolidays.push(callback);
        }

        const translation = event.translation;
        Lang['cn'][key] = translation.cn;
        Lang['en'][key] = translation.en;
        Lang['mm'][key] = translation.mm;
    }
}

