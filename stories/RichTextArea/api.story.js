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

  sections: [
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
