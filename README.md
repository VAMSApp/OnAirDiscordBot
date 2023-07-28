# OnAir Discord Bot

A Discord.js bot that integrates Your OnAir Company or Virtual Airline's details within your Discord server. The Bot currently only has the ability to show flights, members, jobs, fleet, and airport information from within discord, each command is a one-off request to the OnAir API and is translated into a discord response. See [Planned Features](#planned-features) for more information on what is planned for the future.

## How to use
There are now two ways you can start using the bot 
1. Local or server installation where you will need to install node.js version `^18.16` then clone and configure the bot to run on your local system, read more about that [here]()
2. if you prefer going the docker route, I also now maintain a docker image [mikedevita/onairdiscordbot](https://hub.docker.com/repository/docker/mikedevita/onairdiscordbot), read more about that [here]()

### Manual/Dedicated Machine Method
- clone the repository `git clone git@github.com:mikedevita/onairdiscordbot.git`
- install the required nodejs modules `npm i`
- copy `config.ts.example` to `config.ts`
- fill out `config.ts` with required information
  - Ensure to update `discord_token`, `discord_clientId`, `discord_clientSecret`, `discord_guildId` with values from Discord developer website, see [this]([wiki/Creating-Your-Discord-bot](wiki/How-to-register-a-new-discord-bot)) wiki for more
  - ensure the bot is granted the `bot` and `applications.commands` scopes in the Discord developer website
  - Update `companyId`, `vAId`, `apiKey` in the `onAir` object with values from the OnAir companion app, see [this]([wiki/Obtaining-Your-OnAir-Credentials](wiki/How-to-obtain-CompanyID,-VirtualAirlineID,-ApiKey-from-OnAir)) wiki for more
- finally, run the bot by executing `npm start`

By default the Bot should send a message in Your discord Server when it comes online. Simply interact with the bot using one of the commands in the [Commands](#bot-commands) section below.

### Docker Method
- [docker run example](wiki/Docker-run-example)
- [docker-compose example](wiki/Docker‐compose-example)

## Planned Features
- [ ] Add cash flow related commands to indicate income vs expense and profit margins, see [#2](issues/2) for more information
- [ ] Add persistence layer to track data over time and allow for more advanced features, see [#8](issues/8) for more information
  - [ ] Ability for users to link their Discord account to their OnAir company, see [#9](issues/9) for more information
  - [ ] polling & alerting functionality for flight & job status changes, see [#4](issues/4) for more information

## Free Help & Support

feel free to reach out to me on discord with any questions about the bot, my discord username is `ndboost`. I also idle in the #web-apis channel on the [OnAir company's official discord server](https://discord.com/invite/WY5htXu).

## Bot Hosting and Paid Support

If you are interested in having this bot hosted for you or would like to pay for additional features or support, please feel free to reach out to me on discord, my username is `ndboost` to discuss your requirements.


## Bot Commands
All command responses are ephemeral by default, meaning only the user who executed the command can see the response. This can be changed by passing the `ephemeral` param to any command, see [Virtual Airline Details](#virtual-airline-details-detail-ephemeral) for an example.

| Command | Description |
| ------- | ----------- |
| [/airport](#airport-airport-icao) | shows details about a given airport |
| [/detail](#virtual-airline-details-detail-ephemeral) | shows OnAir details about the registered Virtual Airline |
| [/members](#members-members) | shows a list of all members in the registered Virtual Airline |
| [/fleet](#fleet-fleet) | shows a list of all aircraft in the registered Virtual Airline |
| [/aircraft](#aircraft-detail-aircraft-identifier) | shows details about a given aircraft |
| [/jobs](#jobs-jobs) | shows a list of all jobs in the registered Virtual Airline |
| [/flights](#flights-flights) | shows a list of all flights in the registered Virtual Airline |

### Virtual Airline Details (/detail :ephemeral?)

Provides basic details about the registered VA such as Name, ICAO, Level, Reputation. In the future will provide more details such as cash flow, etc

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| ephemeral | Send the message as an ephemeral message | true |

#### Response

```
[IMPAL] Imperium Airlines Details
  Level: 7
  XP: 5293 / 7000
  Reputation: 98.37%
  World: Thunder
  Created On: September 8th, 2020
  Last Connected: July 11th, 2023
```


### Airport (/airport :icao)

Provides details of a given airport code. In the future will provide the list of planned Arrival and Departure jobs

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| page | Page # to show          | 1       |
| size | Results per page, max 5 | 5       |

#### Response

```
[KFFZ] Falcon Fld
Mesa, Arizona, USA
Transition Altitude: 18000
Size: 2
Latitude: 33.460842
Longitude: -111.728325
Elevation: 1377.99

Runways
Name  Type                      Length   Hdg  Lat        Lng
----  ------------------------  -------  ---  ---------  -----------
04R   Asphalt - good condition  5091 ft  39   33.456081  -111.733841
22L   Asphalt - good condition  5091 ft  219  33.464512  -111.721336
22R   Asphalt - good condition  3787 ft  219  33.464672  -111.724762
04L   Asphalt - good condition  3787 ft  39   33.458485  -111.733932

Arrivals
Not working yet

Departures
Not working yet
```

### Members (/members)

lists all of the current VA members

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| page | Page # to show          | 1       |
| size | Results per page, max 5 | 5       |

#### Response

```
[Code] Company Name           Role        $ Earned      PAX Transported  Cargo Transported  # Flights (Flight Hrs)
----------------------------  ----------  ------------  ---------------  -----------------  ----------------------
⏸️ [BGAV] Braam Aviation       Manager     359,561       9                185573             8 (11.45)
[PNAS] Paden Airways          Dispatcher  0             0                0                  3 (3.91)
[TANG] Tangent Airways        Dispatcher  3,617         0                5316               2 (1.34)
[VMSW] Valley Mountain Skyw   Dispatcher  0             0                0                  4 (3.65)
[JPPA] JaPPa Air              Founder     4,417,315.14  151              2606936            90 (154.93)
[LOON] Loon Airways           Dispatcher  80,314        0                50592              1 (2.48)
[HMOD] Hansens Mekk og Drekk  Manager     683,078.97    1775             128074             42 (51.07)
```

### Fleet (/fleet)

lists all of the fleet for the given VA

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| page | Page # to show          | 1       |
| size | Results per page, max 5 | 5       |

#### Response

```
There are 6 aircraft currently in the fleet
#  Type  Identifier  Name                                   Status  Current Airport                  Max Payload  Pax E/B/F
-  ----  ----------  -------------------------------------  ------  -------------------------------  -----------  ---------
1  HELO  N7270Y      Airbus H135 Phi Air Medical N380PH     ✅ Idle  EHAM - Amsterdam, Noord-Holland  3150 lbs     7/0/0
2  HELO  N6009K      Airbus H135 Phi Air Medical N380PH     ✅ Idle  LOWS - Salzburg, Salzburg        3150 lbs     7/0/0
3  JET   N9837A      Airbus A320 Neo Asobo                  ✅ Idle  KHST - Homestead, Florida        56385 lbs    0/0/0
4  METL  N4156N      Beechcraft King Air 350i Asobo         ✅ Idle  KINS - Indian Springs, Nevada    6090 lbs     0/0/0
5  JET   N1883M      Cessna Longitude Aviators Club Livery  ✅ Idle  LEMD - Madrid, Madrid            6129 lbs     0/0/0
6  JET   N6526N      Airbus A320 Neo Asobo                  ✅ Idle  EGLL - London, England           56385 lbs    0/0/0
```


### Aircraft Detail (/aircraft :identifier)

Provides details for the given Aircraft by an identifier code

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| identifier | Aircraft Identifier Code ICAO          |        |

#### Response

```
Type  Identifier  Name                            Status  Current Airport                Max Payload  Pax E/B/F
----  ----------  ------------------------------  ------  -----------------------------  -----------  ---------
METL  N1883U      Beechcraft King Air 350i Asobo  ✅ Idle  YBCG - Gold Coast, Queensland  5145 lbs     15/0/0  
```


### Jobs (/jobs)

lists all of the pending or in-progress jobs for the given VA

#### Params

| Name | Desc                    | Default |
| ---- | ----------------------- | ------- |
| page | Page # to show          | 1       |
| size | Results per page, max 5 | 5       |

#### Response

```
There are 2 pending jobs
Type                Pay       Cargos              Status  Aircraft  Depart  Destin  Current  Distance
------------------  --------  ------------------  ------  --------  ------  ------  -------  --------
Dangerous Material  $762,080  1 leg
                              Valuable Equipment  ✅ Idle  N9837A    KHST    KFTW             991 NM
Goods transport     $1,110    1 leg
                              Dry Ice             ✅ Idle  N4156N    KINS    NV65             17 NM
```

### Flights (/flights)

lists all of the flights for the given VA

#### Params

| Name          | Desc                               | Default   |
| ------------- | ---------------------------------- | --------- |
| page          | Page # to show                     | 1         |
| size          | Results per page, max 5            | 5         |
| aircraftcode  | Filter by a specific aircraft code | null      |
| companycode   | Filter by a specific company code  | null      |
| sortby        | How to sort the results            | StartTime |
| sortorder     | Order to sort the results          | desc      |
| showcompleted | Show completed flights             | false     |

#### Response

```
There are currently 50  flights in the VA flight Log
Sorting by StartTime in desc order

Showing page 1 of 10
#  Aircraft  Company  Status         Start Time               End Time                 Depart  Intended Arrival  Actual Arrival
-  --------  -------  -------------  -----------------------  -----------------------  ------  ----------------  --------------
1  N4156N    TANG     ✈️ In Progress  2022-10-22T01:08:01.15                            KPHX    AZ04
2  N9481P    HMOD     ✅ Completed    2022-10-19T19:02:12.837  2022-10-21T19:02:28.583  ENKR    ENAT
3  N9481P    HMOD     ✅ Completed    2022-10-19T17:53:28.467  2022-10-19T18:53:42.89   ENTC    ENKR              ENKR
4  N4816Y    PNAS     ✅ Completed    2022-10-19T00:56:40.583  2022-10-19T01:18:13.06   VDPP    VDKC
5  N4816Y    PNAS     ✅ Completed    2022-10-19T00:52:14.89   2022-10-19T00:55:41.97   VDPP    VDKC
```

