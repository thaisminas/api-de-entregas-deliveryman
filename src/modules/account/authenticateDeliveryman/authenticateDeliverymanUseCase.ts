import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from 'jsonwebtoken';


interface IAuthenticateDeliveryman {
    username: string;
    password: string;

}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
       

        //verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username,
            }
        })

        if(!deliveryman) {
            throw new Error("Username or password invalid!")
        }

        //Verificar se senha corresponde ao username, compara a senha que está sendo passada, com a do banco de dados
        const passwordMatch = await compare(password, deliveryman.password)

        if(!passwordMatch) {
            throw new Error('Username or password invalid!')
        }

        //Gerar Token
        const token = sign({username}, "202cb962ac59075b964b07152d234b70", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token;

    }
}