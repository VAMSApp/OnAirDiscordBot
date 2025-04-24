import { Flight } from 'onair-api';

export function DetermineFlightStatus(f:Flight) {
    const {
        StartTime,
        EndTime,
        Registered,
        CancelReason,
        Aircraft: {
            AircraftStatus
        },
    } = f; 
    let status = '';

    // If the flight is not registered
    if (Registered === false && StartTime) {
        // then the flight is started
        if (AircraftStatus === 4) {
            status = '🌍 Warp';
        } else {
            status = '✈️ Flight';
        }
    // otherwise, if the flight is cancelled
    } else if (Registered && CancelReason) {
        // then the flight is cancelled
        status = '❌ Cancelled';
    // otherwise, if the flight is registered and CancelReason is not set
    } else if (Registered && !CancelReason) {
        // then the flight is completed
        status = '✅ Completed';
    }

    /**
    // If a StartTime value exists
    if (StartTime) {
        // if StartTime value exists and (EndTime value does not exist or the Aircraft is in warp)
        if (StartTime && (!EndTime || AircraftStatus === 4)) {
            // then the flight is in progress
            status = '✈️ In Flight';
        // otherwise, if the StartTime value exists and the EndTime value exists
    } else if (StartTime && EndTime) {
            // then the flight is completed
            status = '✅ Completed';
        // otherwise
        } else {
            // then the flight is started
            status = '👍 Started';
        } 
    // otherwise, if the StartTime value does not exist
    } else if (!StartTime) {
        // then the flight is not started
        status = '⚠️ Not Started';
    }
    **/

    return status;
}