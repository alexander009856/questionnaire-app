import { QuestionnaireController } from "./controller/QuestionnaireController"
import { UserController } from "./controller/UserController"
import { Questionnaire } from "./entity/Questionnaire"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
}, {
    method: "get",
    route: "/questions",
    controller: QuestionnaireController,
    action: "all"
}]