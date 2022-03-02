import { CarImage } from "../infra/typorm/entities/CarImage";

interface ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository }