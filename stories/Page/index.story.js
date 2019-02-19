import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import * as examples from './examples';
import UXStorySections from '../UXStorySections';
import ExampleGeneralLayoutRaw from '!raw-loader!./ExampleGeneralLayout';
import processLive from './processLiveCode';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });
export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    ...UXStorySections({
      description: `
Page Layout is a composition of: Page, Page.Header Grid and Card.
All business manager applications should have it as it's top most component.`,
      includedComponents: [
        { name: 'Page', description: 'Business Manager’s root component' },
        { name: 'Page.Header', description: '`<Page/>` component’s child' },
        { name: 'Grid', description: 'Component that constructs a grid' },
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
    code({
      source: processLive(ExampleGeneralLayoutRaw),
    }),
  ],
};
