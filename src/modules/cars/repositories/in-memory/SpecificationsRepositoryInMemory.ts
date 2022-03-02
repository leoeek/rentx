import { Specification } from "@modules/cars/infra/typorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name);
    }
    
    list(): Promise<Specification[]> {
        throw new Error("Method not implemented.");
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id));
        return allSpecifications;
    }

}

export { SpecificationsRepositoryInMemory };