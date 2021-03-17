import * as DiffEngine from '@useoptic/diff-engine-wasm/engine/build';
import { makeSpectacle } from '@useoptic/spectacle';
import { events } from './data';

// TODO: where to put this?
export type EndpointChanges = {
  data: {
    opticUrl: string
    endpoints: {
      change: {
        category: string
      }
      path: string
      method: string
    }[]
  }
}

export async function generateEndpointChanges(initialEvents: any, currentEvents: any): Promise<any> {
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

  // TODO: should handle changes for entire currentEvents
  // This means there are no events. I suppose we could check for that first
  if (batchCommitResults.data!.batchCommits!.length === 0) {
    throw new Error("TODO: handle this");
  }

  const lastBatchId = batchCommitResults.data!.batchCommits!
    .sort((a: any, b: any) => (a.createdAt < b.createdAt) ? 1 : -1)[0].batchId;

  const currentSpectacle = makeSpectacle(DiffEngine, {
    specEvents: currentEvents
  });

  return await currentSpectacle({
    query: `{
  endpointChanges(since: "${lastBatchId}") {
    opticUrl
    endpoints {
      change {
        category
      }
      path
      method
    }
  }
}`,
    variables: {}
  });
}

// TODO: remove
async function main() {
  const results = await generateEndpointChanges(events, events);
  console.log(JSON.stringify(results, null, 2));
}

main();