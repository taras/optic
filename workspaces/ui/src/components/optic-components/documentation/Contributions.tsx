import React, { useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Paper, TextField, Typography } from '@material-ui/core';
import { IShapeRenderer } from '../shapes/ShapeRenderInterfaces';
import { RenderRootShape, ShapeRowBase } from '../shapes/ShapeRowBase';
import { ShapeRenderStore } from '../shapes/ShapeRenderContext';
import { ChoiceTabs } from '../shapes/OneOfTabs';
import { useContributionGroup } from './ContributionGroup';
import Helmet from 'react-helmet';
import { useDebounce } from '../../setup-page/useDebounceHook.js';
import { useContributionEditing } from '../hooks/edit/Contributions';
import {
  OpticBlueLightened,
  OpticBlueReadable,
  UpdatedBlueBackground,
} from '../../../theme';

export type FieldOrParameterContributionProps = {
  shapes: IShapeRenderer[];
  name: string;
  currentDescription?: string;
  depth: number;
  updateDescription: (string) => void;
};

export function FieldOrParameterContribution({
  name,
  shapes,
  depth,
  currentDescription,
  updateDescription,
}: FieldOrParameterContributionProps) {
  const classes = useStyles();

  const [description, setDescription] = useState(currentDescription || '');

  const { isEditing } = useContributionGroup();

  const debouncedDescription = useDebounce(description, 500);

  useEffect(() => {
    if (debouncedDescription) {
      updateDescription(description);
    }
  }, [debouncedDescription]);

  return (
    <div className={classes.container} style={{ paddingLeft: depth * 14 }}>
      <div className={classes.topRow}>
        <div className={classes.keyName}>{name}</div>
        <div className={classes.shape}>{summarizeTypes(shapes)}</div>
      </div>
      {isEditing ? (
        <TextField
          inputProps={{ className: classes.description }}
          fullWidth
          placeholder={`What is ${name}? How is it used?`}
          multiline
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      ) : (
        <div className={classes.description}>{description}</div>
      )}
    </div>
  );
}

export type EndpointNameContributionProps = {
  id: string;
  contributionKey: string;
  defaultText: string;
  requiredError?: string;
};

export function EndpointNameContribution({
  id,
  contributionKey,
  defaultText,
}: EndpointNameContributionProps) {
  const {
    lookupContribution,
    isEditing,
    stagePendingContribution,
    setEditing,
  } = useContributionEditing();
  const value = lookupContribution(id, contributionKey);
  const classes = useStyles();

  const [stagedValue, setStagedValue] = useState(value || '');

  const debouncedChanges = useDebounce(stagedValue, 1000);

  useEffect(() => {
    if (debouncedChanges && stagedValue !== value) {
      stagePendingContribution(id, contributionKey, debouncedChanges);
    }
  }, [debouncedChanges]);

  const isEmpty = !Boolean(stagedValue.trim());

  const inner = isEditing ? (
    <TextField
      inputProps={{ className: classes.h6 }}
      error={isEmpty}
      helperText={
        isEmpty ? 'Help consumers by naming this endpoint' : undefined
      }
      fullWidth
      placeholder={defaultText}
      value={stagedValue}
      onChange={(e) => {
        setStagedValue(e.target.value);
      }}
    />
  ) : (
    <Typography className={classes.h6}>
      {value ? (
        value
      ) : (
        <span onClick={() => setEditing(true)} className={classes.defaultText}>
          {' '}
          + {defaultText}
        </span>
      )}
    </Typography>
  );

  return (
    <>
      <Helmet>
        <title>{stagedValue || 'Unnamed Endpoint'}</title>
      </Helmet>
      {inner}
    </>
  );
}

function summarizeTypes(shapes: IShapeRenderer[]) {
  if (shapes.length === 1) {
    return shapes[0].jsonType.toString().toLowerCase();
  } else {
    const allShapes = shapes.map((i) => i.jsonType.toString().toLowerCase());
    const last = allShapes.pop();
    return allShapes.join(', ') + ' or ' + last;
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 9,
    paddingLeft: 3,
    borderTop: '1px solid #e4e8ed',
  },
  keyName: {
    color: '#3c4257',
    fontWeight: 600,
    fontSize: 13,
    fontFamily: 'Ubuntu',
  },
  description: {
    fontFamily: 'Ubuntu',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.8,
    color: '#4f566b',
  },
  shape: {
    marginLeft: 6,
    fontFamily: 'Ubuntu Mono',
    fontSize: 12,
    fontWeight: 400,
    color: '#8792a2',
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
  },
  h6: {
    fontSize: '1.25rem',
    fontFamily: 'Ubuntu, Inter',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  defaultText: {
    color: OpticBlueReadable,
    cursor: 'pointer',
  },
}));
