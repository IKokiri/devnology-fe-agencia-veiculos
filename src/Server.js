export class Server {

    static getServer() {
        if (1 != 1) {

            return `http://localhost:4000/agencia/v1/`

        } else {

            return `http://agencia-veiculos-be.herokuapp.com/agencia/v1/`
        }
    }

}