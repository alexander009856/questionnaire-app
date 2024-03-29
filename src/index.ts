import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { Questionnaire } from "./entity/Questionnaire"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    app.listen(8080)

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         username: "alexander00",
    //         password: "hahaha"
    //     })
    // )

 
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Questionnaire, {
            title: "What is the capital of Sofia?",
            description: "easy",
            answers: ['Sofia','Varna','Burgas']
        })
    )

    console.log("Express server has started on port 8080")

}).catch(error => console.log(error))
