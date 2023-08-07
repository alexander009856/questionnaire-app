import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Questionnaire } from "./entity/Questionnaire"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "9856",
    database: "typeorm_db",
    synchronize: true,
    logging: false,
    entities: [User,Questionnaire],
    migrations: [],
    subscribers: [],
})
