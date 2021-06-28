import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import { APIGlobal } from '../../API/API'
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '95%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Comprar() {

    const classes = useStyles();

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);

    const [produtos, setProdutos] = useState([]);

    const [id, setId] = useState('');
    const [id_produto, setId_produto] = useState('');
    const [data_compra, setData_compra] = useState('');
    const [valor, setValor] = useState('');
    /**
     * Alert
     */
    const [message, setMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [textPri, setTextPri] = useState('');
    const [textSec, setTextSec] = useState('');

    useEffect(() => {
        buscarTodos();
        buscarProdutos()
    }, []);

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)
    };

    const buscarProdutos = async () => {
        const results = await APIGlobal.getProdutos();
        setProdutos(results)
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
        const obj = {
            "id_produto": id_produto,
            "data_compra": data_compra,
            "valor": valor,
        }

        let result = await API.create(obj)

        buscarTodos()
        limparCampos()

        setMessage(true)

        setAlertMessage('Criado com sucesso!')
        setTextPri('Fechar')


        setOpen(false);
    };

    const update = async () => {

        limparCampos()

        const obj = {
            "id": id,
            "id_produto": id_produto,
            "data_compra": data_compra,
            "valor": valor,
        }

        let result = await API.update(obj)

        setMessage(true)

        setAlertMessage('Alterado com sucesso')
        setTextPri('Fechar')

        buscarTodos()
        setOpen(false);
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
        setId_produto(obj.id_produto)
        setData_compra(obj.data_compra)
        setValor(obj.valor)
        setId(obj.id)
    }

    const limparCampos = () => {
        setId_produto('')
        setData_compra('')
        setValor('')
        setValor('')

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
                            label="BUSCAR"
                            type="text"
                            fullWidth
                            onChange={
                                event => {
                                    let value = event.target.value.toString().toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.data_compra.toString().toUpperCase().indexOf(value) > -1
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

                    <FormControl className={classes.formControl}>
                        <InputLabel id="id_produto-select-label">Produto</InputLabel>
                        <Select
                            labelId="id_produto-label"
                            id="id_produto"
                            value={id_produto}
                            fullWidth
                            onChange={
                                event => {
                                    setId_produto(event.target.value)
                                }
                            }
                        >
                            {
                                produtos.map((m) => {
                                    return <MenuItem value={m.id}>{m.id + " - " + m.valor}</MenuItem >
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="data_compra"
                        label="Data Compra"
                        type="text"
                        fullWidth
                        value={data_compra}
                        onChange={event => setData_compra(event.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="valor"
                        label="Valor"
                        type="text"
                        fullWidth
                        value={valor}
                        onChange={event => setValor(event.target.value)}
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
                        subtitulo='Comprar'
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
                                titulo={i.id_produto+" - "+i.data_compra}
                                subtitulo={'R$' + i.valor}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Comprar;