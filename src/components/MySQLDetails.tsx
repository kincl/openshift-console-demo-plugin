import {
    Card,
    CardBody,
    CardTitle,
    Gallery,
    GalleryItem,
    Page,
    PageSection,
    Stack,
    Title,
  } from "@patternfly/react-core";
  import * as React from "react";

export const MySQLDetails: React.FC<MySQLDetailsPageProps> = (props) => {
    const { name, ns: namespace } = props.match.params;

    return (
        <Page
        additionalGroupedContent={
            <PageSection variant="light">
            <Title headingLevel="h1">MySQL Details {namespace}/{name}</Title>
            </PageSection>
        }
        groupProps={{ sticky: "top" }}
        >
        <PageSection>
            <Stack hasGutter>
            <Gallery hasGutter>
                {new Array(1).fill(0).map((_, index) => (
                <GalleryItem key={index}>
                    <Card>
                    <CardTitle>MySQL Database</CardTitle>
                    <CardBody>
                        <ul>
                            <li>prop</li>
                            <li>prop</li>
                            <li>prop</li>
                            <li>prop</li>
                        </ul>
                    </CardBody>
                    </Card>
                </GalleryItem>
                ))}
            </Gallery>
            </Stack>
        </PageSection>
        </Page>
    );
};

export default MySQLDetails;

export type MySQLDetailsPageProps = {
    match: any;
};
