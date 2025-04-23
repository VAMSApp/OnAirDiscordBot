import { Aircraft } from 'onair-api';

export function DetermineAircraftStatus(statusCode:number, iconOnly:boolean = false) {
    let status = '';

    switch (statusCode) {
    case 0:
        status = (iconOnly) ? '✅' : '✅ Idle';
        break;
    case 1:
        status = (iconOnly) ? '⚙️' : '⚙️ Maintenance';
        break;
    case 2:
        status = (iconOnly) ? '🔃' : '🔃 Apron Work';
        break;
    case 3:
        status = (iconOnly) ? '✈️' : '✈️ In Flight';
        break;
    case 4:
        status = (iconOnly) ? '🌍' : '🌍 Warp';
        break;
    case 5:
        status = (iconOnly) ? '🛬' : '🛬 Ferry';
        break;
    }

    return status;
}