import moment from 'moment';

export function HumanizeDate(input:string|Date):string {
    if (!input) throw new Error('HumanizeDate: input is required');
    
    const humanizedDate = moment(input).fromNow();

    return humanizedDate;
}

export function FormatDate(input:string|Date, format:string = 'MMMM Do YYYY, h:mm:ss a'):string {
    if (!input) throw new Error('FormatDate: input is required');
    
    const formattedDate = moment(input).format(format);

    return formattedDate;
}

/**
 * Formats a time interval in milliseconds into a human-readable string
 * @param milliseconds number of milliseconds
 * @returns string in format "X days/hours/minutes"
 */
export function FormatTimeInterval(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
}