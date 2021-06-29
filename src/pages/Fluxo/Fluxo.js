import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { APIGlobal } from '../../API/API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function Fluxo() {


    const [compras, setCompras] = useState([]);
    const [copyCompras, setCopyCompras] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [copyVendas, setCopyVendas] = useState([]);
    const [total, setTotal] = useState([]);
    var saldo = 0
    useEffect(() => {
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
                            label="BUSCAR"
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
                        return (<Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={i.id_produto + " - " + i.data_compra}
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
                        return (<Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={i.id_produto + " - " + i.data_venda}
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