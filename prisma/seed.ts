import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
config();

async function main() {

    // TODO: Add Roles
    const admin = await prisma.role.upsert({
        where: { id: 1},
        create: {
            roleName: "Admin"
        },
        update: {
            roleName: "Admin"
        }
    })

    // Build Admin
    // let salt = await bcrypt.genSalt();
    // const adminUser = await prisma.users.upsert({
    //     where: { id: 1 },
    //     create: {
    //       userName: "ADMIN",
    //       email: process.env.ADMIN_EMAIL!!,
    //       passwordSalt: salt,
    //       userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!, salt),
    //       profileID: { create: { firstName: "Cody",
    //         lastName: "Apedaile"
    //       } }
    //     },
    //     update: {
    //       email: process.env.ADMIN_EMAIL!!,
    //       passwordSalt: salt,
    //       userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!, salt),
    //     }
    //   });
}