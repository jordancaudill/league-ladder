import { SequelizeTimestamps } from './Sequelize';

export interface LeagueAccount extends SequelizeTimestamps {
    id: number;
    username: string;
    summonerId: string;
    userId: string;
}
