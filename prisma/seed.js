const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const SeedData = require('./seed-data.js');


async function main() {
    const {
        APP_TITLE
    } = process.env;

    SeedData['worlds'].forEach(async (world) => {
        const x = await prisma.world.upsert({
            where: {
                Id: world.Id,
            },
            update: world,
            create: world,
        });
        
        console.log(`✅ World '${x.Name}' upserted!`)
    })

    SeedData['aircraftStatuses'].forEach(async (x) => {
        const newX = await prisma.aircraftStatus.upsert({
            where: {
                Id: x.Id,
            },
            update: x,
            create: x,
        });
        
        console.log(`✅ Aircraft Status '${newX.Name}' upserted!`)
    })

    SeedData['fuelTypes'].forEach(async (x) => {
        const newX = await prisma.fuelType.upsert({
            where: {
                Id: x.Id,
            },
            update: x,
            create: x,
        });
        
        console.log(`✅ Fuel Type '${newX.Name}' upserted!`)
    })

    SeedData['engineTypes'].forEach(async (x) => {
        const newX = await prisma.engineType.upsert({
            where: {
                Id: x.Id,
            },
            update: x,
            create: x,
        });
        
        console.log(`✅ Engine Type '${newX.Name}' upserted!`)
    })
    
}

main()
.then(() => {
    console.log('Done')
})
.catch((e) => {
    console.error(e);
    process.exit(1);
})
