import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function Cartao(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ backgroundColor: props.color }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.titulo}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.subtitulo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={props.funcPri}>
          {props.iconPrincipal}
        </Button>

        <Button
          size="small"
          onClick={props.funcSec}
        >
          {props.iconSecundario}
        </Button>
      </CardActions>
    </Card>
  );
}
