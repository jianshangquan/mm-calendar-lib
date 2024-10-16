function getNewNoons(date: Date) {
    const LUNAR_MONTH = 29.5305888531  // https://en.wikipedia.org/wiki/Lunar_month
    let y = date.getFullYear()
    let m = date.getMonth() + 1  // https://stackoverflow.com/questions/15799514/why-does-javascript-getmonth-count-from-0-and-getdate-count-from-1
    let d = date.getDate()
    // https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
    if (m <= 2) {
        y -= 1
        m += 12
    }
    let a = Math.floor(y / 100)
    let b = Math.floor(a / 4)
    let c = 2 - a + b
    let e = Math.floor(365.25 * (y + 4716))
    let f = Math.floor(30.6001 * (m + 1))
    let julianDay = c + d + e + f - 1524.5
    let days_since_last_new_moon = julianDay - 2451549.5
    let new_moons = days_since_last_new_moon / LUNAR_MONTH
    let days_into_cycle = (new_moons % 1) * LUNAR_MONTH
    return new_moons;
}

function inChineseNewYear(date: Date) {
    /* The date is decided by the Chinese Lunar Calendar, which is based on the
    cycles of the moon and sun and is generally 21–51 days behind the Gregorian
    (internationally-used) calendar. The date of Chinese New Year changes every
    year, but it always falls between January 21st and February 20th. */
    return Math.floor(getNewNoons(date)) > Math.floor(getNewNoons(new Date(date.getFullYear(), 0, 20))) ? 1 : 0
}

export function getChineseNewYear(gregorianYear: number) : Date {
    // Does not quite line up with https://www.travelchinaguide.com/essential/holidays/new-year/dates.htm
    let start = new Date(gregorianYear, 0, 1);
    for (let i = 0; i <= 30; ++i) {
        start = new Date(gregorianYear, 0, 1)
        start.setDate(21 + i)
        if (inChineseNewYear(start)) return start
    }

    return start;
}