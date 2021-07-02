import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import EditarIcon from '@material-ui/icons/CreateOutlined';
import RemoverIcon from '@material-ui/icons/DeleteOutlined';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alerta from '../../components/Alerta/Alerta'
import { Validacao } from '../../Validacao/Validacao'

function Marca() {

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);

    const [marca, setMarca] = useState('');
    const [id, setId] = useState('');
    /**
     * Alert
     */
    const [message, setMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [textPri, setTextPri] = useState('');
    const [textSec, setTextSec] = useState('');

    useEffect(() => {
        buscarTodos();
    }, []);

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)
    };

    const remover = (id) => {
        deletar(id)
        limparCampos()
    }

    const deletar = async (id) => {
        await API.delete(id)
        buscarTodos()
    };

    const create = async () => {

        let valid = Validacao.obrigatorio(marca)
        if (!valid) {
            alert("Preencha todos os campos")
            return false
        }

        const obj = {
            "marca": marca
        }

        await API.create(obj)
        positivo('Criado com sucesso!')

    };


    const positivo = (msg) => {
        buscarTodos()
        limparCampos()
        setMessage(true)
        setAlertMessage(msg)
        setTextPri('Fechar')
        setOpen(false);
    }

    const update = async () => {

        limparCampos()

        const obj = {
            "id": id,
            "marca": marca
        }

        await API.update(obj)

        positivo('Alterado com sucesso')
       
    };

    const buscarUm = async (id) => {
        const obj = await API.getId(id)
        return obj;
    };

    /**
     * Local
     */
    const preDelete = (id) => {
        setMessage(true)
        setAlertMessage("Deseja Deletar?")
        setTextPri("Fechar")
        setTextSec("Sim")
        setId(id)
    }

    const preencherCampos = (obj) => {
        setMarca(obj.marca)
        setId(obj.id)
    }


    const limparCampos = () => {
        setMarca('')
        setId('')
        setMessage('')
        setAlertMessage('')
        setTextPri('')
        setTextSec('')
    }

    const salvar = () => {
        !id ? create() : update()
    }

    const removerAlert = () => {
        setMessage(false)
        limparCampos()
    }
    /**
     * Modal
     */
    const [open, setOpen] = React.useState(false);

    const addItem = () => {
        setOpen(true);
    };

    const editItem = async (id) => {

        let obj = await buscarUm(id);
        preencherCampos(obj)
        setOpen(true);
    };
    const handleClose = () => {
        limparCampos()
        setOpen(false);
    };

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Buscar apenas marca, ex: chevrolet"
                            type="text"
                            fullWidth
                            onChange={
                                event => setMarca(() => {

                                    let value = event.target.value.toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.marca.toUpperCase().indexOf(value) > -1
                                        }))
                                    }
                                    else {
                                        setItems(copyItems)
                                    }
                                })
                            }
                        />
                    }
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    {
                        message === true ? <Alerta
                            funcPri={() => removerAlert()}
                            funcSec={() => remover(id)}
                            textPri={textPri}
                            textSec={textSec}
                            alertMessage={alertMessage}
                        /> : ""
                    }
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registro</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="marca"
                        label="Marca"
                        type="text"
                        fullWidth
                        value={marca}
                        onChange={event => setMarca(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Sair
                    </Button>
                    <Button onClick={salvar} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={4}>

                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Cartao
                        color="#2194f3"
                        iconPrincipal={<AddIcon />}
                        funcPri={() => addItem()}
                        titulo="Adicionar"
                        subtitulo='Marcas'
                    />
                </Grid>
                {
                    items.map((i) => {
                        return <Grid key={i.id} item xs={12} sm={6} md={6} lg={4}>
                            <Cartao
                                key={i.id}
                                iconPrincipal={<EditarIcon />}
                                iconSecundario={<RemoverIcon />}
                                funcPri={() => editItem(i.id)}
                                funcSec={() => preDelete(i.id)}
                                titulo={i.marca}
                                subtitulo='Marcas'
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Marca;