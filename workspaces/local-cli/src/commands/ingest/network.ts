import { Command } from '@oclif/command';
import {
  LocalTaskSessionWrapper,
  runCommandFlags,
} from '../../shared/local-cli-task-runner';
import readline from 'readline';
import { developerDebugLogger, loadPathsAndConfig } from '@useoptic/cli-shared';
import * as uuid from 'uuid';
import { getCaptureId } from '../../shared/git/git-context-capture';
import { getPathsRelativeToConfig, readApiConfig } from '@useoptic/cli-config';
import { EventEmitter } from 'events';
import { Client, SpecServiceClient } from '@useoptic/cli-client';
import { CaptureSaverWithDiffs } from '@useoptic/cli-shared/build/captures/avro/file-system/capture-saver-with-diffs';
import { ensureDaemonStarted } from '@useoptic/cli-server';
import { lockFilePath } from '../../shared/paths';
import { Config } from '../../config';
import { IHttpInteraction } from '@useoptic/domain-types';
import http from 'http';
/*
Experimental interface to allow traffic to get into capture savers from other sources
 */
/*
{"uuid":"5ac8da3e-a057-4622-ab3e-9ac5305e44a5","request":{"host":"","method":"PATCH","path":"/todos/ie7ocpzr5","query":{"shapeHashV1Base64":null,"asJsonString":null,"asText":null},"headers":{"shapeHashV1Base64":null,"asJsonString":null,"asText":null},"body":{"contentType":"application/json","value":{"shapeHashV1Base64":"CAASCgoEdGFzaxICCAISEAoKYXNzaWduZWRCeRICCAISDQoHZHVlRGF0ZRICCAISDAoGaXNEb25lEgIIBBIICgJpZBICCAI=","asJsonString":null,"asText":null}}},"response":{"statusCode":200,"headers":{"shapeHashV1Base64":null,"asJsonString":null,"asText":null},"body":{"contentType":"application/json","value":{"shapeHashV1Base64":"CAASCgoEdGFzaxICCAISEAoKYXNzaWduZWRCeRICCAISDQoHZHVlRGF0ZRICCAISDAoGaXNEb25lEgIIBBIICgJpZBICCAI=","asJsonString":null,"asText":null}}},"tags":[]}
 */
export default class IngestNetwork extends Command {
  static description = '[do not use] experimental';
  static hidden = true;
  async run() {
    try {
      const paths = await getPathsRelativeToConfig();
      const config = await readApiConfig(paths.configPath);
      const captureId = await getCaptureId(paths);
      /* definitely do this is another promise */
      const daemonState = await ensureDaemonStarted(
        lockFilePath,
        Config.apiBaseUrl
      );
      const apiBaseUrl = `http://localhost:${daemonState.port}/api`;
      developerDebugLogger(`api base url: ${apiBaseUrl}`);
      const cliClient = new Client(apiBaseUrl);
      const cliSession = await cliClient.findSession(paths.cwd, null, null);
      const eventEmitter = new EventEmitter();
      const specServiceClient = new SpecServiceClient(
        cliSession.session.id,
        eventEmitter,
        apiBaseUrl
      );
      const persistenceManager = new CaptureSaverWithDiffs(
        {
          captureBaseDirectory: paths.capturesPath,
          captureId,
          shouldCollectCoverage: false,
          shouldCollectDiffs: false,
        },
        config,
        specServiceClient
      );
      await persistenceManager.init();
      // @TODO select more adequate port or select random available TCP port
      const port = 3030;
      const host = 'localhost';
      // @TODO allow for configuration of a HTTP or UDP server via params
      const server = http.createServer((req, res) => {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          res.writeHead(200);
          res.end();
          const ECS = JSON.parse(data);
          const httpInteraction = IngestNetwork.ecsToHttpInteraction(ECS);
          if (this.isValidHttpInteraction(httpInteraction)) {
            persistenceManager.save(httpInteraction);
          } else {
            developerDebugLogger('Not compatible IHTTPInteraction');
          }
        });
      });
      server.listen(port, host, () => {
        console.log(`OpticHTTPReceiver http://${host}:${port}`);
      });
    } catch (e) {
      console.log('No Optic project found' + e);
      process.exit(1);
    }
  }
  isValidHttpInteraction(json: any): boolean {
    return true;
  }
  static ecsToHttpInteraction(ecs: any): IHttpInteraction {
    const { request, response } = ecs.host;
    const { query, path, domain } = ecs.url;
    return {
      uuid: uuid.v4(),
      request: {
        host: domain,
        method: request.method,
        path,
        query,
        headers: request.headers,
        body: {
          contentType: request.headers['Content-Type'] || null,
          value: request.body.content || null,
        },
      },
      response: {
        statusCode: response.status_code,
        headers: response.headers,
        body: {
          contentType: response.headers['Content-Type'] || null,
          value: response.body.content || null,
        },
      },
      tags: [],
    };
  }
}
