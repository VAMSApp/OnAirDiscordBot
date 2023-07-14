/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const SeedData = require('./seed-data.js');
const eachSeries = require('async/eachSeries');

async function main() {
    console.log('Seeding data...');
    await prisma.$connect();

    await eachSeries(SeedData['world'], async (world) => {
        const x = await prisma.world.upsert({
            where: {
                Id: world.Id,
            },
            update: world,
            create: world,
        });

        console.log(`  ✅ World '${x.Name}' upserted`);
    });

    // await eachSeries(SeedData['aircraftStatus'], async (x) => {
    //     const newX = await prisma.aircraftStatus.upsert({
    //         where: {
    //             Id: x.Id,
    //         },
    //         update: x,
    //         create: x,
    //     });

    //     console.log(`  ✅ Aircraft Status '${newX.Name}' upserted`);
    // });

    // await eachSeries(SeedData['fuelType'], async (x) => {
    //     const newX = await prisma.fuelType.upsert({
    //         where: {
    //             Id: x.Id,
    //         },
    //         update: x,
    //         create: x,
    //     });

    //     console.log(`  ✅ Fuel Type '${newX.Name}' upserted`);
    // });

    // await eachSeries(SeedData['engineType'], async (x) => {
    //     const newX = await prisma.engineType.upsert({
    //         where: {
    //             Id: x.Id,
    //         },
    //         update: x,
    //         create: x,
    //     });

    //     console.log(`  ✅ Engine Type '${newX.Name}' upserted`);
    // });

    // await eachSeries(SeedData['notificationCategory'], async (x) => {
    //     const newX = await prisma.notificationCategory.upsert({
    //         where: {
    //             Id: x.Id,
    //         },
    //         update: x,
    //         create: x,
    //     });

    //     console.log(`  ✅ Notification Category '${newX.Name}' upserted`);
    // });

    // await eachSeries(SeedData['notificationAction'], async (x) => {
    //     const newX = await prisma.notificationAction.upsert({
    //         where: {
    //             Id: x.Id,
    //         },
    //         update: x,
    //         create: x,
    //     });

    //     console.log(`  ✅ Notification Action '${newX.Name}' upserted`);
    // });
}

main()
    .then(() => {
        console.log('Data seeded');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
