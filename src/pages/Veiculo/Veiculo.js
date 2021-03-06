import React, { useState, useEffect } from 'react';
import Cartao from '../../components/Cartao/Cartao'
import { API } from './API'
import { APIGlobal } from '../../API/API'
import { Cache } from '../../API/Cache'
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

function Veiculo() {

    const classes = useStyles();

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);

    const [marcas, setMarcas] = useState([]);
    const [cachemarcas, setCacheMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    const [id, setId] = useState('');
    const [id_marca, setId_marca] = useState('');
    const [id_modelo, setId_modelo] = useState('');
    const [ano_fabricacao, setAno_fabricacao] = useState('');
    const [placa, setPlaca] = useState('');
    const [cor, setCor] = useState('');
    const [chassi, setChassi] = useState('');

    /**
     * Alert
     */
    const [message, setMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [textPri, setTextPri] = useState('');
    const [textSec, setTextSec] = useState('');

    useEffect(() => {
        buscarMarcas()
        buscarModelos()
        buscarTodos();
    }, []);

    const buscarTodos = async () => {
        const results = await API.get();
        setItems(results)
        setCopyItems(results)
    };

    const buscarMarcas = async () => {
        const results = await APIGlobal.getMarcas();
        setMarcas(results)
        Cache.setCache("marcas",results)
    };
    const buscarModelos = async () => {
        const results = await APIGlobal.getModelos();
        setModelos(results)
        
        Cache.setCache("modelos",results)
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
            "id_marca": id_marca,
            "id_modelo": id_modelo,
            "ano_fabricacao": ano_fabricacao,
            "placa": placa,
            "cor": cor,
            "chassi": chassi
        }

        await API.create(obj)

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
            "id_marca": id_marca,
            "id_modelo": id_modelo,
            "ano_fabricacao": ano_fabricacao,
            "placa": placa,
            "cor": cor,
            "chassi": chassi,
        }

        await API.update(obj)

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
        setId_marca(obj.id_marca)
        setId_modelo(obj.id_modelo)
        setAno_fabricacao(obj.ano_fabricacao)
        setPlaca(obj.placa)
        setCor(obj.cor)
        setChassi(obj.chassi)
        setId(obj.id)
    }

    const limparCampos = () => {
        setId('')
        setId_marca('')
        setId_modelo('')
        setAno_fabricacao('')
        setPlaca('')
        setCor('')
        setChassi('')

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
                            label="Buscar apenas placa, ex: HSJ-8383"
                            type="text"
                            fullWidth
                            onChange={
                                event => {
                                    let value = event.target.value.toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.placa.toUpperCase().indexOf(value) > -1
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
                        <InputLabel id="id_marca-select-label">Marca</InputLabel>
                        <Select
                            labelId="id_marca-label"
                            id="id_marca"
                            value={id_marca}
                            fullWidth
                            onChange={
                                event => {
                                    setId_marca(event.target.value)
                                }
                            }
                        >
                            {
                                marcas.map((m) => {
                                    return <MenuItem key={m.id} value={m.id}>{m.marca}</MenuItem >
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>

                        <InputLabel id="id_modelo-select-label">Modelo</InputLabel>
                        <Select
                            labelId="id_modelo-label"
                            id="id_modelo"
                            value={id_modelo}
                            fullWidth
                            onChange={
                                event => {
                                    setId_modelo(event.target.value)
                                }
                            }
                        >
                            {
                                modelos.map((m) => {
                                    return <MenuItem key={m.id} value={m.id}>{m.modelo}</MenuItem >
                                })
                            }
                        </Select>

                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ano"
                        label="Ano"
                        type="text"
                        fullWidth
                        value={ano_fabricacao}
                        onChange={event => setAno_fabricacao(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="placa"
                        label="Placa"
                        type="text"
                        fullWidth
                        value={placa}
                        onChange={event => setPlaca(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cor"
                        label="Cor"
                        type="text"
                        fullWidth
                        value={cor}
                        onChange={event => setCor(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="chassi"
                        label="Chassi"
                        type="text"
                        fullWidth
                        value={chassi}
                        onChange={event => setChassi(event.target.value)}
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
                        subtitulo='Veiculos'
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
                                titulo={i.placa}
                                subtitulo={JSON.parse(localStorage.getItem("marcas"))[i.id_marca].marca+" - "+
                                JSON.parse(localStorage.getItem("modelos"))[i.id_modelo].modelo+" / "+i.ano_fabricacao}
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Veiculo;