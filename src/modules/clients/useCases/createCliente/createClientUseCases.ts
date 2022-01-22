import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";


interface ICreateClient {
    username: string;
    password: string;
}



export class CreateClientUseCase {

    async execute({ password, username }: ICreateClient){
        //Valida se o cliente existe
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: 'insensitive'
                }
            }
        })

        if(clientExist) {
            throw new Error('client already exists')
        }

        //criptografa a senha
        const hashPassword = await hash(password, 10);

        //salva o cliente
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            }
        });

        return client;
    }
}