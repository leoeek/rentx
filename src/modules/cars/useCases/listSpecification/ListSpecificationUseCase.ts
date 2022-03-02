import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typorm/entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const all = await this.specificationRepository.list();
        return all;
    }
}

export { ListSpecificationUseCase };