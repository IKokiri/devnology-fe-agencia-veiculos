import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { APIGlobal } from '../../API/API'
import { Cache } from '../../API/Cache'

function Comissao() {

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);
    const [totalComissoes, setTotalComissoes] = useState(0);

    useEffect(() => {
        buscarFuncionarios()
        buscarTodos();
    }, []);

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)
    };

    const buscarFuncionarios = async () => {
        const results = await APIGlobal.getFuncionarios()
        Cache.setCache("funcionarios", results)

    };

    useEffect(() => {
        somarComissoes();
    });
    const somarComissoes = () => {
        let total = 0
        for (var i in items) {
            total += items[i].comissao
        }

        setTotalComissoes(total)
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
                                    let value = event.target.value.toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.comissao.toString().toUpperCase().indexOf(value) > -1
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
                        <h1>Total em comissões: {totalComissoes}</h1>
                    }
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                {

                    items.map((i) => {
                        let funcionarios = JSON.parse(localStorage.getItem("funcionarios"))

                        return <Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                titulo={funcionarios[i.id_funcionario].nome}
                                subtitulo={i.id_venda + " - " + i.comissao}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Comissao;