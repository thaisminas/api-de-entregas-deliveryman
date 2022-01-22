import { AuthenticateClientController } from './modules/account/authenticateUser/authenticateClientController';
import { CreateClientController } from './modules/clients/useCases/createCliente/createClientController';
import { Router } from "express";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();


routes.post('/authenticate', authenticateClientController.handle)
routes.post('/client/', createClientController.handle)


export { routes }

