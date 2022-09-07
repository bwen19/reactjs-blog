import * as React from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

// -------------------------------------------------------------------

export default function Edit() {
  const [value, setValue] = React.useState('**Hello world!!!**');
  return (
    <MDEditor
      value={value}
      onChange={(newValue) => setValue(newValue!)}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      height={360}
    />
  );
}
