import * as fs from 'fs';
import { generateEndpointChanges } from '../src';

function loadSpecs(scenario: string) {
  return {
    initialSpec: JSON.parse(fs.readFileSync(`./__tests__/specs/${scenario}/initial.json`).toString()),
    newSpec: JSON.parse(fs.readFileSync(`./__tests__/specs/${scenario}/new.json`).toString()),
  }
}

const scenarios = fs.readdirSync("./__tests__/specs", { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(item => item.name);

describe("Generate Endpoint Changes", () => {
  scenarios.forEach(scenario => {
    test(`Check ${scenario} scenario`, async () => {
      const { initialSpec, newSpec } = loadSpecs(scenario);
      const result = await generateEndpointChanges(initialSpec, newSpec);
      expect(result).toMatchSnapshot();
    });
  });
});