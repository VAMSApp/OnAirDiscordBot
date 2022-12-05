/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `approvalToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `approvedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `approvedById` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `discriminator` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isEnabled` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Aircraft` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aircraftStatus` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `aircraftTypeGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `aircraftTypeId` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `airframeCondition` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `airframeHours` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `airframeMaxCondition` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `allowLease` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `allowRent` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `allowSell` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `altitude` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `configBusSeats` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `configEcoSeats` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `configFirstSeats` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportId` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentCompanyGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentCompanyGuidIfAny` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentSeats` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `currentStatusDurationInMinutes` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `extraWeightCapacity` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `flightState` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `fuelTotalGallons` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `fuelWeight` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `hoursBefore100HInspection` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `isControlledByAI` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `last100hInspection` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `lastAnnualCheckup` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `lastMagicTransportationDate` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `lastParkingFeePayment` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `lastStatusChange` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `lastWeeklyOwnershipPayment` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `loadedWeight` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `mustDoMaintenance` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `onairSyncedAt` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `ownerCompanyGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `ownerCompanyId` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentCautionAmount` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentFuelTotalGallons` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentHourPrice` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentLastDailyChargeDate` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentStartDate` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentaAirportId` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentalAirportGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentalCompanyGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `rentalCompanyId` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `seatsReservedForEmployees` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `totalWeightCapacity` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `worldGuid` on the `Aircraft` table. All the data in the column will be lost.
  - You are about to drop the column `zeroFuelWeight` on the `Aircraft` table. All the data in the column will be lost.
  - The primary key for the `AircraftClass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `AircraftClass` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AircraftClass` table. All the data in the column will be lost.
  - The primary key for the `AircraftEngine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aircraftGuid` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `aircraftId` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `engineHours` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `lastCheckup` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `maxCondition` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `AircraftEngine` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AircraftEngine` table. All the data in the column will be lost.
  - The primary key for the `AircraftType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aircraftClassGuid` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `aircraftClassId` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `airportMinSize` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `baseprice` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVC` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVS0` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `designSpeedVS1` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `emptyWeight` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `engineType` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedCruiseFF` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `flightsCount` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `fuelTotalCapacityInGallons` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `gliderHasEngine` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `hightimeAirframe` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `isFighter` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `lastModerationDate` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `luxeFactor` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumCargoWeight` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumGrossWeight` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumRangeInHour` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `maximumRangeInNM` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `needsCopilot` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfEngines` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `standardSeatWeight` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `timeBetweenOverhaul` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `typeName` on the `AircraftType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AircraftType` table. All the data in the column will be lost.
  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `airportSource` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `countryName` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `elevation` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `hasHelipad` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `hasLandRunway` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `hasLights` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `hasNoRunways` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `hasWaterRunway` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `iata` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `icao` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isAddon` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isClosed` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isMilitary` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isNotInVanillaFS2020` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isNotInVanillaFSX` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isNotInVanillaP3D` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isNotInVanillaXPLANE` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `isValid` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastLongHaulRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastMETARDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastMediumHaulRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastMediumTripRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastRandomSeedGeneration` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastShortHaulRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastSmallTripRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `lastVeryShortRequestDate` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `localTimeCloseInHoursSinceMidnight` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `localTimeOpenInHoursSinceMidnight` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `magVar` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `randomSeed` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `timeOffsetInSec` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `transitionAltitude` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `uTCTimeCloseInHoursSinceMidnight` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `uTCTimeOpenInHoursSinceMidnight` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Airport` table. All the data in the column will be lost.
  - The primary key for the `AppConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appTitle` on the `AppConfig` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AppConfig` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AppConfig` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AppConfig` table. All the data in the column will be lost.
  - The primary key for the `Cargo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedToVAMemberGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToVAMemberId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `cargoTypeGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `cargoTypeId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `companyGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirportGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirportId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAirportGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAirportId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `humanOnly` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `inRecyclingPool` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `jobGuid` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `passengersNumber` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `rescueLate` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `rescueValidated` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cargo` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Cargo` table. All the data in the column will be lost.
  - The primary key for the `CargoType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cargoTypeCategory` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `maxLbs` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `minLbs` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CargoType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CargoType` table. All the data in the column will be lost.
  - The primary key for the `Charter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedToVAMemberGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToVAMemberId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `boardedPAXSeat` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `charterTypeGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `charterTypeId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `companyGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `currentAirportId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirportGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirportId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAirportGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `destinationAirportId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `humanOnly` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `inRecyclingPool` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `jobGuid` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `minAircraftTypeLuxe` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `minPAXSeatConf` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `passengersNumber` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `rescueLate` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `rescueValidated` on the `Charter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Charter` table. All the data in the column will be lost.
  - The primary key for the `CharterType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `charterTypeCategory` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `maxPAX` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `minPAX` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CharterType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CharterType` table. All the data in the column will be lost.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aircraftRentLevel` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `airlineCode` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `apiKey` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `checkrideLevel` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `currentBadgeId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `currentBadgeName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `currentBadgeUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyLevel` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `disableSeatsConfigCheck` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `enableCargosAndChartersLoadingTime` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `enableEmployeesFlightDutyAndSleep` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `enableLandingPenalities` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `enableSimFailures` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `enableSkillTree` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `forceTimeInSimulator` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `inSurvival` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `lastConnection` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `lastReportDate` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `lastWeeklyManagementsPaymentDate` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `levelXP` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `onAirSyncedAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `paused` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `pausedDate` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `payBonusFactor` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `realisticSimProcedures` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `reputation` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `transportEmployeeInstant` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `transportPlayerInstant` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `travelTokens` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `uTCOffsetinHours` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `useOnlyVanillaAirports` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `useSmallAirports` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `virtualAirlineId` on the `Company` table. All the data in the column will be lost.
  - The primary key for the `Email` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `body` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Email` table. All the data in the column will be lost.
  - The primary key for the `Flight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Flight` table. All the data in the column will be lost.
  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `baseAirportGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `baseAirportId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `canAccess` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `companyGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorited` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `isGoodValue` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `isLastMinute` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobTypeGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobTypeId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `mainAirportGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `mainAirportHeading` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `mainAirportId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `maxDistance` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `minCompanyReput` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `pay` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `payLastMinuteBonus` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `penality` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `queriedFromFboGuid` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `queriedFromFboId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `realPay` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `realPenality` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `reputationImpact` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `skillPoint` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `takenDate` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `totalCargoTransported` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `totalDistance` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `totalPaxTransported` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `valuePerLbsPerDistance` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `xP` on the `Job` table. All the data in the column will be lost.
  - The primary key for the `JobType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `basePayFactor` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `basePenalityFactor` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `baseReputationImpact` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `JobType` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `JobType` table. All the data in the column will be lost.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminOnly` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isAuthRequired` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `isRemovable` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Menu` table. All the data in the column will be lost.
  - The primary key for the `MenuItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminOnly` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `href` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isAuthRequired` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isDisabled` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isExternal` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MenuItem` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `actionId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `aircraftGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `companyGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `flightGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isNotification` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `personGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `vaGuid` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `vaId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `zuluEventTime` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `companyGuid` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `flightHoursGrandTotal` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `flightHoursInCompany` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `flightHoursTotalBeforeHiring` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `lastStatusChange` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `onAirSyncedAt` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `pseudo` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Person` table. All the data in the column will be lost.
  - The primary key for the `VAInvitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `acceptedAt` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `emailId` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `isPending` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VAInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `vaId` on the `VAInvitation` table. All the data in the column will be lost.
  - The primary key for the `VirtualAirline` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aircraftRentLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `airlineCode` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `apiKey` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `automaticallyAssignJobWhenLoaded` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `automaticallyAssignJobWhenTaken` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `checkrideLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `difficultyLevel` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `disableSeatsConfigCheck` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `enableCargosAndChartersLoadingTime` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `enableEmployeesFlightDutyAndSleep` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `enableLandingPenalities` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `enableSimFailures` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `enableSkillTree` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `forceAssignJobsToPilots` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `forceTimeInSimulator` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `inSurvival` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `initalOwnerEquity` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `lastConnection` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `lastDividendsDistribution` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `lastReportDate` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `levelXP` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `memberCount` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `onAirSyncedAt` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `paused` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `payBonusFactor` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `percentDividendsToDistribute` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `realisticSimProcedures` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `reputation` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `restrictEmployeesUsage` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `restrictLoadingNonVAJobsIntoVAAircraft` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `restrictLoadingVAJobsIntoNonVAAircraft` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `transportEmployeeInstant` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `transportPlayerInstant` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `travelTokens` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `uTCOffsetinHours` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `useOnlyVanillaAirports` on the `VirtualAirline` table. All the data in the column will be lost.
  - You are about to drop the column `useSmallAirports` on the `VirtualAirline` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[DiscordId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PersonId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Identifier]` on the table `Aircraft` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ShortName]` on the table `AircraftClass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Icao]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Guid]` on the table `CargoType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AirlineCode]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ApiKey]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[OwnerId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Guid]` on the table `JobType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Slug]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Slug]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AirlineCode]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ApiKey]` on the table `VirtualAirline` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `DiscordId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Discriminator` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Locale` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Verified` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AircraftStatus` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AircraftTypeId` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AllowLease` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AllowRent` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AllowSell` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CurrentStatusDurationInMinutes` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Aircraft` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Identifier` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastStatusChange` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nickname` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WorldId` to the `Aircraft` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `AircraftClass` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Name` to the `AircraftClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Order` to the `AircraftClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortName` to the `AircraftClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AircraftId` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Condition` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EngineHours` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `AircraftEngine` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `LastCheckup` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaxCondition` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Number` to the `AircraftEngine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AircraftClassId` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AirportMinSize` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Baseprice` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreationDate` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DesignSpeedVC` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DesignSpeedVS0` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DesignSpeedVS1` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DisplayName` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EmptyWeight` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EngineType` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EstimatedCruiseFF` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FlightsCount` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FuelTotalCapacityInGallons` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FuelType` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GliderHasEngine` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HightimeAirframe` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `AircraftType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `IsDisabled` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastModerationDate` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LuxeFactor` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumCargoWeight` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumGrossWeight` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumRangeInHour` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaximumRangeInNM` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NeedsCopilot` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NumberOfEngines` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Seats` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StandardSeatWeight` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TimeBetweenOverhaul` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TypeName` to the `AircraftType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AirportSource` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DisplayName` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Icao` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Airport` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Name` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AppTitle` to the `AppConfig` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `AppConfig` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `CargoTypeId` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyGuid` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CurrentAirportId` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HumanOnly` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Cargo` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `InRecyclingPool` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobId` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PassengersNumber` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueLate` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueValidated` to the `Cargo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CargoTypeCategory` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guid` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `CargoType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `MaxLbs` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinLbs` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `CargoType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BoardedPAXSeat` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CharterTypeId` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyGuid` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HumanOnly` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Charter` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `InRecyclingPool` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobId` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinAircraftTypeLuxe` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinPAXSeatConf` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PassengersNumber` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueLate` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RescueValidated` to the `Charter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CharterTypeCategory` to the `CharterType` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `CharterType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `MaxPAX` to the `CharterType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinPAX` to the `CharterType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `CharterType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AircraftRentLevel` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AirlineCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CheckrideLevel` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreationDate` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DifficultyLevel` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DisableSeatsConfigCheck` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EnableCargosAndChartersLoadingTime` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EnableEmployeesFlightDutyAndSleep` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EnableLandingPenalities` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EnableSimFailures` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EnableSkillTree` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ForceTimeInSimulator` to the `Company` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Company` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `InSurvival` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastConnection` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastReportDate` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Level` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LevelXP` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Paused` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PayBonusFactor` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RealisticSimProcedures` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Reputation` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransportEmployeeInstant` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TransportPlayerInstant` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TravelTokens` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UTCOffsetinHours` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UseOnlyVanillaAirports` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UseSmallAirports` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `From` to the `Email` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Email` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `To` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Email` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Flight` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `CanAccess` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Category` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyGuid` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreationDate` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ExpirationDate` to the `Job` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Job` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `IsFavorited` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsGoodValue` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IsLastMinute` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobTypeId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MainAirportHeading` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MaxDistance` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MinCompanyReput` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pay` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Penality` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RealPay` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RealPenality` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReputationImpact` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SkillPoint` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TakenDate` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalCargoTransported` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalDistance` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalPaxTransported` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ValuePerLbsPerDistance` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `XP` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BasePayFactor` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BasePenalityFactor` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BaseReputationImpact` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Guid` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `JobType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Name` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortName` to the `JobType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Slug` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Href` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ParentId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Slug` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ActionId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CategoryId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Notification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `VaId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ZuluEventTime` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Category` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Person` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `LastStatusChange` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pseudo` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AccountId` to the `VAInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyId` to the `VAInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EmailId` to the `VAInvitation` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `VAInvitation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Token` to the `VAInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VaId` to the `VAInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AirlineCode` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ApiKey` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreationDate` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `VirtualAirline` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Name` to the `VirtualAirline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_approvedById_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_personId_fkey";

-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_aircraftTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_currentAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_ownerCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_rentaAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_rentalCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "AircraftEngine" DROP CONSTRAINT "AircraftEngine_aircraftId_fkey";

-- DropForeignKey
ALTER TABLE "AircraftType" DROP CONSTRAINT "AircraftType_aircraftClassId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_assignedToVAMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_cargoTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_currentAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_departureAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_destinationAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_assignedToVAMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_charterTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_currentAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_departureAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_destinationAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_virtualAirlineId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_baseAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_jobTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_mainAirportId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_personId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_vaId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_accountId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_emailId_fkey";

-- DropForeignKey
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_vaId_fkey";

-- DropForeignKey
ALTER TABLE "VirtualAirline" DROP CONSTRAINT "VirtualAirline_ownerId_fkey";

-- DropIndex
DROP INDEX "Account_discordId_key";

-- DropIndex
DROP INDEX "Account_personId_key";

-- DropIndex
DROP INDEX "Aircraft_guid_key";

-- DropIndex
DROP INDEX "Aircraft_identifier_key";

-- DropIndex
DROP INDEX "AircraftClass_guid_key";

-- DropIndex
DROP INDEX "AircraftClass_shortName_key";

-- DropIndex
DROP INDEX "AircraftEngine_guid_key";

-- DropIndex
DROP INDEX "AircraftType_guid_key";

-- DropIndex
DROP INDEX "Airport_guid_key";

-- DropIndex
DROP INDEX "Airport_icao_key";

-- DropIndex
DROP INDEX "Cargo_guid_key";

-- DropIndex
DROP INDEX "CargoType_guid_key";

-- DropIndex
DROP INDEX "Charter_guid_key";

-- DropIndex
DROP INDEX "CharterType_guid_key";

-- DropIndex
DROP INDEX "Company_airlineCode_key";

-- DropIndex
DROP INDEX "Company_apiKey_key";

-- DropIndex
DROP INDEX "Company_guid_key";

-- DropIndex
DROP INDEX "Company_ownerId_key";

-- DropIndex
DROP INDEX "Flight_guid_key";

-- DropIndex
DROP INDEX "Job_guid_key";

-- DropIndex
DROP INDEX "JobType_guid_key";

-- DropIndex
DROP INDEX "Menu_slug_key";

-- DropIndex
DROP INDEX "MenuItem_slug_key";

-- DropIndex
DROP INDEX "Notification_guid_key";

-- DropIndex
DROP INDEX "Person_guid_key";

-- DropIndex
DROP INDEX "VirtualAirline_airlineCode_key";

-- DropIndex
DROP INDEX "VirtualAirline_apiKey_key";

-- DropIndex
DROP INDEX "VirtualAirline_guid_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "approvalToken",
DROP COLUMN "approvedAt",
DROP COLUMN "approvedById",
DROP COLUMN "createdAt",
DROP COLUMN "discordId",
DROP COLUMN "discriminator",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "isAdmin",
DROP COLUMN "isEnabled",
DROP COLUMN "lastLogin",
DROP COLUMN "locale",
DROP COLUMN "personId",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
DROP COLUMN "verified",
ADD COLUMN     "ApprovalToken" TEXT,
ADD COLUMN     "ApprovedAt" TIMESTAMP(3),
ADD COLUMN     "ApprovedById" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "DiscordId" TEXT NOT NULL,
ADD COLUMN     "Discriminator" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "LastLogin" TIMESTAMP(3),
ADD COLUMN     "Locale" TEXT NOT NULL,
ADD COLUMN     "PersonId" TEXT,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "Username" TEXT NOT NULL,
ADD COLUMN     "Verified" BOOLEAN NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Aircraft" DROP CONSTRAINT "Aircraft_pkey",
DROP COLUMN "aircraftStatus",
DROP COLUMN "aircraftTypeGuid",
DROP COLUMN "aircraftTypeId",
DROP COLUMN "airframeCondition",
DROP COLUMN "airframeHours",
DROP COLUMN "airframeMaxCondition",
DROP COLUMN "allowLease",
DROP COLUMN "allowRent",
DROP COLUMN "allowSell",
DROP COLUMN "altitude",
DROP COLUMN "configBusSeats",
DROP COLUMN "configEcoSeats",
DROP COLUMN "configFirstSeats",
DROP COLUMN "createdAt",
DROP COLUMN "currentAirportGuid",
DROP COLUMN "currentAirportId",
DROP COLUMN "currentCompanyGuid",
DROP COLUMN "currentCompanyGuidIfAny",
DROP COLUMN "currentSeats",
DROP COLUMN "currentStatusDurationInMinutes",
DROP COLUMN "extraWeightCapacity",
DROP COLUMN "flightState",
DROP COLUMN "fuelTotalGallons",
DROP COLUMN "fuelWeight",
DROP COLUMN "guid",
DROP COLUMN "heading",
DROP COLUMN "hoursBefore100HInspection",
DROP COLUMN "id",
DROP COLUMN "identifier",
DROP COLUMN "isControlledByAI",
DROP COLUMN "last100hInspection",
DROP COLUMN "lastAnnualCheckup",
DROP COLUMN "lastMagicTransportationDate",
DROP COLUMN "lastParkingFeePayment",
DROP COLUMN "lastStatusChange",
DROP COLUMN "lastWeeklyOwnershipPayment",
DROP COLUMN "latitude",
DROP COLUMN "loadedWeight",
DROP COLUMN "longitude",
DROP COLUMN "mustDoMaintenance",
DROP COLUMN "nickname",
DROP COLUMN "onairSyncedAt",
DROP COLUMN "ownerCompanyGuid",
DROP COLUMN "ownerCompanyId",
DROP COLUMN "rentCautionAmount",
DROP COLUMN "rentFuelTotalGallons",
DROP COLUMN "rentHourPrice",
DROP COLUMN "rentLastDailyChargeDate",
DROP COLUMN "rentStartDate",
DROP COLUMN "rentaAirportId",
DROP COLUMN "rentalAirportGuid",
DROP COLUMN "rentalCompanyGuid",
DROP COLUMN "rentalCompanyId",
DROP COLUMN "seatsReservedForEmployees",
DROP COLUMN "sellPrice",
DROP COLUMN "totalWeightCapacity",
DROP COLUMN "updatedAt",
DROP COLUMN "worldGuid",
DROP COLUMN "zeroFuelWeight",
ADD COLUMN     "AircraftStatus" INTEGER NOT NULL,
ADD COLUMN     "AircraftTypeId" TEXT NOT NULL,
ADD COLUMN     "AirframeCondition" DOUBLE PRECISION,
ADD COLUMN     "AirframeHours" DOUBLE PRECISION,
ADD COLUMN     "AirframeMaxCondition" DOUBLE PRECISION,
ADD COLUMN     "AllowLease" BOOLEAN NOT NULL,
ADD COLUMN     "AllowRent" BOOLEAN NOT NULL,
ADD COLUMN     "AllowSell" BOOLEAN NOT NULL,
ADD COLUMN     "Altitude" DOUBLE PRECISION,
ADD COLUMN     "ConfigBusSeats" INTEGER,
ADD COLUMN     "ConfigEcoSeats" INTEGER,
ADD COLUMN     "ConfigFirstSeats" INTEGER,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CurrentAirportId" TEXT,
ADD COLUMN     "CurrentCompanyId" TEXT,
ADD COLUMN     "CurrentCompanyIdIfAny" TEXT,
ADD COLUMN     "CurrentSeats" INTEGER,
ADD COLUMN     "CurrentStatusDurationInMinutes" INTEGER NOT NULL,
ADD COLUMN     "ExtraWeightCapacity" DOUBLE PRECISION,
ADD COLUMN     "FlightState" INTEGER,
ADD COLUMN     "FuelTotalGallons" DOUBLE PRECISION,
ADD COLUMN     "FuelWeight" DOUBLE PRECISION,
ADD COLUMN     "Heading" DOUBLE PRECISION,
ADD COLUMN     "HoursBefore100HInspection" DOUBLE PRECISION,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Identifier" TEXT NOT NULL,
ADD COLUMN     "IsControlledByAI" BOOLEAN DEFAULT false,
ADD COLUMN     "Last100hInspection" TIMESTAMP(3),
ADD COLUMN     "LastAnnualCheckup" TIMESTAMP(3),
ADD COLUMN     "LastMagicTransportationDate" TIMESTAMP(3),
ADD COLUMN     "LastParkingFeePayment" TIMESTAMP(3),
ADD COLUMN     "LastStatusChange" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LastWeeklyOwnershipPayment" TIMESTAMP(3),
ADD COLUMN     "Latitude" DOUBLE PRECISION,
ADD COLUMN     "LoadedWeight" DOUBLE PRECISION,
ADD COLUMN     "Longitude" DOUBLE PRECISION,
ADD COLUMN     "MustDoMaintenance" BOOLEAN DEFAULT false,
ADD COLUMN     "Nickname" TEXT NOT NULL,
ADD COLUMN     "OnairSyncedAt" TIMESTAMP(3),
ADD COLUMN     "OwnerCompanyId" TEXT,
ADD COLUMN     "RentCautionAmount" DOUBLE PRECISION,
ADD COLUMN     "RentFuelTotalGallons" DOUBLE PRECISION,
ADD COLUMN     "RentHourPrice" DOUBLE PRECISION,
ADD COLUMN     "RentLastDailyChargeDate" TIMESTAMP(3),
ADD COLUMN     "RentStartDate" TIMESTAMP(3),
ADD COLUMN     "RentaAirportId" TEXT,
ADD COLUMN     "RentalCompanyId" TEXT,
ADD COLUMN     "SeatsReservedForEmployees" INTEGER,
ADD COLUMN     "SellPrice" DOUBLE PRECISION,
ADD COLUMN     "TotalWeightCapacity" DOUBLE PRECISION,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "WorldId" TEXT NOT NULL,
ADD COLUMN     "ZeroFuelWeight" INTEGER,
ADD CONSTRAINT "Aircraft_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "AircraftClass" DROP CONSTRAINT "AircraftClass_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "order",
DROP COLUMN "shortName",
DROP COLUMN "updatedAt",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "Order" INTEGER NOT NULL,
ADD COLUMN     "ShortName" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "AircraftClass_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "AircraftEngine" DROP CONSTRAINT "AircraftEngine_pkey",
DROP COLUMN "aircraftGuid",
DROP COLUMN "aircraftId",
DROP COLUMN "condition",
DROP COLUMN "createdAt",
DROP COLUMN "engineHours",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "lastCheckup",
DROP COLUMN "maxCondition",
DROP COLUMN "number",
DROP COLUMN "updatedAt",
ADD COLUMN     "AircraftId" TEXT NOT NULL,
ADD COLUMN     "Condition" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "EngineHours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "LastCheckup" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "MaxCondition" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Number" INTEGER NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "AircraftEngine_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "AircraftType" DROP CONSTRAINT "AircraftType_pkey",
DROP COLUMN "aircraftClassGuid",
DROP COLUMN "aircraftClassId",
DROP COLUMN "airportMinSize",
DROP COLUMN "baseprice",
DROP COLUMN "createdAt",
DROP COLUMN "creationDate",
DROP COLUMN "designSpeedVC",
DROP COLUMN "designSpeedVS0",
DROP COLUMN "designSpeedVS1",
DROP COLUMN "displayName",
DROP COLUMN "emptyWeight",
DROP COLUMN "engineType",
DROP COLUMN "estimatedCruiseFF",
DROP COLUMN "flightsCount",
DROP COLUMN "fuelTotalCapacityInGallons",
DROP COLUMN "fuelType",
DROP COLUMN "gliderHasEngine",
DROP COLUMN "guid",
DROP COLUMN "hightimeAirframe",
DROP COLUMN "id",
DROP COLUMN "isDisabled",
DROP COLUMN "isFighter",
DROP COLUMN "lastModerationDate",
DROP COLUMN "luxeFactor",
DROP COLUMN "maximumCargoWeight",
DROP COLUMN "maximumGrossWeight",
DROP COLUMN "maximumRangeInHour",
DROP COLUMN "maximumRangeInNM",
DROP COLUMN "needsCopilot",
DROP COLUMN "numberOfEngines",
DROP COLUMN "seats",
DROP COLUMN "standardSeatWeight",
DROP COLUMN "timeBetweenOverhaul",
DROP COLUMN "typeName",
DROP COLUMN "updatedAt",
ADD COLUMN     "AircraftClassId" TEXT NOT NULL,
ADD COLUMN     "AirportMinSize" INTEGER NOT NULL,
ADD COLUMN     "Baseprice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "DesignSpeedVC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "DesignSpeedVS0" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "DesignSpeedVS1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "DisplayName" TEXT NOT NULL,
ADD COLUMN     "EmptyWeight" INTEGER NOT NULL,
ADD COLUMN     "EngineType" INTEGER NOT NULL,
ADD COLUMN     "EstimatedCruiseFF" INTEGER NOT NULL,
ADD COLUMN     "FlightsCount" INTEGER NOT NULL,
ADD COLUMN     "FuelTotalCapacityInGallons" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "FuelType" INTEGER NOT NULL,
ADD COLUMN     "GliderHasEngine" BOOLEAN NOT NULL,
ADD COLUMN     "HightimeAirframe" INTEGER NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsDisabled" BOOLEAN NOT NULL,
ADD COLUMN     "IsFighter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "LastModerationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LuxeFactor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MaximumCargoWeight" INTEGER NOT NULL,
ADD COLUMN     "MaximumGrossWeight" INTEGER NOT NULL,
ADD COLUMN     "MaximumRangeInHour" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MaximumRangeInNM" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "NeedsCopilot" BOOLEAN NOT NULL,
ADD COLUMN     "NumberOfEngines" INTEGER NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "Seats" INTEGER NOT NULL,
ADD COLUMN     "StandardSeatWeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TimeBetweenOverhaul" INTEGER NOT NULL,
ADD COLUMN     "TypeName" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "AircraftType_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_pkey",
DROP COLUMN "airportSource",
DROP COLUMN "city",
DROP COLUMN "countryCode",
DROP COLUMN "countryName",
DROP COLUMN "createdAt",
DROP COLUMN "displayName",
DROP COLUMN "elevation",
DROP COLUMN "guid",
DROP COLUMN "hasHelipad",
DROP COLUMN "hasLandRunway",
DROP COLUMN "hasLights",
DROP COLUMN "hasNoRunways",
DROP COLUMN "hasWaterRunway",
DROP COLUMN "iata",
DROP COLUMN "icao",
DROP COLUMN "id",
DROP COLUMN "isAddon",
DROP COLUMN "isClosed",
DROP COLUMN "isMilitary",
DROP COLUMN "isNotInVanillaFS2020",
DROP COLUMN "isNotInVanillaFSX",
DROP COLUMN "isNotInVanillaP3D",
DROP COLUMN "isNotInVanillaXPLANE",
DROP COLUMN "isValid",
DROP COLUMN "lastLongHaulRequestDate",
DROP COLUMN "lastMETARDate",
DROP COLUMN "lastMediumHaulRequestDate",
DROP COLUMN "lastMediumTripRequestDate",
DROP COLUMN "lastRandomSeedGeneration",
DROP COLUMN "lastShortHaulRequestDate",
DROP COLUMN "lastSmallTripRequestDate",
DROP COLUMN "lastVeryShortRequestDate",
DROP COLUMN "latitude",
DROP COLUMN "localTimeCloseInHoursSinceMidnight",
DROP COLUMN "localTimeOpenInHoursSinceMidnight",
DROP COLUMN "longitude",
DROP COLUMN "magVar",
DROP COLUMN "name",
DROP COLUMN "randomSeed",
DROP COLUMN "size",
DROP COLUMN "state",
DROP COLUMN "timeOffsetInSec",
DROP COLUMN "transitionAltitude",
DROP COLUMN "uTCTimeCloseInHoursSinceMidnight",
DROP COLUMN "uTCTimeOpenInHoursSinceMidnight",
DROP COLUMN "updatedAt",
ADD COLUMN     "AirportSource" INTEGER NOT NULL,
ADD COLUMN     "City" TEXT,
ADD COLUMN     "CountryCode" TEXT,
ADD COLUMN     "CountryName" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "DisplayName" TEXT NOT NULL,
ADD COLUMN     "Elevation" DOUBLE PRECISION,
ADD COLUMN     "HasHelipad" BOOLEAN DEFAULT false,
ADD COLUMN     "HasLandRunway" BOOLEAN DEFAULT false,
ADD COLUMN     "HasLights" BOOLEAN DEFAULT false,
ADD COLUMN     "HasNoRunways" BOOLEAN DEFAULT false,
ADD COLUMN     "HasWaterRunway" BOOLEAN DEFAULT false,
ADD COLUMN     "Iata" TEXT,
ADD COLUMN     "Icao" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsAddon" BOOLEAN DEFAULT false,
ADD COLUMN     "IsClosed" BOOLEAN DEFAULT false,
ADD COLUMN     "IsMilitary" BOOLEAN DEFAULT false,
ADD COLUMN     "IsNotInVanillaFS2020" BOOLEAN DEFAULT false,
ADD COLUMN     "IsNotInVanillaFSX" BOOLEAN DEFAULT false,
ADD COLUMN     "IsNotInVanillaP3D" BOOLEAN DEFAULT false,
ADD COLUMN     "IsNotInVanillaXPLANE" BOOLEAN DEFAULT false,
ADD COLUMN     "IsValid" BOOLEAN DEFAULT false,
ADD COLUMN     "LastLongHaulRequestDate" TIMESTAMP(3),
ADD COLUMN     "LastMETARDate" TIMESTAMP(3),
ADD COLUMN     "LastMediumHaulRequestDate" TIMESTAMP(3),
ADD COLUMN     "LastMediumTripRequestDate" TIMESTAMP(3),
ADD COLUMN     "LastRandomSeedGeneration" TIMESTAMP(3),
ADD COLUMN     "LastShortHaulRequestDate" TIMESTAMP(3),
ADD COLUMN     "LastSmallTripRequestDate" TIMESTAMP(3),
ADD COLUMN     "LastVeryShortRequestDate" TIMESTAMP(3),
ADD COLUMN     "Latitude" DOUBLE PRECISION,
ADD COLUMN     "LocalTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
ADD COLUMN     "LocalTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
ADD COLUMN     "Longitude" DOUBLE PRECISION,
ADD COLUMN     "MagVar" DOUBLE PRECISION,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "RandomSeed" INTEGER,
ADD COLUMN     "Size" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "State" TEXT,
ADD COLUMN     "TimeOffsetInSec" INTEGER DEFAULT 0,
ADD COLUMN     "TransitionAltitude" INTEGER,
ADD COLUMN     "UTCTimeCloseInHoursSinceMidnight" DOUBLE PRECISION,
ADD COLUMN     "UTCTimeOpenInHoursSinceMidnight" DOUBLE PRECISION,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "AppConfig" DROP CONSTRAINT "AppConfig_pkey",
DROP COLUMN "appTitle",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "AppTitle" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_pkey",
DROP COLUMN "assignedToVAMemberGuid",
DROP COLUMN "assignedToVAMemberId",
DROP COLUMN "cargoTypeGuid",
DROP COLUMN "cargoTypeId",
DROP COLUMN "companyGuid",
DROP COLUMN "createdAt",
DROP COLUMN "currentAirportGuid",
DROP COLUMN "currentAirportId",
DROP COLUMN "departureAirportGuid",
DROP COLUMN "departureAirportId",
DROP COLUMN "description",
DROP COLUMN "destinationAirportGuid",
DROP COLUMN "destinationAirportId",
DROP COLUMN "distance",
DROP COLUMN "guid",
DROP COLUMN "heading",
DROP COLUMN "humanOnly",
DROP COLUMN "id",
DROP COLUMN "inRecyclingPool",
DROP COLUMN "jobGuid",
DROP COLUMN "jobId",
DROP COLUMN "passengersNumber",
DROP COLUMN "rescueLate",
DROP COLUMN "rescueValidated",
DROP COLUMN "updatedAt",
DROP COLUMN "weight",
ADD COLUMN     "AssignedToVAMemberId" TEXT,
ADD COLUMN     "CargoTypeId" TEXT NOT NULL,
ADD COLUMN     "CompanyGuid" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CurrentAirportId" TEXT NOT NULL,
ADD COLUMN     "DepartureAirportId" TEXT,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "DestinationAirportId" TEXT,
ADD COLUMN     "Distance" DOUBLE PRECISION,
ADD COLUMN     "Heading" DOUBLE PRECISION,
ADD COLUMN     "HumanOnly" BOOLEAN NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "InRecyclingPool" BOOLEAN NOT NULL,
ADD COLUMN     "JobId" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "PassengersNumber" INTEGER NOT NULL,
ADD COLUMN     "RescueLate" BOOLEAN NOT NULL,
ADD COLUMN     "RescueValidated" BOOLEAN NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "Weight" DOUBLE PRECISION,
ADD CONSTRAINT "Cargo_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "CargoType" DROP CONSTRAINT "CargoType_pkey",
DROP COLUMN "cargoTypeCategory",
DROP COLUMN "createdAt",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "maxLbs",
DROP COLUMN "minLbs",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "CargoTypeCategory" INTEGER NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Guid" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "MaxLbs" INTEGER NOT NULL,
ADD COLUMN     "MinLbs" INTEGER NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "CargoType_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Charter" DROP CONSTRAINT "Charter_pkey",
DROP COLUMN "assignedToVAMemberGuid",
DROP COLUMN "assignedToVAMemberId",
DROP COLUMN "boardedPAXSeat",
DROP COLUMN "charterTypeGuid",
DROP COLUMN "charterTypeId",
DROP COLUMN "companyGuid",
DROP COLUMN "createdAt",
DROP COLUMN "currentAirportGuid",
DROP COLUMN "currentAirportId",
DROP COLUMN "departureAirportGuid",
DROP COLUMN "departureAirportId",
DROP COLUMN "description",
DROP COLUMN "destinationAirportGuid",
DROP COLUMN "destinationAirportId",
DROP COLUMN "distance",
DROP COLUMN "guid",
DROP COLUMN "heading",
DROP COLUMN "humanOnly",
DROP COLUMN "id",
DROP COLUMN "inRecyclingPool",
DROP COLUMN "jobGuid",
DROP COLUMN "jobId",
DROP COLUMN "minAircraftTypeLuxe",
DROP COLUMN "minPAXSeatConf",
DROP COLUMN "passengersNumber",
DROP COLUMN "rescueLate",
DROP COLUMN "rescueValidated",
DROP COLUMN "updatedAt",
ADD COLUMN     "AssignedToVAMemberId" TEXT,
ADD COLUMN     "BoardedPAXSeat" INTEGER NOT NULL,
ADD COLUMN     "CharterTypeId" TEXT NOT NULL,
ADD COLUMN     "CompanyGuid" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CurrentAirportId" TEXT,
ADD COLUMN     "DepartureAirportId" TEXT,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "DestinationAirportId" TEXT,
ADD COLUMN     "Distance" DOUBLE PRECISION,
ADD COLUMN     "Heading" DOUBLE PRECISION,
ADD COLUMN     "HumanOnly" BOOLEAN NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "InRecyclingPool" BOOLEAN NOT NULL,
ADD COLUMN     "JobId" TEXT NOT NULL,
ADD COLUMN     "MinAircraftTypeLuxe" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MinPAXSeatConf" INTEGER NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "PassengersNumber" TEXT NOT NULL,
ADD COLUMN     "RescueLate" BOOLEAN NOT NULL,
ADD COLUMN     "RescueValidated" BOOLEAN NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Charter_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "CharterType" DROP CONSTRAINT "CharterType_pkey",
DROP COLUMN "charterTypeCategory",
DROP COLUMN "createdAt",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "maxPAX",
DROP COLUMN "minPAX",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "CharterTypeCategory" INTEGER NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "MaxPAX" INTEGER NOT NULL,
ADD COLUMN     "MinPAX" INTEGER NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "CharterType_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "aircraftRentLevel",
DROP COLUMN "airlineCode",
DROP COLUMN "apiKey",
DROP COLUMN "checkrideLevel",
DROP COLUMN "createdAt",
DROP COLUMN "creationDate",
DROP COLUMN "currentBadgeId",
DROP COLUMN "currentBadgeName",
DROP COLUMN "currentBadgeUrl",
DROP COLUMN "difficultyLevel",
DROP COLUMN "disableSeatsConfigCheck",
DROP COLUMN "enableCargosAndChartersLoadingTime",
DROP COLUMN "enableEmployeesFlightDutyAndSleep",
DROP COLUMN "enableLandingPenalities",
DROP COLUMN "enableSimFailures",
DROP COLUMN "enableSkillTree",
DROP COLUMN "forceTimeInSimulator",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "inSurvival",
DROP COLUMN "lastConnection",
DROP COLUMN "lastReportDate",
DROP COLUMN "lastWeeklyManagementsPaymentDate",
DROP COLUMN "level",
DROP COLUMN "levelXP",
DROP COLUMN "name",
DROP COLUMN "onAirSyncedAt",
DROP COLUMN "ownerId",
DROP COLUMN "paused",
DROP COLUMN "pausedDate",
DROP COLUMN "payBonusFactor",
DROP COLUMN "realisticSimProcedures",
DROP COLUMN "reputation",
DROP COLUMN "transportEmployeeInstant",
DROP COLUMN "transportPlayerInstant",
DROP COLUMN "travelTokens",
DROP COLUMN "uTCOffsetinHours",
DROP COLUMN "updatedAt",
DROP COLUMN "useOnlyVanillaAirports",
DROP COLUMN "useSmallAirports",
DROP COLUMN "virtualAirlineId",
ADD COLUMN     "AircraftRentLevel" INTEGER NOT NULL,
ADD COLUMN     "AirlineCode" TEXT NOT NULL,
ADD COLUMN     "ApiKey" TEXT,
ADD COLUMN     "CheckrideLevel" INTEGER NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "CurrentBadgeId" TEXT,
ADD COLUMN     "CurrentBadgeName" TEXT,
ADD COLUMN     "CurrentBadgeUrl" TEXT,
ADD COLUMN     "DifficultyLevel" INTEGER NOT NULL,
ADD COLUMN     "DisableSeatsConfigCheck" BOOLEAN NOT NULL,
ADD COLUMN     "EnableCargosAndChartersLoadingTime" BOOLEAN NOT NULL,
ADD COLUMN     "EnableEmployeesFlightDutyAndSleep" BOOLEAN NOT NULL,
ADD COLUMN     "EnableLandingPenalities" BOOLEAN NOT NULL,
ADD COLUMN     "EnableSimFailures" BOOLEAN NOT NULL,
ADD COLUMN     "EnableSkillTree" BOOLEAN NOT NULL,
ADD COLUMN     "ForceTimeInSimulator" BOOLEAN NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "InSurvival" BOOLEAN NOT NULL,
ADD COLUMN     "LastConnection" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LastReportDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "LastWeeklyManagementsPaymentDate" TIMESTAMP(3),
ADD COLUMN     "Level" INTEGER NOT NULL,
ADD COLUMN     "LevelXP" INTEGER NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "OwnerId" TEXT,
ADD COLUMN     "Paused" BOOLEAN NOT NULL,
ADD COLUMN     "PausedDate" TIMESTAMP(3),
ADD COLUMN     "PayBonusFactor" INTEGER NOT NULL,
ADD COLUMN     "RealisticSimProcedures" BOOLEAN NOT NULL,
ADD COLUMN     "Reputation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TransportEmployeeInstant" BOOLEAN NOT NULL,
ADD COLUMN     "TransportPlayerInstant" BOOLEAN NOT NULL,
ADD COLUMN     "TravelTokens" INTEGER NOT NULL,
ADD COLUMN     "UTCOffsetinHours" INTEGER NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "UseOnlyVanillaAirports" BOOLEAN NOT NULL,
ADD COLUMN     "UseSmallAirports" BOOLEAN NOT NULL,
ADD COLUMN     "VirtualAirlineId" TEXT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Email" DROP CONSTRAINT "Email_pkey",
DROP COLUMN "body",
DROP COLUMN "createdAt",
DROP COLUMN "from",
DROP COLUMN "id",
DROP COLUMN "messageId",
DROP COLUMN "payload",
DROP COLUMN "sentAt",
DROP COLUMN "subject",
DROP COLUMN "to",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "Body" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "From" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "MessageId" TEXT,
ADD COLUMN     "Payload" TEXT,
ADD COLUMN     "SentAt" TIMESTAMP(3),
ADD COLUMN     "Subject" TEXT,
ADD COLUMN     "To" TEXT NOT NULL,
ADD COLUMN     "Type" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Email_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Flight_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
DROP COLUMN "baseAirportGuid",
DROP COLUMN "baseAirportId",
DROP COLUMN "canAccess",
DROP COLUMN "category",
DROP COLUMN "companyGuid",
DROP COLUMN "createdAt",
DROP COLUMN "creationDate",
DROP COLUMN "description",
DROP COLUMN "expirationDate",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "isFavorited",
DROP COLUMN "isGoodValue",
DROP COLUMN "isLastMinute",
DROP COLUMN "jobTypeGuid",
DROP COLUMN "jobTypeId",
DROP COLUMN "mainAirportGuid",
DROP COLUMN "mainAirportHeading",
DROP COLUMN "mainAirportId",
DROP COLUMN "maxDistance",
DROP COLUMN "minCompanyReput",
DROP COLUMN "pay",
DROP COLUMN "payLastMinuteBonus",
DROP COLUMN "penality",
DROP COLUMN "queriedFromFboGuid",
DROP COLUMN "queriedFromFboId",
DROP COLUMN "realPay",
DROP COLUMN "realPenality",
DROP COLUMN "reputationImpact",
DROP COLUMN "skillPoint",
DROP COLUMN "state",
DROP COLUMN "takenDate",
DROP COLUMN "totalCargoTransported",
DROP COLUMN "totalDistance",
DROP COLUMN "totalPaxTransported",
DROP COLUMN "updatedAt",
DROP COLUMN "valuePerLbsPerDistance",
DROP COLUMN "xP",
ADD COLUMN     "BaseAirportId" TEXT,
ADD COLUMN     "CanAccess" BOOLEAN NOT NULL,
ADD COLUMN     "Category" INTEGER NOT NULL,
ADD COLUMN     "CompanyGuid" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "ExpirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsFavorited" BOOLEAN NOT NULL,
ADD COLUMN     "IsGoodValue" BOOLEAN NOT NULL,
ADD COLUMN     "IsLastMinute" BOOLEAN NOT NULL,
ADD COLUMN     "JobTypeId" TEXT NOT NULL,
ADD COLUMN     "MainAirportHeading" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MainAirportId" TEXT,
ADD COLUMN     "MaxDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "MinCompanyReput" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "Pay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "PayLastMinuteBonus" DOUBLE PRECISION DEFAULT 0.0,
ADD COLUMN     "Penality" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "QueriedFromFboGuid" TEXT,
ADD COLUMN     "QueriedFromFboId" INTEGER,
ADD COLUMN     "RealPay" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "RealPenality" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ReputationImpact" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "SkillPoint" INTEGER NOT NULL,
ADD COLUMN     "State" INTEGER NOT NULL,
ADD COLUMN     "TakenDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "TotalCargoTransported" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TotalDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TotalPaxTransported" INTEGER NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "ValuePerLbsPerDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "XP" INTEGER NOT NULL,
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "JobType" DROP CONSTRAINT "JobType_pkey",
DROP COLUMN "basePayFactor",
DROP COLUMN "basePenalityFactor",
DROP COLUMN "baseReputationImpact",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "shortName",
DROP COLUMN "updatedAt",
ADD COLUMN     "BasePayFactor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "BasePenalityFactor" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "BaseReputationImpact" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "Guid" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "ShortName" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "JobType_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
DROP COLUMN "adminOnly",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isAuthRequired",
DROP COLUMN "isDisabled",
DROP COLUMN "isRemovable",
DROP COLUMN "name",
DROP COLUMN "order",
DROP COLUMN "slug",
DROP COLUMN "updatedAt",
ADD COLUMN     "AdminOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "IsAuthRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsRemovable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Order" SERIAL NOT NULL,
ADD COLUMN     "Slug" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_pkey",
DROP COLUMN "adminOnly",
DROP COLUMN "createdAt",
DROP COLUMN "href",
DROP COLUMN "icon",
DROP COLUMN "id",
DROP COLUMN "isAuthRequired",
DROP COLUMN "isDisabled",
DROP COLUMN "isExternal",
DROP COLUMN "label",
DROP COLUMN "name",
DROP COLUMN "order",
DROP COLUMN "parentId",
DROP COLUMN "slug",
DROP COLUMN "updatedAt",
ADD COLUMN     "AdminOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Href" TEXT NOT NULL,
ADD COLUMN     "Icon" TEXT,
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "IsAuthRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsExternal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "Label" TEXT,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Order" SERIAL NOT NULL,
ADD COLUMN     "ParentId" INTEGER NOT NULL,
ADD COLUMN     "Slug" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "accountGuid",
DROP COLUMN "actionId",
DROP COLUMN "aircraftGuid",
DROP COLUMN "amount",
DROP COLUMN "categoryId",
DROP COLUMN "companyGuid",
DROP COLUMN "companyId",
DROP COLUMN "description",
DROP COLUMN "flightGuid",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "isNotification",
DROP COLUMN "isRead",
DROP COLUMN "personGuid",
DROP COLUMN "personId",
DROP COLUMN "vaGuid",
DROP COLUMN "vaId",
DROP COLUMN "zuluEventTime",
ADD COLUMN     "AccountId" TEXT,
ADD COLUMN     "ActionId" INTEGER NOT NULL,
ADD COLUMN     "AircraftId" TEXT,
ADD COLUMN     "Amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "CategoryId" INTEGER NOT NULL,
ADD COLUMN     "CompanyId" TEXT,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "FlightId" TEXT,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "PersonId" TEXT,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "VaId" TEXT NOT NULL,
ADD COLUMN     "ZuluEventTime" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "category",
DROP COLUMN "companyGuid",
DROP COLUMN "companyId",
DROP COLUMN "flightHoursGrandTotal",
DROP COLUMN "flightHoursInCompany",
DROP COLUMN "flightHoursTotalBeforeHiring",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "isOnline",
DROP COLUMN "lastStatusChange",
DROP COLUMN "onAirSyncedAt",
DROP COLUMN "pseudo",
DROP COLUMN "status",
ADD COLUMN     "Category" INTEGER NOT NULL,
ADD COLUMN     "CompanyId" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "FlightHoursGrandTotal" DOUBLE PRECISION,
ADD COLUMN     "FlightHoursInCompany" DOUBLE PRECISION,
ADD COLUMN     "FlightHoursTotalBeforeHiring" DOUBLE PRECISION,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "LastStatusChange" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "Pseudo" TEXT NOT NULL,
ADD COLUMN     "Status" INTEGER NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "VAInvitation" DROP CONSTRAINT "VAInvitation_pkey",
DROP COLUMN "acceptedAt",
DROP COLUMN "accountId",
DROP COLUMN "companyId",
DROP COLUMN "createdAt",
DROP COLUMN "emailId",
DROP COLUMN "id",
DROP COLUMN "isPending",
DROP COLUMN "token",
DROP COLUMN "updatedAt",
DROP COLUMN "vaId",
ADD COLUMN     "AcceptedAt" TIMESTAMP(3),
ADD COLUMN     "AccountId" TEXT NOT NULL,
ADD COLUMN     "CompanyId" TEXT NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "EmailId" TEXT NOT NULL,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "IsPending" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "Token" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "VaId" TEXT NOT NULL,
ADD CONSTRAINT "VAInvitation_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "VirtualAirline" DROP CONSTRAINT "VirtualAirline_pkey",
DROP COLUMN "aircraftRentLevel",
DROP COLUMN "airlineCode",
DROP COLUMN "apiKey",
DROP COLUMN "automaticallyAssignJobWhenLoaded",
DROP COLUMN "automaticallyAssignJobWhenTaken",
DROP COLUMN "checkrideLevel",
DROP COLUMN "createdAt",
DROP COLUMN "creationDate",
DROP COLUMN "difficultyLevel",
DROP COLUMN "disableSeatsConfigCheck",
DROP COLUMN "enableCargosAndChartersLoadingTime",
DROP COLUMN "enableEmployeesFlightDutyAndSleep",
DROP COLUMN "enableLandingPenalities",
DROP COLUMN "enableSimFailures",
DROP COLUMN "enableSkillTree",
DROP COLUMN "forceAssignJobsToPilots",
DROP COLUMN "forceTimeInSimulator",
DROP COLUMN "guid",
DROP COLUMN "id",
DROP COLUMN "imageName",
DROP COLUMN "inSurvival",
DROP COLUMN "initalOwnerEquity",
DROP COLUMN "lastConnection",
DROP COLUMN "lastDividendsDistribution",
DROP COLUMN "lastReportDate",
DROP COLUMN "level",
DROP COLUMN "levelXP",
DROP COLUMN "memberCount",
DROP COLUMN "name",
DROP COLUMN "onAirSyncedAt",
DROP COLUMN "ownerId",
DROP COLUMN "paused",
DROP COLUMN "payBonusFactor",
DROP COLUMN "percentDividendsToDistribute",
DROP COLUMN "realisticSimProcedures",
DROP COLUMN "reputation",
DROP COLUMN "restrictEmployeesUsage",
DROP COLUMN "restrictLoadingNonVAJobsIntoVAAircraft",
DROP COLUMN "restrictLoadingVAJobsIntoNonVAAircraft",
DROP COLUMN "transportEmployeeInstant",
DROP COLUMN "transportPlayerInstant",
DROP COLUMN "travelTokens",
DROP COLUMN "uTCOffsetinHours",
DROP COLUMN "updatedAt",
DROP COLUMN "useOnlyVanillaAirports",
DROP COLUMN "useSmallAirports",
ADD COLUMN     "AircraftRentLevel" INTEGER,
ADD COLUMN     "AirlineCode" TEXT NOT NULL,
ADD COLUMN     "ApiKey" TEXT NOT NULL,
ADD COLUMN     "AutomaticallyAssignJobWhenLoaded" BOOLEAN,
ADD COLUMN     "AutomaticallyAssignJobWhenTaken" BOOLEAN,
ADD COLUMN     "CheckrideLevel" INTEGER,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "DifficultyLevel" INTEGER,
ADD COLUMN     "DisableSeatsConfigCheck" BOOLEAN,
ADD COLUMN     "EnableCargosAndChartersLoadingTime" BOOLEAN,
ADD COLUMN     "EnableEmployeesFlightDutyAndSleep" BOOLEAN,
ADD COLUMN     "EnableLandingPenalities" BOOLEAN,
ADD COLUMN     "EnableSimFailures" BOOLEAN,
ADD COLUMN     "EnableSkillTree" BOOLEAN,
ADD COLUMN     "ForceAssignJobsToPilots" BOOLEAN,
ADD COLUMN     "ForceTimeInSimulator" BOOLEAN,
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "ImageName" TEXT,
ADD COLUMN     "InSurvival" BOOLEAN,
ADD COLUMN     "InitalOwnerEquity" INTEGER,
ADD COLUMN     "LastConnection" TIMESTAMP(3),
ADD COLUMN     "LastDividendsDistribution" TIMESTAMP(3),
ADD COLUMN     "LastReportDate" TIMESTAMP(3),
ADD COLUMN     "Level" INTEGER,
ADD COLUMN     "LevelXP" INTEGER,
ADD COLUMN     "MemberCount" INTEGER,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "OnAirSyncedAt" TIMESTAMP(3),
ADD COLUMN     "OwnerId" TEXT,
ADD COLUMN     "Paused" BOOLEAN,
ADD COLUMN     "PayBonusFactor" DOUBLE PRECISION,
ADD COLUMN     "PercentDividendsToDistribute" DOUBLE PRECISION,
ADD COLUMN     "RealisticSimProcedures" BOOLEAN,
ADD COLUMN     "Reputation" DOUBLE PRECISION,
ADD COLUMN     "RestrictEmployeesUsage" BOOLEAN,
ADD COLUMN     "RestrictLoadingNonVAJobsIntoVAAircraft" BOOLEAN,
ADD COLUMN     "RestrictLoadingVAJobsIntoNonVAAircraft" BOOLEAN,
ADD COLUMN     "TransportEmployeeInstant" BOOLEAN,
ADD COLUMN     "TransportPlayerInstant" BOOLEAN,
ADD COLUMN     "TravelTokens" INTEGER,
ADD COLUMN     "UTCOffsetinHours" DOUBLE PRECISION,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "UseOnlyVanillaAirports" BOOLEAN,
ADD COLUMN     "UseSmallAirports" BOOLEAN,
ADD CONSTRAINT "VirtualAirline_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_DiscordId_key" ON "Account"("DiscordId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_PersonId_key" ON "Account"("PersonId");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_Identifier_key" ON "Aircraft"("Identifier");

-- CreateIndex
CREATE UNIQUE INDEX "AircraftClass_ShortName_key" ON "AircraftClass"("ShortName");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_Icao_key" ON "Airport"("Icao");

-- CreateIndex
CREATE UNIQUE INDEX "CargoType_Guid_key" ON "CargoType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "Company_AirlineCode_key" ON "Company"("AirlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ApiKey_key" ON "Company"("ApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_OwnerId_key" ON "Company"("OwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "JobType_Guid_key" ON "JobType"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Slug_key" ON "Menu"("Slug");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_Slug_key" ON "MenuItem"("Slug");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_AirlineCode_key" ON "VirtualAirline"("AirlineCode");

-- CreateIndex
CREATE UNIQUE INDEX "VirtualAirline_ApiKey_key" ON "VirtualAirline"("ApiKey");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_ApprovedById_fkey" FOREIGN KEY ("ApprovedById") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_PersonId_fkey" FOREIGN KEY ("PersonId") REFERENCES "Person"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualAirline" ADD CONSTRAINT "VirtualAirline_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_VaId_fkey" FOREIGN KEY ("VaId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VAInvitation" ADD CONSTRAINT "VAInvitation_EmailId_fkey" FOREIGN KEY ("EmailId") REFERENCES "Email"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "Account"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_VirtualAirlineId_fkey" FOREIGN KEY ("VirtualAirlineId") REFERENCES "VirtualAirline"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Menu"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_VaId_fkey" FOREIGN KEY ("VaId") REFERENCES "VirtualAirline"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_PersonId_fkey" FOREIGN KEY ("PersonId") REFERENCES "Person"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftEngine" ADD CONSTRAINT "AircraftEngine_AircraftId_fkey" FOREIGN KEY ("AircraftId") REFERENCES "Aircraft"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AircraftType" ADD CONSTRAINT "AircraftType_AircraftClassId_fkey" FOREIGN KEY ("AircraftClassId") REFERENCES "AircraftClass"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_AircraftTypeId_fkey" FOREIGN KEY ("AircraftTypeId") REFERENCES "AircraftType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_RentaAirportId_fkey" FOREIGN KEY ("RentaAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_CurrentAirportId_fkey" FOREIGN KEY ("CurrentAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_RentalCompanyId_fkey" FOREIGN KEY ("RentalCompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aircraft" ADD CONSTRAINT "Aircraft_OwnerCompanyId_fkey" FOREIGN KEY ("OwnerCompanyId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_CharterTypeId_fkey" FOREIGN KEY ("CharterTypeId") REFERENCES "CharterType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_CurrentAirportId_fkey" FOREIGN KEY ("CurrentAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_DepartureAirportId_fkey" FOREIGN KEY ("DepartureAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_DestinationAirportId_fkey" FOREIGN KEY ("DestinationAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_AssignedToVAMemberId_fkey" FOREIGN KEY ("AssignedToVAMemberId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charter" ADD CONSTRAINT "Charter_JobId_fkey" FOREIGN KEY ("JobId") REFERENCES "Job"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_CargoTypeId_fkey" FOREIGN KEY ("CargoTypeId") REFERENCES "CargoType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_CurrentAirportId_fkey" FOREIGN KEY ("CurrentAirportId") REFERENCES "Airport"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_DepartureAirportId_fkey" FOREIGN KEY ("DepartureAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_DestinationAirportId_fkey" FOREIGN KEY ("DestinationAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_AssignedToVAMemberId_fkey" FOREIGN KEY ("AssignedToVAMemberId") REFERENCES "Company"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_JobId_fkey" FOREIGN KEY ("JobId") REFERENCES "Job"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_JobTypeId_fkey" FOREIGN KEY ("JobTypeId") REFERENCES "JobType"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_MainAirportId_fkey" FOREIGN KEY ("MainAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_BaseAirportId_fkey" FOREIGN KEY ("BaseAirportId") REFERENCES "Airport"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
