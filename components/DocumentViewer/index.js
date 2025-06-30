import MDBox from 'shared-ui/components/md/MDBox';
import React from 'react';

const DocumentViewer = ({documentUrl}) => {
  return (
    <MDBox sx={{ width: '100%', height: '600px' }}>
      <iframe
        src={documentUrl}
        width="100%"
        height="100%"
        title="Document Viewer"
        style={{ border: 'none' }}
      />
    </MDBox>
  );
};

export default DocumentViewer;