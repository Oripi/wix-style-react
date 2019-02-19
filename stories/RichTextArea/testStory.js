/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings } from './storySettings';
import { simple } from './examples';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

const kind = getTestStoryKind({
  storyName: storySettings.storyName,
  category: storySettings.indexCategory,
});

const TestContainer = ({ children }) => (
  <div
    data-hook={storySettings.dataHook}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
  >
    {children}
  </div>
);

storiesOf(kind, module).add('AAA', () => (
  <TestContainer>
    <LiveCodeExample compact initialCode={simple} />
  </TestContainer>
));
