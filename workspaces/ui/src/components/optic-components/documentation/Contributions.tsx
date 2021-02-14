import React, { useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Paper, TextField } from '@material-ui/core';
import { IShapeRenderer } from '../shapes/ShapeRenderInterfaces';
import { RenderRootShape, ShapeRowBase } from '../shapes/ShapeRowBase';
import { ShapeRenderStore } from '../shapes/ShapeRenderContext';
import { ChoiceTabs } from '../shapes/OneOfTabs';
import { useContributionGroup } from './ContributionGroup';
import { useDebounce } from '../../setup-page/useDebounceHook.js';

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

  const debouncedDescription = useDebounce(description, 1500);

  useEffect(() => {
    if (debouncedDescription) {
      updateDescription(description);
    }
  }, [debouncedDescription]);

  return (
    <div className={classes.container} style={{ paddingLeft: depth * 14 }}>
      <div className={classes.topRow}>
        <span className={classes.keyName}>{name}</span>
        <span className={classes.shape}>{summarizeTypes(shapes)}</span>
      </div>
      {isEditing ? (
        <TextField
          inputProps={{ className: classes.description }}
          fullWidth
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
    borderTop: '1px solid #e2e2e2',
  },
  keyName: {
    color: '#3c4257',
    fontWeight: 600,
    fontSize: 13,
    fontFamily: 'Ubuntu Mono',
  },
  description: {
    fontFamily: 'Ubuntu',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.8,
    color: '#4f566b',
  },
  shape: {
    marginLeft: 5,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    color: '#8792a2',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 6,
  },
}));
