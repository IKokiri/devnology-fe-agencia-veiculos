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

function Cliente() {

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
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
        const obj = {
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email
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
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
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
        setNome(obj.nome)
        setSobrenome(obj.sobrenome)
        setEmail(obj.email)
        setId(obj.id)
    }


    const limparCampos = () => {
        setId('')
        setNome('')
        setSobrenome('')
        setEmail('')

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
                                    let value = event.target.value.toUpperCase()

                                    if (value.length > 0) {
                                        setItems(copyItems.filter(function (i, n) {
                                            return i.nome.toUpperCase().indexOf(value) > -1
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={event => setNome(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sobrenome"
                        label="Sobrenome"
                        type="text"
                        fullWidth
                        value={sobrenome}
                        onChange={event => setSobrenome(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sobrenome"
                        label="Email"
                        type="text"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
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
                        subtitulo='Clientes'
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
                                titulo={i.nome}
                                subtitulo='Clientes'
                            />
                        </Grid>
                    })
                }
            </Grid>
        </>
    );
}

export default Cliente;