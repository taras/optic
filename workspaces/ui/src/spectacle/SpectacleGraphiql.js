import React, { useState, useContext, useEffect } from 'react';
import { RfcContext } from '../contexts/RfcContext';
import Graphiql from 'graphiql';

export function SpectacleGraphiql() {
  const rfcContext = useContext(RfcContext);
  const [spectacle, setSpectacle] = useState(null);
  console.log(rfcContext);
  const { eventStore, rfcId } = rfcContext;
  useEffect(() => {
    const events = JSON.parse(eventStore.serializeEvents(rfcId));
    let task = async () => {
      const { makeSpectacle } = await import('./main.ts');
      const spectacle = makeSpectacle({ specEvents: events });
      global._spectacle = spectacle;
      debugger;
      //@GOTCHA: useState treats function arguments differently
      setSpectacle(() => spectacle);
    };

    task();
  }, []);

  console.log(spectacle);
  debugger;
  if (!spectacle) {
    return <div>loading...</div>;
  }
  //spectacle({ query: `query {endpoints{httpMethod}}` });
  return (
    <div style={{ height: '100vh' }}>
      <Graphiql
        fetcher={(graphQlParameters) => {
          console.log(graphQlParameters);
          console.log(spectacle, global._spectacle);
          return spectacle(graphQlParameters);
        }}
        // schema={buildSchema(schema)}
      />
    </div>
  );
}
