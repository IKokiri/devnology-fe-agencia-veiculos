import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { APIGlobal } from '../../API/API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Cache } from '../../API/Cache'
function Fluxo() {


    const [compras, setCompras] = useState([]);
    const [copyCompras, setCopyCompras] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [copyVendas, setCopyVendas] = useState([]);
    const [total, setTotal] = useState([]);
    var saldo = 0
    useEffect(() => {
        buscarProdutos()
        buscarModelos()
        buscarVeiculos()
        buscarCompras();
        buscarVendas();
    }, []);

    const buscarCompras = async () => {
        const results = await APIGlobal.getCompras();
        setCompras(results)
        setCopyCompras(results)
    };

    const buscarVendas = async () => {
        const results = await APIGlobal.getVendas();
        setVendas(results)
        setCopyVendas(results)

    };
    const buscarProdutos = async () => {
        const results = await APIGlobal.getProdutos();
        Cache.setCache("produtos", results)

    };

    const buscarModelos = async () => {
        const results = await APIGlobal.getModelos();
        Cache.setCache("modelos", results)
    };


    const buscarVeiculos = async () => {
        const results = await APIGlobal.getVeiculos();
        Cache.setCache("veiculos", results)
    };
    useEffect(() => {
        calcularSaldo();
    });

    const calcularSaldo = () => {
        let total = 0
        for (var i in vendas) {
            total += vendas[i].valor
        }
        for (var j in compras) {
            total -= compras[j].valor
        }

        setTotal(total)
    }
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Buscar apenas data, ex: 2021-12-30"
                            type="text"
                            fullWidth
                            onChange={
                                event => {
                                    let value = event.target.value.toString().toUpperCase()
                                    if (value.length > 0) {

                                        setCompras(copyCompras.filter(function (i, n) {
                                            let it = i.data_compra.toString().toUpperCase().indexOf(value) > -1
                                            if (i.data_compra.toString().toUpperCase().indexOf(value) > -1) {
                                                saldo += i.valor
                                            }

                                            return it
                                        }))

                                        setVendas(copyVendas.filter(function (i, n) {
                                            let it = i.data_venda.toString().toUpperCase().indexOf(value) > -1
                                            if (i.data_venda.toString().toUpperCase().indexOf(value) > -1) {
                                                saldo += i.valor
                                            }

                                            return it

                                        }))

                                    }
                                    else {
                                        setCompras(copyCompras)
                                    }
                                }
                            }
                        />
                    }
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {
                        <h1>Total: {total}</h1>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={4}>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h3>Compras</h3>
                </Grid>
                {
                    compras.map((i) => {
                        let veiculos = JSON.parse(localStorage.getItem("veiculos"))
                        let modelos = JSON.parse(localStorage.getItem("modelos"))
                        let id_veiculo = JSON.parse(localStorage.getItem("produtos"))[i.id_produto].id_veiculo
                        let id_modelo = veiculos[id_veiculo].id_modelo
                        return (<Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={modelos[id_modelo].modelo + " - " + veiculos[id_veiculo].placa + " - " + i.data_compra}
                                subtitulo={'R$' + i.valor}
                            />
                        </Grid>)
                    })
                }
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h3>Vendas</h3>
                </Grid>
                {
                    vendas.map((i) => {
                        let veiculos = JSON.parse(localStorage.getItem("veiculos"))
                        let modelos = JSON.parse(localStorage.getItem("modelos"))
                        let id_veiculo = JSON.parse(localStorage.getItem("produtos"))[i.id_produto].id_veiculo
                        let id_modelo = veiculos[id_veiculo].id_modelo
                        return (<Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={modelos[id_modelo].modelo + " - " + veiculos[id_veiculo].placa + " - " + i.data_venda}
                                subtitulo={'R$' + i.valor}
                            />
                        </Grid>)
                    })
                }
            </Grid>
        </>
    );
}

export default Fluxo;