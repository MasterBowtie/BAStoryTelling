import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
config();

async function main() {

    // TODO: Add Roles
    const admin = await prisma.role.upsert({
        where: { id: 1},
        create: { roleName: "Admin" },
        update: { roleName: "Admin" }
    });
    const user = await prisma.role.upsert({
        where: { id: 2 },
        create: { roleName: "User" },
        update: { roleName: "User" }
    });
    const moderator = await prisma.role.upsert({
        where: { id: 3 },
        create: { roleName: "Moderator" },
        update: { roleName: "Moderator" }
    });
    const editor = await prisma.role.upsert({
        where: { id: 4 },
        create: { roleName: "Editor" },
        update: { roleName: "Editor" }
    });

    // Build Admin
    let salt = await bcrypt.genSalt();
    console.log(salt);
    let password = bcrypt.hashSync(process.env.ADMIN_PASSWORD!!, salt);
    console.log(password);
    const adminUser = await prisma.user.upsert({
        where: { id: 1 },
        create: {
            userName: "ADMIN",
            email: process.env.ADMIN_EMAIL!!,
            passwordSalt: salt,
            userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!, salt),
            profile: { 
                create: { 
                    firstName: "Cody",
                    lastName: "Apedaile"
                } 
            },
            interests: {
                create: {},
            },
            titles: {
                create: { id: 1}
            }
        },
        update: {
          email: process.env.ADMIN_EMAIL!!,
          passwordSalt: salt,
          userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!, salt),
        }
      });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })