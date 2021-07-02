import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { APIGlobal } from '../../API/API'
import { Cache } from '../../API/Cache'

function HVenda() {


    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);

    var total = 0;

    useEffect(() => {
        buscarProdutos()
        buscarModelos()
        buscarVeiculos()
        buscarTodos();
    }, []);


    useEffect(() => {
        somarVendas();
    });
    const somarVendas = () => {
        let total = 0
        for (var i in items) {
            total += items[i].valor
        }

        setTotalVendas(total)
    }

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)


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

                                        setItems(copyItems.filter(function (i, n) {
                                            let it = i.data_venda.toString().toUpperCase().indexOf(value) > -1
                                            if (i.data_venda.toString().toUpperCase().indexOf(value) > -1) {
                                                total += i.valor
                                            }
                                            setTotalVendas(total)
                                            return it

                                        }))

                                    }
                                    else {
                                        setItems(copyItems)
                                    }
                                }
                            }
                        />
                    }
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {
                        <h1>Total em vendas: {totalVendas}</h1>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                {
                    items.map((i) => {
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

export default HVenda;