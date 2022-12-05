import { Cargo, Charter } from "onair-api"

export function DetermineJobStatus (j:Cargo|Charter) {
    let status = ''

    if (j.AssignedToVAMember) {
        status = '🧑‍✈️ Assigned'
    } else if (j.CurrentAircraft) {
        status = '✈️ In Progress'
    } else {
        status = '📝 Pending'
    }

    return status
}
