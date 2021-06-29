import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function Estoque() {

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);


    useEffect(() => {
        buscarTodos();
    }, []);

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
                                    let value = event.target.value.toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.id_produto.toString().toUpperCase().indexOf(value) > -1
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

            </Grid>
            <Grid container spacing={4}>
                {
                    items.map((i) => {
                        return <Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={i.id_produto}
                                subtitulo='Disponível'
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Estoque;