import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

export function CenteredColumn(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.centered}>
      <Container maxWidth="md" style={props.style}>
        {props.children}
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 14,
  },
}));
