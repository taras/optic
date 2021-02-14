import React, { useContext } from 'react';

export const DepthContext = React.createContext({});

type DepthContextProps = { children: any; depth: number };

export const DepthStore = ({ children, depth }: DepthContextProps) => {
  return (
    <DepthContext.Provider value={depth}>{children}</DepthContext.Provider>
  );
};

export function useDepth() {
  // @ts-ignore
  const depth: number = useContext(DepthContext);
  return {
    depth,
    Indent: ({ children }) => (
      <DepthStore depth={depth + 1}>{children}</DepthStore>
    ),
  };
}
