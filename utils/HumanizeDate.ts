import moment from 'moment'

export function HumanizeDate(dateStr:string):string {
    const date = new Date(dateStr)
    const humanizedDate = moment(date).fromNow();

    return humanizedDate;
}
