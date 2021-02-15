import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SubtleBlueBackground } from '../../../theme';
import { Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { NavButton } from './NavButton';

export function TopNavigation(props) {
  const classes = useStyles();
  return (
    <div className={classes.root} key="top-navigation">
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.stacked}>
            <Typography
              className={classes.title}
              variant="subtitle2"
              noWrap
              component="span"
            >
              optic/backend-v1
            </Typography>

            <NavButton />

            <Button size="small">Diffs</Button>
          </div>
          <div className={classes.spacer} />
          <div>{props.controls}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '40px !important',
    minHeight: 'auto !important',
    zIndex: 1000,
    backgroundColor: SubtleBlueBackground,
  },
  toolbar: {
    height: '40px !important',
    minHeight: 'auto !important',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  title: {
    fontSize: 16,
    color: '#4f566b',
  },
  stacked: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spacer: {
    flex: 1,
  },
}));
