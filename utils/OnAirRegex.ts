export const isJobTaken = (description:string) => {
    const regex = new RegExp(OnAirRegExp.jobTakenBy);
    return regex.test(description);
};

export const isJobCompleted = (description:string) => {
    const regex = new RegExp(OnAirRegExp.jobFinished);
    return regex.test(description);
};

export const isJobAbandoned = (description:string) => {
    const regex = new RegExp(OnAirRegExp.jobAbandoned);
    return regex.test(description);
};

export const isAircraftCrashed = (description:string) => {
    const regex = new RegExp(OnAirRegExp.aircraftCrashed);
    return regex.test(description);
};

export const isAircraftTransporting = (description:string) => {
    const regex = new RegExp(OnAirRegExp.aircraftTransporting);
    return regex.test(description);
};

export const OnAirRegExp = {
    jobTakenBy: /^Job Logistic Query taken by /g,
    jobAbandoned: /^Job abandoned : Logistic Query \(by ([A-Z]*)\)/g,
    jobCompleted: /^Job finished /g,
    jobFinished: /^Job finished \((Goods transport|Pax transport)\), ([0-9][0-9][0-9][0-9] lbs)(?:, )?(\d* pax)?. Pay: (.* Cr.), XP Bonus: (\d*\d*\d*)/gm,
    aircraftCrashed: /^Aircraft ([0-9|A-Z]*)|.*(crashed)/g,
    aircraftRentingFee: /^Aircraft ([0-9|A-Z]*) .* renting fee \(([0-9|.]* hours)\)/g,
    aircraftRentedOrLeased: /^Aircraft.* \(([0-9A-Z]*)\) (leased|rented) at ([0-9A-Z]*)/g,
    aircraftMaintenance: /^Aircraft.* (maintenance): ([0-9A-Z]*) at .*\(([0-9A-Z]*)\) \(([0-9]*) (minutes|hours)?\)(?:\\r\\n)(.*)?/g,
    aircraftTransporting: /^([A-Z0-9]*) (transported) ([0-9a-zA-Z]*) (to|from) ([A-Z0-9]*)/g,
};
