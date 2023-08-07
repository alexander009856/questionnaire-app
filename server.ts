import 'reflect-metadata'
import express, { Request, Response } from 'express';
import { DataSource } from 'typeorm'

const app = express();
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
    res.send({
        questionOne: {
            name: "What is the capital of Bulgaria?",
            answer: 'Sofia'
        }
    });
});

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '9856',
    database: 'typeorm_db'
})

AppDataSource.initialize().
    then(() => console.log('DataBase Connected successfully'))
    .catch(err => console.log('Error Connecting Database', err))

app.listen(8080, () => console.log('Server is running on port 8080...'));