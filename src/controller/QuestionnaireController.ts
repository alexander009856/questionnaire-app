import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Questionnaire } from "../entity/Questionnaire";
import { User } from '../entity/User'
export class QuestionnaireController {
    private userRepository = AppDataSource.getRepository(User);

    private questionnaireRepository = AppDataSource.getRepository(Questionnaire);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.questionnaireRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const questionnaire = await this.questionnaireRepository.findOne({
            where: { id }
        });

        if (!questionnaire) {
            return "Questionnaire not found";
        }
        return questionnaire;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, description, answers } = request.body;

        const authToken = request.header('Authorization');
        const token = await this.userRepository.findOne({ where: { accessToken: authToken } });

        if (!token) {
            return { error: 'Authorization token missing' };
        }

        const questionnaire = Object.assign(new Questionnaire(), {
            title,
            description,
            answers
        });

        return this.questionnaireRepository.save(questionnaire);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let questionnaireToRemove = await this.questionnaireRepository.findOneBy({ id });

        if (!questionnaireToRemove) {
            return "Questionnaire not found";
        }

        await this.questionnaireRepository.remove(questionnaireToRemove);

        return "Questionnaire has been removed";
    }

}