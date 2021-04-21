import * as fs from 'fs';
import * as path from 'path';
import Tap from 'tap';
import { makeSpectacle } from '../src';
import * as OpticEngine from '@useoptic/diff-engine-wasm/engine/build';
import { InMemoryOpticContextBuilder } from '../src/in-memory';

// Getting the previous batch commit ID is manual and error prone
// This function automates that step
function fromPreviousBatchCommitId(name: string, file: string) {
  const events: any = loadEvents(file);

  let previousBatchCommitId;
  let lastBatchCommitId = null;

  for (const event of events) {
    if ('BatchCommitStarted' in event) {
      previousBatchCommitId = lastBatchCommitId;
      lastBatchCommitId = event.BatchCommitStarted.batchId;
    }
  }

  return {
    name,
    events,
    sinceBatchCommitId: previousBatchCommitId,
  };
}

function loadEvents(file: string) {
  return JSON.parse(fs.readFileSync(file).toString('utf-8'));
}

const specs = [
  {
    name: 'add new endpoint',
    events: loadEvents('./test/specs/add-new-endpoint.json'),
    sinceBatchCommitId: null,
  },
  fromPreviousBatchCommitId(
    'add optional response field',
    './test/specs/add-optional-res-field.json',
  ),
  fromPreviousBatchCommitId(
    'add required response field',
    './test/specs/add-required-res-field.json',
  ),
  fromPreviousBatchCommitId(
    'add response status code',
    './test/specs/add-res-status-code.json',
  ),
  fromPreviousBatchCommitId(
    'update optional response field',
    './test/specs/update-optional-res-field.json',
  ),
  fromPreviousBatchCommitId(
    'add endpoint to existing spec',
    './test/specs/add-endpoint-to-existing-spec.json',
  ),
  // Use an existing spec but pick last batch commit
  {
    name: 'no changes',
    events: loadEvents('./test/specs/add-endpoint-to-existing-spec.json'),
    sinceBatchCommitId: '42355178-d7d7-4510-a261-bf7f579d71a3',
  },
  fromPreviousBatchCommitId('complex changes', './test/specs/complex.json'),
];

Tap.test('spectacle batchCommits query', async (test) => {
  const opticContext = await InMemoryOpticContextBuilder.fromEvents(
    OpticEngine,
    [],
  );
  const spectacle = await makeSpectacle(opticContext);

  const results = await spectacle({
    query: `{
        batchCommits {
          createdAt
          batchId
        }
      }`,
    variables: {},
  });
  test.matchSnapshot(results);
});

specs.forEach(async (spec) => {
  const opticContext = await InMemoryOpticContextBuilder.fromEvents(
    OpticEngine,
    spec.events,
  );
  const spectacle = await makeSpectacle(opticContext);

  Tap.test(`spectacle changelog query ${spec.name}`, async (test) => {
    const query = `{
      endpointChanges(sinceBatchCommitId: "${spec.sinceBatchCommitId || ''}") {
        endpoints {
          change {
            category
          }
          path
          method
        }
      }
    }`;

    const results = await spectacle({ query, variables: {} });
    test.matchSnapshot(results);
  });

  Tap.test(`spectacle shapeChoices query ${spec.name}`, async (test) => {
    const shapeId = 'shape_jSAthS01Bb';
    const query = `{
      shapeChoices(shapeId: "${shapeId}") {
        id
        jsonType
        asArray {
          changes(sinceBatchCommitId: "${spec.sinceBatchCommitId || ''}") {
            added
            changed
          }
        }
        asObject {
          fields {
            shapeId
            fieldId
            name
            changes(sinceBatchCommitId: "${spec.sinceBatchCommitId || ''}") {
              added
              changed
            }
          }
        }
      }
    }`;
    const results = await spectacle({ query, variables: {} });
    test.matchSnapshot(results);
  });
});
