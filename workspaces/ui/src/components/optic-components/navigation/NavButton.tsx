import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  LightBlueBackground,
  OpticBlueLightened,
  OpticBlueReadable,
  primary,
  SubtleBlueBackground,
} from '../../../theme';
import { Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

export type NavButtonProps = {
  Icon: React.ElementType;
  title: string;
};

export function NavButton(props: NavButtonProps) {
  const classes = useStyles();
  const { Icon, title } = props;
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Icon className={classes.iconStyles} />
      </div>
      <Typography variant="subtitle2" className={classes.font}>
        {title}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  font: {
    fontSize: 15,
    fontFamily: 'Ubuntu',
    color: OpticBlueReadable,
    fontWeight: 400,
    userSelect: 'none',
  },
  root: {
    display: 'inline-flex',
    height: 25,
    alignItems: 'center',
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexShrink: 1,
    flexBasis: 'auto',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: LightBlueBackground,
    },
  },
  iconStyles: {
    color: OpticBlueReadable,
    width: 15,
    height: 15,
  },
}));
