import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User"; // Make sure to import the User entity
import { sign, verify } from "jsonwebtoken";

export class UserController {

    private userRepository = AppDataSource.getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            return "User not found";
        }
        return user;
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;
        const existingUser = await this.userRepository.findOne({ where: { username } });

        if (!existingUser || existingUser.password !== password) {
            return 'invalid username/password'
        }
        else {
            const accessToken = sign({ username }, 'secrethaha');
            existingUser.accessToken = accessToken;

            await this.userRepository.save(existingUser);
            return accessToken
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;
        const user = Object.assign(new User(), {
            username,
            password,
            accessToken: ''
        });
        await this.userRepository.save(user);
        return user
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { username, password } = request.body;

        let userToUpdate = await this.userRepository.findOne({
            where: { id }
        });

        if (!userToUpdate) {
            return "User not found";
        }

        userToUpdate.username = username;
        userToUpdate.password = password;

        await this.userRepository.save(userToUpdate);

        return "User has been updated";
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        let userToRemove = await this.userRepository.findOne({
            where: { id }
        });

        if (!userToRemove) {
            return "User not found";
        }

        await this.userRepository.remove(userToRemove);

        return "User has been removed";
    }
}