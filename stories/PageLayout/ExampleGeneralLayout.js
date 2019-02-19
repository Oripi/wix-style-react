import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import { Add } from 'wix-style-react/new-icons';

import { Breadcrumbs } from 'wix-style-react/Breadcrumbs';
import { Row, Col, Container } from 'wix-style-react/Grid';

class ExampleGeneralLayout extends React.Component {
  render() {
    const ActionBar = props => {
      return (
        <Button withNewIcons prefixIcon={<Add />}>
          New Item
        </Button>
      );
    };

    return (
      <div style={{ height: '372px' }}>
        <Page upgrade {...this.props}>
          <Page.Header
            title="Page Title"
            breadcrumbs={
              <Breadcrumbs
                items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
                activeId="3"
                size="medium"
                theme="onGrayBackground"
                onClick={() => {}}
              />
            }
            actionsBar={<ActionBar />}
          />
          <Page.Content>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Header title="Card Title" />
                    <Card.Content>
                      <div style={{ height: '550px' }} />
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Page.Content>
        </Page>
      </div>
    );
  }
}

export default ExampleGeneralLayout;
