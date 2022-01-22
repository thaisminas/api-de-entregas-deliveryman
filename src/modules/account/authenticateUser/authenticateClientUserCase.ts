import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from 'jsonwebtoken';


interface IAuthenticateUser {
    username: string;
    password: string;

}


export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateUser) {
        //Receber username, password
        

        //verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username,
            }
        })

        if(!client) {
            throw new Error("Username or password invalid!")
        }

        //Verificar se senha corresponde ao username, compara a senha que está sendo passada, com a do banco de dados
        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch) {
            throw new Error('Username or password invalid!')
        }

        //Gerar Token
        const token = sign({username}, "019acc25a4e242bb55ad489832ada12d", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token;

    }
}