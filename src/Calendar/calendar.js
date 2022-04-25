const DAYS_IN_WEEK = 7;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Энумерация месяцев в году
const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};



//Сравнение дат
export function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

// Проверска на високосный год
export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}
// Получение количества дней в месяце
export function getDaysInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];

    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) return 6;
    return dayOfWeek - 1;
}

export function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    // Количество дней в месяце
    const daysInMonth = getDaysInMonth(date);
    // День начала месяца
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    // Создание структуры дат в месяце
    // Узнаём сколько недель в месяце
    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            // Остальные дни становятся undefined
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }

    }
    return result;
}