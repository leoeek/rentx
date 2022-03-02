import { Specification } from "../infra/typorm/entities/Specification";

interface ICreateCarDTO {
    id?: string;
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amnount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];    
    available?: boolean;
}

export { ICreateCarDTO }