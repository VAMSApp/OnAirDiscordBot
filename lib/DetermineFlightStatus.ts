import { Flight } from 'onair-api';

export function DetermineFlightStatus(f:Flight) {
    const {
        StartTime,
        EndTime,
    } = f; 
    let status = '';

    if (StartTime) {
        if (StartTime && !EndTime) {
            status = '✈️ In Progress';
        } else if (StartTime && EndTime) {
            status = '✅ Completed';
        } else {
            status = '👍 Started';
        } 
    } else if (!StartTime) {
        status = '⚠️ Not Started';
    }

    return status;
}
