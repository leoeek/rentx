import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
        
    cars: Car[] = [];

    async create({
        id,
        name,
        description,
        daily_rate,
        license_plate,
        fine_amnount,
        brand,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            id,
            name,
            description,
            daily_rate,
            license_plate,
            fine_amnount,
            brand,
            category_id
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);        
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        return this.cars
            .filter((car) => {
                if (car.available === true) {
                    if (!brand && !category_id && !name)  return car;
                    
                    if ((brand && car.brand === brand) || 
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name))
                    {
                        return car;
                    }

                }

                return null;
        });
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id);
        if (findIndex > -1) {
            this.cars[findIndex].available = available;
        }
    }

}

export { CarsRepositoryInMemory }