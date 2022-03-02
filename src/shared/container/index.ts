import { container } from "tsyringe";

import '@shared/container/providers';

import { CategoriesRepository } from "@modules/cars/infra/typorm/repositories/CategoriesRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typorm/repositories/SpecificationsRepository";
import { CarsRepository } from "@modules/cars/infra/typorm/repositories/CarsRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typorm/repositories/CarsImagesRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/respositories/RentalsRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRenatalsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository", 
    CarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository", 
    CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository", 
    RentalsRepository
);