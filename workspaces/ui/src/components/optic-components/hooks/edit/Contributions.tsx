import React, { useContext, useState } from 'react';
import { IShapeRenderer } from '../../shapes/ShapeRenderInterfaces';
import { RfcContext } from '../../../../contexts/RfcContext';

export const ContributionEditContext = React.createContext({});

type ContributionEditContextValue = {
  isEditing: boolean;
  save: () => void;
  pendingCount: number;
  setEditing: (boolean) => void;
  stagePendingContribution: (
    id: string,
    contributionKey: string,
    value: string
  ) => void;
  lookupContribution: (
    id: string,
    contributionKey: string
  ) => string | undefined;
};

interface IContribution {
  id: string;
  contributionKey: string;
  value: string;
}

export const ContributionEditingStore = (props: any) => {
  //replace with spectacle
  const { cachedQueryResults } = useContext(RfcContext);
  const { contributions } = cachedQueryResults;
  /////////////////////////////////////////

  const [isEditing, setIsEditing] = useState(false);
  const [pendingContributions, setPendingContributions]: [
    IContribution[],
    any
  ] = useState([]);

  const stagePendingContribution = (
    id: string,
    contributionKey: string,
    value: string
  ) => {
    setPendingContributions((current) => {
      const items = [...current] as IContribution[];
      // remove previous changes for same id/key
      return [
        ...items.filter(
          (previous) =>
            previous.id !== id && previous.contributionKey !== contributionKey
        ),
        {
          id,
          contributionKey,
          value,
        },
      ];
    });
  };

  const value: ContributionEditContextValue = {
    isEditing,
    save: () => {},
    pendingCount: pendingContributions.length,
    setEditing: (bool) => setIsEditing(bool),
    stagePendingContribution,
    lookupContribution: (id, contributionKey) => {
      return contributions.getOrUndefined(id, contributionKey);
    },
  };

  return (
    <ContributionEditContext.Provider value={value}>
      {props.children}
    </ContributionEditContext.Provider>
  );
};

export function useContributionEditing() {
  return useContext(ContributionEditContext) as ContributionEditContextValue;
}
