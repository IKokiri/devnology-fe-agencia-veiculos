import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import { APIGlobal } from '../../API/API'
import { Cache } from '../../API/Cache'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function Estoque() {

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);


    useEffect(() => {
        buscarProdutos()
        buscarModelos()
        buscarVeiculos()
        buscarTodos();
    }, []);

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
        const results = await APIGlobal.getComissoes();
        Cache.setCache("comissoes", results)
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

                        let veiculos = JSON.parse(localStorage.getItem("veiculos"))
                        let modelos = JSON.parse(localStorage.getItem("modelos"))
                        let id_veiculo = JSON.parse(localStorage.getItem("produtos"))[i.id_produto].id_veiculo
                        let id_modelo  = veiculos[id_veiculo].id_modelo
                        return <Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={modelos[id_modelo].modelo+" - "+veiculos[id_veiculo].placa}
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