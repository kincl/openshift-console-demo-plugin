import {
  Hint,
  HintBody,
  HintTitle,
  Page,
  PageSection,
  Stack,
  Title
} from "@patternfly/react-core";
import * as React from "react";

import {
  VirtualizedTable,
  useK8sWatchResource,
  K8sResourceCommon,
  TableData,
  RowProps,
  ResourceLink,
  TableColumn,
  ListPageBody,
} from '@openshift-console/dynamic-plugin-sdk';

const columns: TableColumn<K8sResourceCommon>[] = [
  {
    title: 'Name',
    id: 'name',
  },
  {
    title: 'Namespace',
    id: 'namespace',
  },
  {
    title: 'Replicas',
    id: 'replicas',
  },
];

const PodRow: React.FC<RowProps<K8sResourceCommon>> = ({ obj, activeColumnIDs }) => {
  return (
    <>
      <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Database" name={obj.metadata.name} namespace={obj.metadata.namespace} />
      </TableData>
      <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Namespace" name={obj.metadata.namespace} />
      </TableData>
    </>
  );
};

type PodsTableProps = {
  data: K8sResourceCommon[];
  unfilteredData: K8sResourceCommon[];
  loaded: boolean;
  loadError: any;
};

const MyTable: React.FC<PodsTableProps> = ({ data, unfilteredData, loaded, loadError }) => {
  return (
    <VirtualizedTable<K8sResourceCommon>
      data={data}
      unfilteredData={unfilteredData}
      loaded={loaded}
      loadError={loadError}
      columns={columns}
      Row={PodRow}
    />
  );
};

export const MyLandingPage: React.FC<{ title: string }> = ({ title }) => {

  const [dbs, loaded, loadError] = useK8sWatchResource<K8sResourceCommon[]>({
    groupVersionKind: {
      group: 'databases.example.com',
      version: 'v1alpha1',
      kind: 'MariaDB',
    },
    isList: true,
    namespaced: true,
  });

  return (
    <Page
      additionalGroupedContent={
        <PageSection variant="light">
          <Title headingLevel="h1">{title}</Title>
        </PageSection>
      }
      groupProps={{ sticky: "top" }}
    >
      <PageSection>
        <Stack hasGutter>
          <Hint>
            <HintTitle>Welcome</HintTitle>
            <HintBody>
              List of deployed Databases
            </HintBody>
          </Hint>

          <ListPageBody>
            <MyTable
              data={dbs}
              unfilteredData={dbs}
              loaded={loaded}
              loadError={loadError}
            />
          </ListPageBody>
        </Stack>
      </PageSection>
    </Page>
  );
};

export default MyLandingPage;
