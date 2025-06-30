import React from 'react';
import { useNavigate } from 'react-router-dom';

import MDTypography from 'shared-ui/components/md/MDTypography';

function NavigateLink({ 
    label, 
    path,  
    variant="body2", 
    color = "#426ff5", 
    fontWeight = "light" }) {

    const navigate = useNavigate();
    
    return (
        <MDTypography variant={variant} fontWeight={fontWeight} 
            onClick={() => navigate(path)}
            sx={{ 
                cursor: "pointer", 
                color: {color} 
            }}>
            {label}
        </MDTypography>
    );
}

export default NavigateLink;

