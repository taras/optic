import React, { useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import padLeft from 'pad-left';
import { methodColorsDark } from '../../../theme.js';
export type EndpointNameProps = {
  method: string;
  fullPath: string;
  fontSize?: number;
};

export function EndpointName({
  method,
  fullPath,
  fontSize = 13,
}: EndpointNameProps) {
  const classes = useStyles();

  const paddedMethod = padLeft(method, 10, ' ');

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

const useStyles = makeStyles((theme) => ({
  method: {
    whiteSpace: 'pre',
    fontFamily: 'Ubuntu Mono',
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
