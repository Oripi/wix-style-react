import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  columns,
  liveCode as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

const liveCode = config =>
  baseCode({
    components: { ...baseScope },
    ...config,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  sections: [
    columns({
      items: [
        description({
          text: 'A text area can be used to allow for extended user input.',
        }),
        description(),
      ],
    }),

    columns({
      items: [
        table({
          title: 'Included Components',
          rows: [
            [
              <LinkTo
                kind="Components"
                story="FormField"
              >{`<FormField/>`}</LinkTo>,
              'Layout component for form elements',
            ],
            [
              <LinkTo
                kind="Components"
                story="InputArea"
              >{`<InputArea/>`}</LinkTo>,
              'Component that receives data',
            ],
          ],
        }),
        description(),
      ],
    }),

    columns({
      items: [importExample({ source: examples.importExample }), description()],
    }),

    description({
      text: '## Examples',
    }),

    columns({
      items: [
        description({
          title: 'Plain Example',
          text: 'Default text area setup.',
        }),
        liveCode({ compact: true, source: examples.basicExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Char Limit',
          text:
            'This component allows to limit number of characters can be inserted.',
        }),
        liveCode({ compact: true, source: examples.charLimitExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Resizable Height',
          text: 'It is allowed to make text area resizable.',
        }),
        liveCode({ compact: true, source: examples.resizableHeightExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Label Position',
          text: `Text Area's label can be position on top, left or can be hidden. Additional properties behave accordingly.`,
        }),
        liveCode({ compact: true, source: examples.positionExample }),
      ],
    }),
  ],
};
