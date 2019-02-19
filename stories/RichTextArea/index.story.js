import React from 'react';
import {
  description,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';

import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';

export const settings = {
  category: '3. Inputs',
  storyName: '3.3 RichTextArea',
  dataHook: 'storybook-richtextarea',
};

// TODO: Reuse the code below inside a general "StoryPage" component
const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), code({ source })],
  });

export default {
  category: settings.category,
  storyName: settings.storyName,

  sections: [
    code({ source: examples.simple }),
    description({ text: '### Description' }),
    description({
      text: `
Rich text area allows to enter and edit long and complex descriptions.

It supports styled bullet points, hyperlinks, images and more.`,
    }),
    description({ text: '### Included Components' }),
    table({
      rows: [
        [
          <LinkTo kind="Components" story="FormField">{`<FormField/>`}</LinkTo>,
          'Layout component for form elements',
        ],
        [
          // TODO: Fix link
          <LinkTo
            kind="Components"
            story="3.2b + RichTextArea"
          >{`<RichTextArea/>`}</LinkTo>,
          'Component that receives rich data',
        ],
      ],
    }),
    description({ text: '### Import' }),
    importExample({
      source: examples.importExample,
    }),
    description({ text: '## Examples' }),
    ...[
      {
        title: 'Composition with FormField',
        text: 'RichTextArea can be included inside a regular FormField',
        source: examples.composition,
      },
    ].map(example),
  ],
};
