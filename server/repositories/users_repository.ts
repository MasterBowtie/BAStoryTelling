import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateUserPayload = {
    email: string,
    userName: string,
    password: string
}

export type UpdateUserPayload = {
    email: string,
    userName: string,
    password: string,
    roleID: number,
    userID: number
}

export class UsersRepository {
    private db: PrismaClient

    private static instance: UsersRepository

    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): UsersRepository {
        if (!this.instance) {
            this.instance = new UsersRepository(db!!);
        }
        return this.instance;
    }

    async createUser({email, userName, password}: CreateUserPayload) {
        var u_salt = bcrypt.genSaltSync();
        var e_password = bcrypt.hashSync(password, u_salt);
        
        return this.db.users.create({
            data: {
                email: email,
                userName: userName,
                userPassword: e_password,
                passwordSalt: u_salt
            }
        });
    }

    async getUserById(id: number) {
        return this.db.users.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                userName: true
            }
        });
    }

    async updateUser({email, userName, password, roleID, userID}: UpdateUserPayload) {
        var u_salt = bcrypt.genSaltSync();
        var u_hash = bcrypt.hashSync(password, u_salt);

        this.db.users.update({
            where: {
                id: userID
            },
            data: {
                userName: userName,
                email: email,
                userPassword: u_hash,
                passwordSalt: u_salt,
                roleID: roleID
            }
        });
    }
}