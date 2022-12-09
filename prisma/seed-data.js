const SeedData = {
    worlds: [
        {
            Id: 'c83eb5d5-9dc5-452f-b261-69b45cb0951b',
            Name: 'Thunder',
            ShortName: 'THUNDER',
        },
    ],
    aircraftStatuses: [
        {
            Id: 0,
            Name: 'Idle',
            ShortName: 'IDLE',
        },
        {
            Id: 1,
            Name: 'Maintenance',
            ShortName: 'MAINT',
        },
        {
            Id: 2,
            Name: 'ApronWork',
            ShortName: 'APRON',
        },
        {
            Id: 3,
            Name: 'InFlight',
            ShortName: 'INFLT',
        },
        {
            Id: 4,
            Name: 'Warp',
            ShortName: 'WARP',
        },
        {
            Id: 5,
            Name: 'Ferry',
            ShortName: 'FERRY',
        },
    ],
    fuelTypes: [
        {
            Id: 0,
            Name: '100LL',
            ShortName: '100LL',
        },
        {
            Id: 1,
            Name: 'Jet A',
            ShortName: 'JET',
        },
    ],
    engineTypes: [
        {
            Id: 0,
            Name: 'Piston',
            ShortName: 'PISTON',
        },
        {
            Id: 1,
            Name: 'Jet',
            ShortName: 'JET',
        },
        {
            Id: 2,
            Name: 'Sailplane',
            ShortName: 'SAILPLANE',
        },
        {
            Id: 3,
            Name: 'Helo Turbine',
            ShortName: 'HELO TURBINE',
        },
        {
            Id: 5,
            Name: 'Turboprop',
            ShortName: 'TURBOPROP',
        },
    ]
}

module.exports = SeedData
