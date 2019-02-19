export const importExample = `
import FormField from 'wix-style-react/FormField';
import RichTextArea from 'wix-style-react/RichTextArea'
`;

export const simple = `
<RichTextArea />
`;

export const composition = `
<FormField label="Editor" infoContent="I help you to fill text">
  <RichTextArea />
</FormField>
`;

export const richText = `
<RichTextArea value="<p><strong>Bold</strong></p><p><em>Italic</em></p><p><u>Underline</u></p><p><a href='https://github.com/wix/wix-style-react'>Click here</a></p>" />
`;
