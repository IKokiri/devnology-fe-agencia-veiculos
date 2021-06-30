import { Server } from '../Server'
import { Cache } from './Cache.js'

const base = Server.getServer()


export class APIGlobal {

    static async getMarcas() {
        try {
            const response = await fetch(`${base}marca`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getModelos() {
        try {
            const response = await fetch(`${base}modelo`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getVeiculos() {
        try {
            const response = await fetch(`${base}veiculo`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getProdutos() {
        try {
            const response = await fetch(`${base}produto`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getEstoque() {
        try {
            const response = await fetch(`${base}estoque`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getFuncionarios() {
        try {
            const response = await fetch(`${base}funcionario`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getCompras() {
        try {
            const response = await fetch(`${base}compra`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

    static async getVendas() {
        try {
            const response = await fetch(`${base}venda`);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw e;
        }
    }

}