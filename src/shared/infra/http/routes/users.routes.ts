import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import uploadConfig from "../../../../config/upload";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUseAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUseAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar", 
    ensureAuthenticated, 
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes }