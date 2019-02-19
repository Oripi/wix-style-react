import React from 'react';
import {
  tab,
  api,
  code as baseCode,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';
import RichTextArea from 'wix-style-react/RichTextArea';

import { baseScope } from '../utils/Components/LiveCodeExample';
import { storySettings } from './storySettings';
import * as examples from './examples';

const code = config =>
  baseCode({
    components: baseScope,
    ...config,
  });

export default {
  category: storySettings.apiCategory,
  storyName: storySettings.storyName,
  component: RichTextArea,
  componentPath: '../../src/RichTextArea/RichTextArea.js',

  componentProps: setProps => ({
    value: '',
    resizable: false,
    error: false,
    onChange: value => {
      setProps({ value });
    },
  }),
  exampleProps: {
    onChange: value => value,
  },

  sections: [
    tab({
      title: 'Usage',
      sections: [
        importExample({
          title: 'Import',
          source: "import RichTextArea from 'wix-style-react/RichTextArea';",
        }),
        code({
          source: examples.composition,
        }),
      ],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'TestKit',
      sections: [testkit()],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),
  ],
};
