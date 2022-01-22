import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman){
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: 'insensitive'
                }
            }
        })

        if(deliverymanExist) {
            throw new Error('Deliveryman already exists')
        }

        //criptografa a senha
        const hashPassword = await hash(password, 10);

        //salva o deliveryman
        const deliveryman = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            }
        });

        return deliveryman;
    }
}