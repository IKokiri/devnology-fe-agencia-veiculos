import { Server } from '../../Server'
const recurso = 'produto'

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

    static async delete(id) {
        const response = await fetch(`${rota}/` + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(console.error);
        return response;
    }

    static async create(data) {

        const response = await fetch(`${rota}/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(console.error);

        return response;

    }

    static async getId(id) {
        try {
            const response = await fetch(`${rota}/` + id);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async update(data) {

        const response = await fetch(`${rota}/` + data.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch(console.error);
        return response

    }

}