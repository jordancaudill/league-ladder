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
