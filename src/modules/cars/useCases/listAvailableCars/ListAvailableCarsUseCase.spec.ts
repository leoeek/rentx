import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car Test",
            "description": "Car description",
            "daily_rate": 150.10,
            "license_plate": "FUUUU",
            "fine_amnount": 900.34,
            "brand": "Card Brand",
            "category_id": "caregory_id"            
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car Test 2",
            "description": "Car description",
            "daily_rate": 150.10,
            "license_plate": "FUUUU",
            "fine_amnount": 900.34,
            "brand": "Card Brand 2",
            "category_id": "caregory_id"            
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Card Brand 2",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car Test 3",
            "description": "Car description",
            "daily_rate": 150.10,
            "license_plate": "FUUUU",
            "fine_amnount": 900.34,
            "brand": "Card Brand 2",
            "category_id": "caregory_id"            
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car Test 3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car Test 4",
            "description": "Car description",
            "daily_rate": 150.10,
            "license_plate": "FUUUU",
            "fine_amnount": 900.34,
            "brand": "Card Brand 2",
            "category_id": "123456"            
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });

        expect(cars).toEqual([car]);
    });
})