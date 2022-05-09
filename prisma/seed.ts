import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const juan = await prisma.user.upsert({
    where: { email: 'jperez@gmail.com' },
    update: {},
    create: {
      email: 'jperez@gmail.com',
      name: 'Juan',
      lastname: 'Perez',
      password: '$argon2i$v=19$m=4096,t=3,p=1$zDRs7Rkq79OgcAac+ZFRiQ$cDIS9SLLnrUGtj78Coih4taascAiMNDJxhDkVY22kVE',
      posts: {
        create: {
          title: 'Hola soy Juan Perez',
          content: 'hola test content',
        },
      },
    },
  })

  const patricio = await prisma.user.upsert({
    where: { email: 'pestrella@gmail.com' },
    update: {},
    create: {
      email: 'pestrella@gmail.com',
      name: 'Patricio',
      lastname: 'Estrella',
      password: '$argon2i$v=19$m=4096,t=3,p=1$zDRs7Rkq79OgcAac+ZFRiQ$cDIS9SLLnrUGtj78Coih4taascAiMNDJxhDkVY22kVE',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
          },
        ],
      },
    },
  })
  console.log({ juan, patricio })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
