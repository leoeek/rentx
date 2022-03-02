import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUseAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUseAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const avatar_file = request.file.filename;
     
        const updateUserAvatarUsecase = container.resolve(UpdateUseAvatarUseCase);
        await updateUserAvatarUsecase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
    
}

export { UpdateUseAvatarController }