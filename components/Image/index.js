import MDBox from "shared-ui/components/md/MDBox";
import React from "react";
import MDTypography from "shared-ui/components/md/MDTypography";

function Image({
    src, 
    size = "small", 
    showLabel = false, 
    labelPosition = "right"
    }) {
        
    let imgSize = 80;
    if (size === "tiny") imgSize = 40;
    if (size === "medium") imgSize = 150;
    if (size === "large") imgSize = 200;

    const isBottom = labelPosition === "bottom";

    return (
        <MDBox sx={{ display: isBottom ? 'block' : 'flex', alignItems: 'center', gap: 2, textAlign: isBottom ? 'center' : 'left' }}>
            <img src={src}
                alt={src}
                onLoad={e => {
                    const img = e.target;
                    if (img.naturalWidth < imgSize || img.naturalHeight < imgSize) {
                        img.style.width = img.naturalWidth + 'px';
                        img.style.height = img.naturalHeight + 'px';
                    }
                }}
                style={{
                    width: imgSize,
                    height: imgSize,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                    background: '#f8f8f8',
                    boxShadow: '0 2px 8px #0001'
                }}
            />
            {showLabel && !isBottom && (
                <>
                {isBottom ? (
                    <div style={{ marginTop: 2 }}>
                        <MDTypography color="secondary" fontWeight="light" variant="button">
                            {src ? src.split('/').pop() : ''}
                        </MDTypography>
                    </div>
                ) : (
                    <MDTypography color="secondary" fontWeight="light" variant="button">
                        {src ? src.split('/').pop() : ''}
                    </MDTypography>
                )}
                </>
            )}
        </MDBox>
    );
}

export default Image;