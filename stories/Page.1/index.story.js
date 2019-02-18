import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';
import UXStorySections from '../UXStorySections';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), code({ source })],
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  sections: [
    ...UXStorySections({
      description: `Page Layout is a composition of 4 different components: Page, Grid, Page.Header and Card.
    All business manager applications should start with this setup and the rest of components are built on top.`,
      includedComponents: [
        { name: 'Page', description: 'Business Manager’s root component' },
        { name: 'Page.Header', description: '<Page /> component’s child' },
        { name: 'Layout', description: 'Component that constructs a grid' },
        { name: 'Card', description: 'Light card component' },
        {
          name: 'EmptyState',
          description: 'Component that render Empty state layout',
        },
      ],
      importExample: examples.importExample,
    }),
    description({ text: '## Examples' }),
    columns({
      items: [
        description({
          pretitle: '2.1.A',
          title: 'General Layout',
          description: 'A classic layout for forms and lists',
        }),
        description({}),
      ],
    }),
    code({ source: examples.sizes }),
  ],
};
