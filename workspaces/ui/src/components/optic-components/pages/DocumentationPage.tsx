import React, { useMemo } from 'react';
import { NavigationRoute } from '../navigation/NavigationRoute';
import { useRouterPaths } from '../../../RouterPaths.js';
import groupBy from 'lodash.groupby';
import { CenteredColumn } from '../layouts/CenteredColumn';
import { useEndpoints } from '../hooks/useEndpointsHook';
import { Divider, List, Typography } from '@material-ui/core';
import { EndpointName, EndpointRow } from '../documentation/EndpointName';
import { ContributionEditingStore } from '../hooks/edit/Contributions';
import { EditContributionsButton } from '../hooks/edit/EditContributionsButton';
import { FullWidth } from '../layouts/FullWidth';
import { getEndpointId } from '../../../utilities/EndpointUtilities';
import { EndpointNameContribution } from '../documentation/Contributions';
import { MarkdownBodyContribution } from '../documentation/MarkdownBodyContribution';
import { TwoColumn } from '../documentation/TwoColumn';

export function DocumentationPages(props: any) {
  const routerPaths = useRouterPaths();
  return (
    <ContributionEditingStore>
      <>
        <NavigationRoute
          path={routerPaths.docsRoot}
          Component={DocumentationRootPage}
          AccessoryNavigation={DocsPageAccessoryNavigation}
        />
        <NavigationRoute
          path={routerPaths.requestDocsRoot}
          Component={EndpointRootPage}
          AccessoryNavigation={DocsPageAccessoryNavigation}
        />
      </>
    </ContributionEditingStore>
  );
}

export function DocsPageAccessoryNavigation(props: any) {
  return (
    <>
      <EditContributionsButton />
    </>
  );
}

function DocumentationRootPage(props: any) {
  const endpoints = useEndpoints();

  const grouped = useMemo(() => groupBy(endpoints, 'group'), [endpoints]);
  const tocKeys = Object.keys(grouped).sort();
  return (
    <CenteredColumn maxWidth="md" style={{ marginTop: 35 }}>
      <List dense>
        {tocKeys.map((tocKey) => {
          return (
            <div key={tocKey}>
              <Typography
                variant="subtitle2"
                style={{ fontFamily: 'Ubuntu Mono' }}
              >
                {tocKey}
              </Typography>
              {grouped[tocKey].map((endpoint, index) => {
                return (
                  <EndpointRow
                    key={index}
                    purpose={endpoint.purpose}
                    onClick={() => {}}
                    fullPath={endpoint.fullPath}
                    method={endpoint.method}
                  />
                );
              })}
            </div>
          );
        })}
      </List>
    </CenteredColumn>
  );
}

function EndpointRootPage(props: any) {
  const endpoints = useEndpoints();

  const { match } = props;
  const { pathId, method } = match.params;
  const thisEndpoint = useMemo(
    () => endpoints.find((i) => i.pathId === pathId && i.method === method),
    [pathId, method]
  );
  const endpointId = getEndpointId({ method, pathId });
  return (
    <FullWidth>
      <EndpointNameContribution
        id={endpointId}
        contributionKey="purpose"
        defaultText="What does this endpoint do?"
      />
      <EndpointName
        fontSize={19}
        leftPad={0}
        method={thisEndpoint.method}
        fullPath={thisEndpoint.fullPath}
      />

      <TwoColumn
        style={{ marginTop: 5 }}
        left={
          <MarkdownBodyContribution
            id={endpointId}
            contributionKey={'description'}
            defaultText={'Describe this endpoint'}
          />
        }
        right={<div>HELLO WORLD</div>}
      />
    </FullWidth>
  );
}
