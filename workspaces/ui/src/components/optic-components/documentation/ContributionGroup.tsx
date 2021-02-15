import React, { useContext, useEffect, useRef, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import {
  Button,
  Collapse,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { IShapeRenderer } from '../shapes/ShapeRenderInterfaces';
import { RenderRootShape, ShapeRowBase } from '../shapes/ShapeRowBase';
import { ShapeRenderStore } from '../shapes/ShapeRenderContext';
import { ChoiceSwitch, ChoiceTabs, OneOfTabsProps } from '../shapes/OneOfTabs';
import { DepthStore } from '../shapes/DepthContext';
import { FieldOrParameterContribution } from './Contributions';

export const ContributionGroupContext = React.createContext({});

type ContributionGroupProps = { rootShape: IShapeRenderer[] };

export const ContributionGroup = ({ rootShape }: ContributionGroupProps) => {
  const classes = useStyles();
  const contributions = createFlatList(rootShape);
  const [overrideContributions, setOverrideContributions] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const updateContribution = (key: string, value: string) => {
    setOverrideContributions((i) => ({ ...i, [key]: value }));
  };

  return (
    <ContributionGroupContext.Provider value={{ isEditing }}>
      <DepthStore depth={0}>
        <div className={classes.edit}>
          <Typography variant="h6" style={{ fontSize: 24 }}>
            200 Response
          </Typography>

          <div style={{ flex: 1 }} />
          <ChoiceSwitch
            active={isEditing}
            setActive={() => setIsEditing(!isEditing)}
            label={isEditing ? 'save' : 'edit descriptions'}
          />
        </div>
        <div className={classes.container}>
          {contributions.map((i, index) => {
            const currentDescription =
              overrideContributions[i.contributionId] || i.description;

            const shouldShow = Boolean(currentDescription || isEditing);

            if (!shouldShow) return null;

            return (
              <FieldOrParameterContribution
                depth={i.depth}
                name={i.name}
                shapes={i.shapes}
                currentDescription={currentDescription}
                key={i.contributionId + i.name + index}
                updateDescription={(value) => {
                  updateContribution(i.contributionId, value);
                }}
              />
            );
          })}
        </div>
      </DepthStore>
    </ContributionGroupContext.Provider>
  );
};

export function useContributionGroup(): { isEditing: boolean } {
  //@ts-ignore
  return useContext(ContributionGroupContext);
}

interface IContributions {
  contributionId: string;
  name: string;
  shapes: IShapeRenderer[];
  description: string;
  depth: number;
}

function createFlatList(
  shapes: IShapeRenderer[],
  depth: number = 0
): IContributions[] {
  const contributions = [];

  shapes.forEach((shape) => {
    if (shape.asObject) {
      shape.asObject.fields.forEach((field) => {
        contributions.push({
          name: field.fieldKey,
          depth,
          description: field.description,
          shapes: field.shapeRenderers,
          contributionId: field.fieldId,
        });

        contributions.push(...createFlatList(field.shapeRenderers, depth + 1));
      });
    }
    if (shape.asArray) {
      contributions.push(...createFlatList(shape.asArray.listItem, depth + 1));
    }
  });

  return contributions;
}

const useStyles = makeStyles((theme) => ({
  container: {},
  edit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
}));
