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
import { useBaseUrl } from '../../../contexts/BaseUrlContext';
import { useHistory } from 'react-router-dom';
import { PathParametersViewEdit } from '../documentation/PathParameters';
import { EndpointTOC } from '../documentation/EndpointTOC';
import { useEndpointBody } from '../hooks/useEndpointBodyHook';
import { CodeBlock } from '../documentation/BodyRender';
import { SubtleBlueBackground } from '../../../theme';

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

  const baseUrl = useBaseUrl();
  const history = useHistory();

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
                    onClick={() =>
                      history.push(
                        `${baseUrl}/documentation/paths/${endpoint.pathId}/methods/${endpoint.method}`
                      )
                    }
                    fullPath={endpoint.fullPath}
                    method={endpoint.method}
                    endpointId={getEndpointId({
                      method: endpoint.method,
                      pathId: endpoint.pathId,
                    })}
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

  const bodies = useEndpointBody(pathId, method);

  const thisEndpoint = useMemo(
    () => endpoints.find((i) => i.pathId === pathId && i.method === method),
    [pathId, method]
  );

  if (!thisEndpoint) {
    return <>no endpoint here</>;
  }

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
        right={
          <CodeBlock
            header={
              <EndpointName
                fontSize={14}
                leftPad={0}
                method={thisEndpoint.method}
                fullPath={thisEndpoint.fullPath}
              />
            }
          >
            <PathParametersViewEdit parameters={thisEndpoint.pathParameters} />
            <div
              style={{
                marginTop: 10,
                backgroundColor: SubtleBlueBackground,
                borderTop: '1px solid #e2e2e2',
              }}
            >
              <EndpointTOC
                requests={bodies.requests}
                responses={bodies.responses}
              />
            </div>
          </CodeBlock>
        }
      />
    </FullWidth>
  );
}
