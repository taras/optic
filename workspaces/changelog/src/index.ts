import * as DiffEngine from '@useoptic/diff-engine-wasm/engine/build';
import { makeSpectacle } from '@useoptic/spectacle';
import { initial, current } from './data';


export async function generateEndpointChanges(initialEvents: any = [], currentEvents: any): Promise<any> {
  let query;

  // We only need to add a "since" to the query if there are initial events.
  if (initialEvents.length) {
    const initialSpectacle = makeSpectacle(DiffEngine, {
      specEvents: initialEvents
    });

    const batchCommitResults = await initialSpectacle({
      query: `{
        batchCommits {
          createdAt
          batchId
        }
      }`,
      variables: {}
    });

    // TODO: consider making this into a query
    const latestBatchCommit = batchCommitResults.data!.batchCommits!
      .reduce((result: any, batchCommit: any) => {
        return batchCommit.createdAt > result.createdAt ? batchCommit : result;
      });

    query = `{
      endpointChanges(since: "${latestBatchCommit.createdAt}") {
        endpoints {
          change {
            category
          }
          path
          method
        }
      }
    }`;
  } else {
    query = `{
      endpointChanges {
        endpoints {
          change {
            category
          }
          path
          method
        }
      }
    }`;
  }

  const currentSpectacle = makeSpectacle(DiffEngine, {
    specEvents: currentEvents
  });

  return await currentSpectacle({
    query,
    variables: {}
  });
}

// TODO: remove
async function main() {
  const results = await generateEndpointChanges(initial, current);
  console.log(JSON.stringify(results, null, 2));
}

// main();
