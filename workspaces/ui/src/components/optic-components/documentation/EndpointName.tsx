import React, { useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import padLeft from 'pad-left';
import { methodColorsDark } from '../../../theme.js';
import {
  ListItem,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
export type EndpointNameProps = {
  method: string;
  fullPath: string;
  fontSize?: number;
  leftPad?: number;
};

export function EndpointName({
  method,
  fullPath,
  fontSize = 13,
  leftPad = 10,
}: EndpointNameProps) {
  const classes = useStyles();

  const paddedMethod = padLeft(method, leftPad, ' ');

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.method}
        style={{ color: methodColorsDark[method.toUpperCase()], fontSize }}
      >
        {paddedMethod.toUpperCase()}
      </div>
      <div className={classes.fullPath} style={{ fontSize }}>
        {fullPath}
      </div>
    </div>
  );
}

export type EndpointRowProps = {
  method: string;
  purpose?: string;
  fullPath: string;
  onClick: () => void;
};

export function EndpointRow({
  method,
  fullPath,
  purpose,
  onClick,
}: EndpointRowProps) {
  const classes = useStyles();
  return (
    <ListItem button disableRipple disableGutters style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <EndpointName method={method} fullPath={fullPath} leftPad={4} />
      </div>
      <div style={{ paddingRight: 15 }}>
        <Typography className={classes.endpointName}>{purpose}</Typography>
      </div>
    </ListItem>
  );
}

const useStyles = makeStyles((theme) => ({
  method: {
    whiteSpace: 'pre',
    fontFamily: 'Ubuntu Mono',
  },
  endpointName: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Ubuntu',
    pointerEvents: 'none',
    color: '#2a2f45',
  },
  fullPath: {
    fontFamily: 'Ubuntu Mono',
    marginLeft: 7,
    color: '#697386',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
  },
}));
