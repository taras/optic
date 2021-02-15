import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { OpticBlueLightened, SubtleBlueBackground } from '../../../theme';
import { Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

export type NavButtonProps = {};

export function NavButton(props: NavButtonProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.box}></div>
      <Typography variant="subtitle2" className={classes.font}>
        Docs
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    width: 16,
    height: 16,
    backgroundColor: OpticBlueLightened,
    marginRight: 10,
  },
  font: {
    fontSize: 15,
    fontFamily: 'Ubuntu',
    userSelect: 'none',
  },
  root: {
    display: 'inline-flex',
    height: 25,
    alignItems: 'center',
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
    flexShrink: 1,
    flexBasis: 'auto',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0ebfd',
    },
  },
}));
