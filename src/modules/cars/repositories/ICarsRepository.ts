import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typorm/entities/Cars";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
}

export { ICarsRepository }