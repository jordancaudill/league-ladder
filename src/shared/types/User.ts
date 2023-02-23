import { SequelizeTimestamps } from './Sequelize';

export interface User extends SequelizeTimestamps {
    id: string;
    username: string;
    birthDate: string;
    password: string;
    email: string;
    discordHandle: string;
    discordId: string;
    admin: boolean;
    emailVerified: boolean;
    subStatus: boolean;
}

export interface PublicUser extends SequelizeTimestamps {
    id: string;
    username: string;
    birthDate: string;
    email: string;
    discordHandle: string;
    discordId: string;
    admin: boolean;
    emailVerified: boolean;
    subStatus: boolean;
}

export interface SignupRequestBody {
    username: string;
    birthDate: string;
    email: string;
    password: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;

}