export type LanguageTranslationKey = keyof typeof en;
type LanguageTranslation = {
    [key in LanguageTranslationKey]: string;
}

export type Language = 'en' | 'cn' | 'mm';

const en = {
    'full-moon': 'Full Moon',
    'new-year': 'New Year',
    'valentine': 'Valentine day',
    'woman-day': 'Woman day',
    'april-fool': 'April fool',
    'mother-day': 'Mother day',
    'father-day': 'Father day',
    'christmas': 'Christmas',
    'independent-day': 'Independent day',
    'union-day': 'Union Day',
    'aung-san-birthday': 'Aung San Birthday',
    'peasants-day': 'Peasants day',
    'martyrs-day': 'Martyrs day',
    'national-day': 'Nation day',
    'may-day': 'May day',


    'thingyan-akyo': 'Thingyan aKyo', 
    'thingyan-akya': 'Thingyan aKya',
    'thingyan-atat': 'Thingyan aTat',
    'thingyan': 'Thingyan',
    'thingyan-new-year': 'Thingyan New Year',
    'thaboung-fullmoon': 'Tha Boung Full Moon',
    'thadingyut-before': 'Thadingyut Before',
    'thadingyut-fullmoon': 'Thadingyut',
    'thadingyut-after': 'Thadingyut After',
    'dhamasakyar-fullmoon': 'Dhamasakyar Full Moon',   
    'tasaungmone-fullmoon': 'Tasaung Mon Full Moon',
    'kason-fullmoon': 'Kason Full Moon', 
    'karen-new-year': 'Karen new year',


    'guo-qing-jie': '国庆节',
    'chu-xi': '除夕',
    'xin-nian': '新年',
    'qing-shui-zu-shi-jie': '清水祖师节',
    'tian-gong-birthday': '天宫宝生',
    'yuan-xiao-jie': '元宵节',
    'dai-zhi': '岱枝兴福',
    'fu-de': '福德正神诞辰',
    'guan-yin-birthday': '观音宝诞',
    'qing-ming': '清明节',
    'ma-zuo': '马祖宝生',
    'duan-wu': '端午节',
    'guan-yin-de-dao': '观音得道',
    'qi-xi': '七夕节',
    'zhong-yuan': '中元节',
    'kong-zi-birthday': '孔子诞辰',
    'zhong-qiu': '中秋节',
    'zhong-yang': '重阳节',
    'guan-yin-chu-jia': '观音出家',
    'dong-zhi': '冬至'
}

const cn: LanguageTranslation = {
    'full-moon': '满月',
    'new-year': '新年',
    'valentine': '情人节',
    'woman-day': '少女节',
    'april-fool': '愚人节',
    'mother-day': '母亲节',
    'father-day': '父亲节',
    'christmas': '圣诞节',
    'independent-day': '缅甸独立日',
    'union-day': '缅甸联邦节',
    'aung-san-birthday': '',
    'peasants-day': '缅甸农民节',
    'martyrs-day': '缅甸建军节',
    'national-day': '缅甸烈士节',
    'may-day': '劳动节',


    'thingyan-akyo': '缅甸泼水节', 
    'thingyan-akya': '缅甸泼水节',
    'thingyan-atat': '缅甸泼水节',
    'thingyan': '缅甸泼水节',
    'thingyan-new-year': '缅甸泼水节',
    'thaboung-fullmoon': '缅甸新年假日',
    'thadingyut-before': '直燐卒假日',
    'thadingyut-fullmoon': '直燐卒假日',
    'thadingyut-after': '直燐卒假日',
    'dhamasakyar-fullmoon': '瓦梭月盈节',   
    'tasaungmone-fullmoon': '直桑岱点灯节',
    'kason-fullmoon': '葛宋盈节', 
    'karen-new-year': '吉仁族新年',


    'guo-qing-jie': '国庆节',
    'chu-xi': '除夕',
    'xin-nian': '新年',
    'qing-shui-zu-shi-jie': '清水祖师节',
    'tian-gong-birthday': '天宫宝生',
    'yuan-xiao-jie': '元宵节',
    'dai-zhi': '岱枝兴福',
    'fu-de': '福德正神诞辰',
    'guan-yin-birthday': '观音宝诞',
    'qing-ming': '清明节',
    'ma-zuo': '马祖宝生',
    'duan-wu': '端午节',
    'guan-yin-de-dao': '观音得道',
    'qi-xi': '七夕节',
    'zhong-yuan': '中元节',
    'kong-zi-birthday': '孔子诞辰',
    'zhong-qiu': '中秋节',
    'zhong-yang': '重阳节',
    'guan-yin-chu-jia': '观音出家',
    'dong-zhi': '冬至'
}

