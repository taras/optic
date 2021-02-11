import { expose } from 'threads/worker';
import {
  opticEngine,
  RfcCommandContext,
  JsonHelper,
  toOption,
} from '@useoptic/domain';
import { universeFromEventsAndAdditionalCommands } from '@useoptic/domain-utilities';

expose({
  handleCommands,
});

function handleCommands(
  commands: any[],
  eventString: string,
  batchId: string,
  clientSessionId: string,
  clientId: string,
  commitMessage: string
): { newEvents: any[]; updatedEvents: any[] } {
  const {
    universeFromEventsAndAdditionalCommands,
  } = require('@useoptic/domain-utilities');

  const {
    StartBatchCommit,
    EndBatchCommit,
  } = opticEngine.com.useoptic.contexts.rfc.Commands;

  const inputCommands = JsonHelper.vectorToJsArray(
    opticEngine.CommandSerialization.fromJs(commands)
  );

  const commandContext = new RfcCommandContext(
    clientId,
    clientSessionId,
    batchId
  );

  const parsedEvents = JSON.parse(eventString);

  const lastStarted = parsedEvents
    .reverse()
    .find((i) => i['BatchCommitStarted']);

  const parentId =
    lastStarted && lastStarted.parentId ? lastStarted.parentId : 'root';

  console.log(parentId);

  const {
    rfcId,
    eventStore,
  } = universeFromEventsAndAdditionalCommands(parsedEvents, commandContext, [
    StartBatchCommit(batchId, commitMessage, toOption(parentId)),
    ...inputCommands,
    EndBatchCommit(batchId),
  ]);

  const parsedNewEvents = JSON.parse(eventStore.serializeEvents(rfcId));

  const onlyNewEvents = parsedNewEvents.slice(parsedEvents.length);

  return {
    newEvents: onlyNewEvents,
    updatedEvents: parsedNewEvents,
  };
}
