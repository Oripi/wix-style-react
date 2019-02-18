import React from 'react';
import {
  description as baseDescription,
  table,
  importExample as baseImportExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import styles from './styles.scss';

export default ({ description, includedComponents, importExample }) => {
  return [
    columns({
      items: [
        baseDescription({ title: 'Descriptions', text: description }),
        baseDescription(),
      ],
    }),
    columns({
      items: [
        table({
          title: 'Included Components',
          rows: includedComponents.map(component => {
            return [
              [
                <LinkTo kind="Components" story={component.name}>{`<${
                  component.name
                } />`}</LinkTo>,
                component.description,
              ],
            ];
          }),
        }),
        baseDescription(),
      ],
    }),
    baseImportExample({
      source: importExample,
    }),
    description({ text: <div className={styles.divider} /> }),
  ];
};
