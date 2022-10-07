import moment from 'moment';

const DateTimeUtils = {
    differenceInDays: (a: Date, b: Date): number => {
        return moment(a).diff(moment(b), 'days');
    },
    addMonths: (a: Date, months: number) => {
        return moment(a).clone().add(months, 'months').toDate();
    },
    subtractMonths: (a: Date, months: number) => {
        return moment(a).clone().subtract(months, 'months').toDate();
    },
    utc(a: Date) {
        return moment(a).utc().toDate();
    },
    subtractYears: (a: Date, years: number) => {
        return moment(a).clone().subtract(years, 'years').toDate();
    },
    addDays: (a: Date, days: number) => {
        return moment(a).clone().add(days, 'days').toDate();
    },
    subtractDays: (a: Date, days: number) => {
        return moment(a).clone().subtract(days, 'days').toDate();
    },
    format: (date: Date, format: string) => {
        return moment(date).utc().format(format);
    },
    isPast: (date: Date) => {
        return moment(date).isBefore(new Date());
    },
    age: (date: Date) => {
        return moment().diff(moment(date), 'years');
    }
};

export default DateTimeUtils;
