import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function HCompra() {


    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);
    const [totalCompras, setTotalCompras] = useState(0);

    var total = 0;

    useEffect(() => {
        buscarTodos();
    }, []);

    useEffect(() => {
        somarCompras();
    });
    const somarCompras = () => {
        let total = 0
        for (var i in items) {
            total += items[i].valor
        }

        setTotalCompras(total)
    }

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)

    };

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

                                        setItems(copyItems.filter(function (i, n) {
                                            let it = i.data_compra.toString().toUpperCase().indexOf(value) > -1
                                            if (i.data_compra.toString().toUpperCase().indexOf(value) > -1) {
                                                total += i.valor
                                            }
                                            setTotalCompras(total)
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
                        <h1>Total em compras: {totalCompras}</h1>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                {
                    items.map((i) => {
                        return (<Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={i.id_produto + " - " + i.data_compra}
                                subtitulo={'R$' + i.valor}
                            />
                        </Grid>)
                    })
                }
            </Grid>
        </>
    );
}

export default HCompra;