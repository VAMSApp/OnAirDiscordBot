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