const mm: LanguageTranslation = {
    'full-moon': 'လပြည့်',
    'new-year': 'နှစ်သစ်ကူး',
    'valentine': 'ချစ်သူများနေ့',
    'woman-day': 'အမျိုးသမီးများနေ့',
    'april-fool': 'အရူးများနေ့',
    'mother-day': 'အမေများနေ့',
    'father-day': 'အဖေများနေ့',
    'christmas': '',
    'independent-day': 'လွတ်လပ်ရေးနေ့',
    'union-day': 'ပြည်ထောင်စုနေ့',
    'aung-san-birthday': 'ဗိုလ်ချုပ်အောင်ဆန်းနေ့',
    'peasants-day': 'တောင်သူလယ်သမားနေ့',
    'martyrs-day': 'အာဇာနည်နေ့',
    'national-day': '',
    'may-day': 'အလုပ်သမားနေ့',
    

    'thingyan-akyo': 'သင်္ကြန်အကြို', 
    'thingyan-akya': 'သင်္ကြန်အကျ',
    'thingyan-atat': 'သင်္ကြန်ကတက်',
    'thingyan': 'သင်္ကြန်',
    'thingyan-new-year': 'သင်္ကြန်နှစ်သစ်ကူး',
    'thaboung-fullmoon': 'သပေါင်းလပြည့်နေ့',
    'thadingyut-before': 'သီတင်းကျွတ်နေ့',
    'thadingyut-fullmoon': 'သီတင်းကျွတ်နေ့',
    'thadingyut-after': 'သီတင်းကျွတ်နေ့',
    'dhamasakyar-fullmoon': 'ဓမစကြာလပြည့်နေ့',   
    'tasaungmone-fullmoon': 'တန်းဆောင်မုန်းလပြည့်နေ',
    'kason-fullmoon': 'ကဆုန်လပြည့်နေ', 
    'karen-new-year': 'ကရင်နှစ်သစ်ကူးနေ့',


    'guo-qing-jie': '',
    'chu-xi': 'တရုတ်နှစ်သစ်ကူး',
    'xin-nian': 'တရုတ်နှစ်ဆန်းတစ်ရက်နေ့',
    'qing-shui-zu-shi-jie': 'ကုက္ကိုးတရုတ်ဘုရားပွဲ',
    'tian-gong-birthday': 'ကောင်းကင်ဘုရားမွေးနေ',
    'yuan-xiao-jie': '元宵节 မုန့်လုံးရေပေါ်',
    'dai-zhi': 'တိုက်ကြီးတရုတ်ဘုရားပွဲတော်',
    'fu-de': 'ကျန့်တိတ်ဘုရားဒေသစာရီပူဇော်ပွဲ',
    'guan-yin-birthday': 'တရုတ်ကွမ်ရင်မယ်တော်ပူဇော်ပွဲ',
    'qing-ming': 'တရုတ်သင်္ချိုင်းကန်တော့ပွဲ',
    'ma-zuo': 'တရုတ်မားကျော့မယ်တော်ပူဇော်ပွဲ',
    'duan-wu': 'တရုတ်ရိုးရာနဂါးလှေလှော်ပြိုင်ပွဲ',
    'guan-yin-de-dao': 'တရုတ်ကွမ်ရင်မယ်တော်ပူဇော်ပွဲ',
    'qi-xi': '',
    'zhong-yuan': 'တရုတ်ချစ်သူများနေ့',
    'kong-zi-birthday': 'ကွန်ဖြူရှပ်မွေးနေ',
    'zhong-qiu': 'တရုတ်လမုန့်ကန်ပွဲတော်',
    'zhong-yang': '',
    'guan-yin-chu-jia': '',
    'dong-zhi': 'မုန့်လုံးရေပေါ်'
}




const Lang = {
    en, cn, mm
}


export default Lang;