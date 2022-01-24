import { prisma } from "../../../../database/prismaClient";

interface IUpdateDeliveryman{
    id_delivery: string;
    id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {
    async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
        //busca por id_delivery e em data é o que deseja adicionar, que no caso é o id_deliveryman
        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery
            },
            data: {
                id_deliveryman
            }
        })

        return result;
    }
}