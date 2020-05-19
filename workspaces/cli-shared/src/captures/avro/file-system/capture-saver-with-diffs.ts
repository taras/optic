import {
  developerDebugLogger,
  FileSystemAvroCaptureSaver,
} from '../../../index';
import { IGroupingIdentifiers, IHttpInteraction } from '@useoptic/domain-types';
import { IFileSystemCaptureLoaderConfig } from './capture-loader';
import { ISpecService } from '@useoptic/cli-client/build/spec-service-client';
import {
  diffFromRfcStateAndInteractions,
  rfcStateFromEvents,
} from '@useoptic/domain-utilities';
import { DiffHelpers, opticEngine } from '@useoptic/domain';
import * as fs from 'fs-extra';
import * as path from 'path';
import { IApiCliConfig, parseIgnore } from '@useoptic/cli-config';

export class CaptureSaverWithDiffs extends FileSystemAvroCaptureSaver {
  private rfcState!: any;

  constructor(
    config: IFileSystemCaptureLoaderConfig,
    private cliConfig: IApiCliConfig,
    private specServiceClient: ISpecService
  ) {
    super(config);
  }

  async init() {
    //@GOTCHA: if the user updates the spec while the capture is live, the diff data will potentially be inaccurate
    const eventsString = await this.specServiceClient.listEvents();
    const events = JSON.parse(eventsString);
    const rfcState = rfcStateFromEvents(events);
    this.rfcState = rfcState;
    developerDebugLogger('built initial spec for diffing on the fly');
    await super.init();
  }

  async onBatch(
    groupingIdentifiers: IGroupingIdentifiers,
    batchId: string,
    items: IHttpInteraction[],
    outputDirectory: string
  ): Promise<void> {
    const result = super.onBatch(
      groupingIdentifiers,
      batchId,
      items,
      outputDirectory
    );
    //@TODO: create an endpoint within spec-router that has similar logic but takes the spec and interactions as inputs
    const filter = parseIgnore(this.cliConfig.ignoreRequests || []);
    const filteredItems = items.filter(
      (x) => !filter.shouldIgnore(x.request.method, x.request.path)
    );
    const diffs = diffFromRfcStateAndInteractions(this.rfcState, items);
    const distinctDiffCount = DiffHelpers.distinctDiffCount(diffs);
    const diffsAsJs = opticEngine.DiffJsonSerializer.toJs(diffs);
    developerDebugLogger({ distinctDiffCount });
    await fs.writeJson(
      path.join(outputDirectory, `interactions-${batchId}.json`),
      {
        interactionsCount: filteredItems.length,
        totalInteractionsCount: items.length,
        diffsCount: distinctDiffCount,
        createdAt: new Date().toISOString(),
      }
    );
    await fs.writeJson(
      path.join(outputDirectory, `diffs-${batchId}.json`),
      diffsAsJs
    );
    return result;
  }
}