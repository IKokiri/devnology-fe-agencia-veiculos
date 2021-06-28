import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MarcaIcon from '@material-ui/icons/BrandingWatermark';
import ModeloIcon from '@material-ui/icons/Commute';
import ClienteIcon from '@material-ui/icons/FaceOutlined';
import FuncionarioIcon from '@material-ui/icons/EmojiPeopleOutlined';
import VeiculoIcon from '@material-ui/icons/DriveEtaOutlined';
import ProdutoIcon from '@material-ui/icons/AttachMoney';
import VendaIcon from '@material-ui/icons/ArrowRightAltOutlined';
import CompraIcon from '@material-ui/icons/KeyboardBackspaceOutlined';

import DisponivelIcon from '@material-ui/icons/DriveEta';
import HVendaIcon from '@material-ui/icons/ArrowForward';
import HCompraIcon from '@material-ui/icons/ArrowBack';
import TCompraIcon from '@material-ui/icons/CallReceived';
import TVendaIcon from '@material-ui/icons/CallMade';
import FluxoIcon from '@material-ui/icons/CompareArrows';
import ComissaoIcon from '@material-ui/icons/EmojiEmotions';


import Marca from '../../pages/Marca/Marca'
import Modelo from '../../pages/Modelo/Modelo'
import Cliente from '../../pages/Cliente/Cliente'
import Funcionario from '../../pages/Funcionario/Funcionario'
import Veiculo from '../../pages/Veiculo/Veiculo'
import Produto from '../../pages/Produto/Produto'
import Comprar from '../../pages/Comprar/Comprar'
import Vender from '../../pages/Vender/Vender'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap>
              Devnology - Agência de Veículos
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/marca">
              <ListItemIcon><MarcaIcon /></ListItemIcon>
              <ListItemText primary="Marca" />
            </ListItem>
            <ListItem button component={Link} to="/modelo">
              <ListItemIcon><ModeloIcon /></ListItemIcon>
              <ListItemText primary="Modelo" />
            </ListItem>
            <ListItem button component={Link} to="/cliente">
              <ListItemIcon><ClienteIcon /></ListItemIcon>
              <ListItemText primary="Cliente" />
            </ListItem>
            <ListItem button component={Link} to="/funcionario">
              <ListItemIcon><FuncionarioIcon /></ListItemIcon>
              <ListItemText primary="Funcionario" />
            </ListItem>
            <ListItem button component={Link} to="/veiculo">
              <ListItemIcon><VeiculoIcon /></ListItemIcon>
              <ListItemText primary="Veiculo" />
            </ListItem>
            <ListItem button component={Link} to="/produto">
              <ListItemIcon><ProdutoIcon /></ListItemIcon>
              <ListItemText primary="Produto" />
            </ListItem>
            <ListItem button component={Link} to="/comprar">
              <ListItemIcon><CompraIcon /></ListItemIcon>
              <ListItemText primary="Comprar" />
            </ListItem>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><VendaIcon /></ListItemIcon>
              <ListItemText primary="Vender" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><DisponivelIcon /></ListItemIcon>
              <ListItemText primary="Disponíveis" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><HVendaIcon /></ListItemIcon>
              <ListItemText primary="Histórico Venda" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><HCompraIcon /></ListItemIcon>
              <ListItemText primary="Histórico Compras" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><TCompraIcon /></ListItemIcon>
              <ListItemText primary="Total Compras" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><TVendaIcon /></ListItemIcon>
              <ListItemText primary="Total Vendas" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><FluxoIcon /></ListItemIcon>
              <ListItemText primary="Fluxo" />
            </ListItem>
          </List>
          <List>
            <ListItem button component={Link} to="/vender">
              <ListItemIcon><ComissaoIcon /></ListItemIcon>
              <ListItemText primary="Comissões" />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/marca">
              <Marca />
            </Route>
            <Route path="/modelo">
              <Modelo />
            </Route>
            <Route path="/cliente">
              <Cliente />
            </Route>
            <Route path="/funcionario">
              <Funcionario />
            </Route>
            <Route path="/veiculo">
              <Veiculo />
            </Route>
            <Route path="/produto">
              <Produto />
            </Route>
            <Route path="/comprar">
              <Comprar />
            </Route>
            <Route path="/vender">
              <Vender />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
