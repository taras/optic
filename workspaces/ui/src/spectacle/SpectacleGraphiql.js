import React, { useState, useContext, useEffect } from 'react';
import { RfcContext } from '../contexts/RfcContext';
import Graphiql from 'graphiql';
import { buildSchema } from 'graphql';
import { schema } from './graphql/schema';

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
      global.spectacle = spectacle;
      setSpectacle(spectacle);
    };

    task();
  }, []);

  if (!spectacle) {
    return <div>loading...</div>;
  }
  window.spectacle({ query: `query {endpoints{httpMethod}}` });
  return (
    <div style={{ height: '100vh' }}>
      {/*<Graphiql*/}
      {/*  fetcher={(graphQlParameters) => {*/}
      {/*    console.log(graphQlParameters);*/}

      {/*    return spectacle(graphQlParameters);*/}
      {/*  }}*/}
      {/*  // schema={buildSchema(schema)}*/}
      {/*/>*/}
    </div>
  );
}
