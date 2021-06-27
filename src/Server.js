export class Server {

    static getServer() {
        if (process.env.NODE_ENV === 'devlopment') {

            return `http://localhost:4000/agencia/v1/`

        } else {

            return `https://agencia-veiculos-be.herokuapp.com/agencia/v1/`
        }
    }

}