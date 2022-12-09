import moment from 'moment'

export function HumanizeDate(input:string|Date):string {
    if (!input) throw new Error('HumanizeDate: input is required');
    let date:Date|undefined = undefined;

    if (typeof input === 'string') {
        date = new Date(input)
    } else {
        date = input
    }
    
    const humanizedDate = moment(input).fromNow();

    return humanizedDate;
}

export function FormatDate(input:string|Date, format:string = 'MMMM Do YYYY, h:mm:ss a'):string {
    if (!input) throw new Error('FormatDate: input is required');
    let date:Date|undefined = undefined;

    if (typeof input === 'string') {
        date = new Date(input)
    } else {
        date = input
    }
    
    const formattedDate = moment(input).format(format);

    return formattedDate;
}
