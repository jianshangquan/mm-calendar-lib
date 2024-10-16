import { IRecursiveEventDate } from "./types"

export const InternationalFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: 'new year', key: 'new-year', day: 1, month: 1, culture: 'international', type: 'fixed' }, // new year
    { name: 'valentine day', key: 'valentine', day: 14, month: 2, culture: 'international', type: 'fixed' }, // valentine day
    { name: 'woman day', key: 'woman-day', day: 8, month: 3, culture: 'international', type: 'fixed' }, // international woman day
    { name: 'april fool', key: 'april-fool', day: 1, month: 4, culture: 'international', type: 'fixed' }, // april fool
    { name: 'mother day', key: 'mother-day', day: 11, month: 5, culture: 'international', type: 'fixed' }, // mother day
    { name: 'father day', key: 'father-day', day: 15, month: 6, culture: 'international', type: 'fixed' }, // father day
    { name: 'chirstmas', key: 'christmas', day: 25, month: 12, culture: 'international', type: 'fixed' }, // Christmas
]

export const MyanmarFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: 'indenpendence day',key: 'independent-day', day: 14, month: 1, culture: 'international', type: 'fixed' }, // new year
    { name: 'union day', key: 'union-day', day: 12, month: 2, culture: 'burmese', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'may day', key: 'may-day', day: 1, month: 5, culture: 'burmese', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'general aung san birthday', key: 'aung-san-birthday', day: 13, month: 2, culture: 'burmese', type: 'fixed' }, // union day ပြည်ထောင်စုနေ့
    { name: 'peasants day', key: 'peasants-day', day: 2, month: 3, culture: 'burmese', type: 'fixed' }, // Peasants' Day တောင်သူလယ်သမားနေ့
    { name: 'တော်လှန်ရေးနေ့', key: 'martyrs-day', day: 27, month: 3, culture: 'burmese', type: 'fixed' }, // တော်လှန်ရေးနေ့
    { name: '19july', key: 'guo-qing-jie', day: 19, month: 7, culture: 'burmese', type: 'fixed' }, // 19 july general aung san birthday အာဇာနီနေ့
    { name: 'national day', key: 'national-day', day: 14, month: 11, culture: 'burmese', type: 'fixed' }, // National Day အမျိုးသားနေ့
]

export const ChineseFixedPublicHolidaysInGregorianCalendar: IRecursiveEventDate[] = [
    { name: '国庆节', key: 'guo-qing-jie', day: 1, month: 10, culture: 'chinese', type: 'fixed' }, // 国庆节
]