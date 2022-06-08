import {
  Hint,
  HintBody,
  HintTitle,
  Page,
  PageSection,
  Title,
  Grid,
  GridItem,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  Flex,
  FlexItem,
} from "@patternfly/react-core";
import * as React from "react";

import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import TimesCircleIcon from "@patternfly/react-icons/dist/esm/icons/times-circle-icon";

import {
  VirtualizedTable,
  useK8sWatchResource,
  K8sResourceCommon,
  TableData,
  RowProps,
  ResourceLink,
  TableColumn,
  ListPageBody,
} from "@openshift-console/dynamic-plugin-sdk";

const mysqlGVK = {
  group: "databases.example.com",
  version: "v1alpha1",
  kind: "MariaDB",
};

const columns: TableColumn<K8sResourceCommon>[] = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Namespace",
    id: "namespace",
  },
];

const PodRow: React.FC<RowProps<K8sResourceCommon>> = ({
  obj,
  activeColumnIDs,
}) => {
  return (
    <>
      <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          groupVersionKind={mysqlGVK}
          name={obj.metadata.name}
          namespace={obj.metadata.namespace}
        />
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

const MyTable: React.FC<PodsTableProps> = ({
  data,
  unfilteredData,
  loaded,
  loadError,
}) => {
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

export const Dashboard: React.FC<{ title: string }> = ({ title }) => {
  const [dbs, loaded, loadError] = useK8sWatchResource<K8sResourceCommon[]>({
    groupVersionKind: mysqlGVK,
    isList: true,
    namespaced: true,
  });

  console.log(dbs);
  console.log(loadError);

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
        <Hint>
          <HintTitle>Welcome</HintTitle>
          <HintBody>List of deployed Databases</HintBody>
        </Hint>
      </PageSection>

      <PageSection>
        <DataList aria-label="Simple data list example">
          <DataListItem aria-labelledby="simple-item1">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex direction={{ default: "column" }}>
                      <FlexItem>
                        <p>database 0</p>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CheckCircleIcon /> 0
                        </FlexItem>
                        <FlexItem>
                          <ExclamationTriangleIcon /> 9
                        </FlexItem>
                        <FlexItem>
                          <TimesCircleIcon /> 2
                        </FlexItem>
                        <FlexItem>Updated 16 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListCell key="secondary content">off</DataListCell>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem aria-labelledby="simple-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex direction={{ default: "column" }}>
                      <FlexItem>
                        <p>database 1</p>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CheckCircleIcon /> 10
                        </FlexItem>
                        <FlexItem>
                          <ExclamationTriangleIcon /> 0
                        </FlexItem>
                        <FlexItem>
                          <TimesCircleIcon /> 1
                        </FlexItem>
                        <FlexItem>Updated 0 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListCell key="secondary content">
                    <p>Username: user</p>
                    <p>Password: false</p>
                  </DataListCell>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
          <DataListItem id="inline-modifier-item2">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="primary content">
                    <Flex direction={{ default: "column" }}>
                      <FlexItem>
                        <p>database 2</p>
                      </FlexItem>
                      <Flex>
                        <FlexItem>
                          <CheckCircleIcon /> 7
                        </FlexItem>
                        <FlexItem>
                          <ExclamationTriangleIcon /> 5
                        </FlexItem>
                        <FlexItem>
                          <TimesCircleIcon /> 5
                        </FlexItem>
                        <FlexItem>Updated 2 days ago</FlexItem>
                      </Flex>
                    </Flex>
                  </DataListCell>,
                  <DataListCell key="secondary content">
                    <p>Username: root</p>
                    <p>Password: false</p>
                  </DataListCell>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        </DataList>
      </PageSection>

      <PageSection>
        <Grid>
          <GridItem span={6}>
            <Card>
              <CardTitle>Header</CardTitle>
              <CardBody>Body</CardBody>
              <CardFooter>Footer</CardFooter>
            </Card>
          </GridItem>
          <GridItem span={6}>
            <Card>
              <CardTitle>Header</CardTitle>
              <CardBody pf-u-font-size-4xl>4xl text</CardBody>
              <CardFooter>Footer</CardFooter>
            </Card>
          </GridItem>
          <GridItem span={12}>
            <Card>
              <CardTitle>Databases deployed</CardTitle>
              <CardBody>
                <ListPageBody>
                  <MyTable
                    data={dbs}
                    unfilteredData={dbs}
                    loaded={loaded}
                    loadError={loadError}
                  />
                </ListPageBody>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </Page>
  );
};

export default Dashboard;
