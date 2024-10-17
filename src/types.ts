import Lang, { Language, LanguageTranslationKey } from "./intl";
import { MyanmarDate } from "./lib";

export interface IDate {
    year: number;
    month: number;
    day: number;
}
export type Culture = 'chinese' | 'burmese' | 'international' | 'hindi'
export type RecursiveEventType = 'lunar' | 'fixed'

export interface IRecursiveEventDate{
    name: string;
    day: number;
    month: number;
    culture: Culture;
    type: RecursiveEventType;
    key: LanguageTranslationKey
}

export interface IRecursiveMyanmarEventDate{
    name: string;
    day: number;
    month: MyanmarMonths;
    culture: Culture;
    type: RecursiveEventType;
    key: LanguageTranslationKey,
    monthType: MyanmarMonthType,
    moonPhase: MoonPhase,
}

export class RecursiveEventDate{
    #name: string;
    day: number;
    month: number;
    culture: Culture;
    type: RecursiveEventType;
    key: LanguageTranslationKey;
    
    constructor({ key, day, month, culture, type, lang = 'mm', name }: { name: string, key: LanguageTranslationKey, day: number, month: number, culture: Culture, type: RecursiveEventType, lang: Language }){
        this.#name = Lang[lang][key as string] || name;
        this.key = key;
        this.day = day;
        this.month = month;
        this.culture = culture;
        this.type = type;
    }

    toMMDate(year: number) : MyanmarDate{
        return new MyanmarDate({year, month: this.month, day: this.day});
    }

    get name(): string{
        return this.#name;
    }
}
RecursiveEventDate.prototype.toString = function toString() {
    return JSON.stringify({ name: this.name, day: this.day, month: this.month, culture: this.culture, type: this.type }, null, 4);
};
  


export interface MyanmarCalendarDateInfo {
    year: number;
    month: MyanmarMonths;
    day: number;
    monthType?: MyanmarMonthType;
    moonPhase: MoonPhase;
    yearOverlap: MyanmarCalendarOverlapInfo,
    firstTagu: number,
    lengthOfDaysInYear: number,
    myanmarMonthType: number,
    myanmarMonthLength: number,
    fortnightDay: number,
    weekDay: number,
    weekDayName: string,
    buddhistYear: number
}

export type MyanmarCalendarDate = Omit<MyanmarCalendarDateInfo, 'weekDayName' | 'buddhistYear' | 'weekDay' | 'lengthOfDaysInYear' | 'yearOverlap' | 'firstTagu' | 'myanmarMonthLength'>

export interface MyanmarCalendarOverlapInfo {
    myanmarYearType: MyanmarYearType,
    firstTagu: number,
    fullMoon: MoonPhase,
    watError: any
}

export interface Astro {
    sabbath: boolean,
    sabbatheve: boolean,
    yatyaza: boolean,
    pyathada: boolean,
    thamanyo: boolean,
    amyeittasote: boolean,
    warameittugyi: boolean,
    warameittunge: boolean,
    yatpote: boolean,
    thamaphyu: boolean,
    nagapor: boolean,
    yatyotema: boolean,
    mahayatkyan: boolean,
    shanyat: boolean,
    nagahle: string,
    mahabote: string,
    nakhat: string,
}


export interface JulianCalendarDate extends IDate {
}

export interface GregorianCalendarDate extends IDate {
    hour: number;
    minute: number;
    second: number;
}

// Create a new type that makes hour, minute, and second nullable
export type NullableTimeGregorianCalendarDate = Omit<GregorianCalendarDate, 'hour' | 'minute' | 'second'> & {
    hour?: number | null;
    minute?: number | null;
    second?: number | null;
};


export enum MyanmarYearType {
    common = 0,
    littleWatat = 1,
    bigWatat = 2
}


export enum MyanmarMonths {
    Tagu = 1,
    Kason = 2,
    Nayon = 3,
    Waso1 = 0,
    Waso = 4,
    Wagaung = 5,
    Tawthalin = 6,
    Thadingyut = 7,
    Tazaungmon = 8,
    Nadaw = 9,
    Pyatho = 10,
    Tabodwe = 11,
    Tabaung = 12
}

export enum MyanmarMonthType {
    oo = 0,
    hnaung = 1,
}


export enum NgarHle {
    west = 0,
    north = 1,
    east = 2,
    south = 3
}


export enum MahaBote {
    Binga = 0,
    Atun = 1,
    Yaza = 2,
    Adipati = 3,
    Marana = 4,
    Thike = 5,
    Puti = 6
}


export enum Nakhat {
    orc = 0,
    elf = 1,
    human = 2
}


export enum MoonPhase {
    waxing = 0,
    fullMoon = 1,
    waning = 2,
    newMoon = 3
}


export enum WeekDay {
    saturday = 0,
    sunday = 1,
    monday = 2,
    tuesday = 3,
    wednesday = 4,
    thursday = 5,
    friday = 6
}