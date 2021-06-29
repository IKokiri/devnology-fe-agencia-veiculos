import { Server } from '../../Server'
const recurso = 'compra'

const base = Server.getServer()
const rota = base + recurso

export class API {

    static async get() {
        try {
            const response = await fetch(`${rota}/`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

}