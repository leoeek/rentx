import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1212",
            fine_amnount: 60,
            brand: "Brand",
            category_id: "category1"
        });

        expect(car).toHaveProperty("id");
    })

    it("should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Name Car 1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1212",
            fine_amnount: 60,
            brand: "Brand",
            category_id: "category1"
        });

        await expect(
            createCarUseCase.execute({
                name: "Name Car 2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1212",
                fine_amnount: 60,
                brand: "Brand",
                category_id: "category1"
            })
        ).rejects.toEqual(new AppError("Card already exists!"));
    })

    it("should not be abel to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car 2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1212",
            fine_amnount: 60,
            brand: "Brand",
            category_id: "category1"
        });

        expect(car.available).toBe(true)
    })
});