import { newRegionPreview, testCase } from './fixture';

test('empty spec produced no body diffs', async () => {
  const universe = await testCase('empty-todo')('universe');
  const diffs = universe.diffSet.groupedByEndpointAndShapeTrail();
  expect(diffs.length).toBe(0);
});

test('spec with paths, and new bodies', async () => {
  const universe = await testCase('simple-todo')('partial-universe');
  const diffs = universe.diffSet.newRegions().groupedByEndpoint();

  expect(diffs).toMatchSnapshot();
});

test('new request body has correct commands', async () => {
  const universe = await testCase('simple-todo')('partial-universe');
  const diffs = universe.diffSet.newRegions().iterator();

  const diffService = await universe.universe.opticContext.diffRepository.findById(
    '123'
  );

  const preview = await newRegionPreview(
    diffs.find((i) => i.diffHash === '41bb570841f9d23b')!,
    diffService,
    universe.universe
  );

  expect(preview).toMatchSnapshot();
});
//
test('new response body has correct commands', async () => {
  const universe = await testCase('simple-todo')('partial-universe');
  const diffs = universe.diffSet.newRegions().iterator();

  const diffService = await universe.universe.opticContext.diffRepository.findById(
    '123'
  );

  console.log(diffs[0]);
  const preview = await newRegionPreview(
    diffs.find((i) => i.diffHash === '2d42a681976a8151')!,
    diffService,
    universe.universe
  );

  expect(preview).toMatchSnapshot();
});
