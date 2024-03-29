import { QuestionnaireController } from "./controller/QuestionnaireController"
import { UserController } from "./controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
},
{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
},
{
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register"
},
{
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
},
{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
},
{
    method: "get",
    route: "/questions",
    controller: QuestionnaireController,
    action: "all"
},
{
    method: "post",
    route: "/questions",
    controller: QuestionnaireController,
    action: "save"
}
]