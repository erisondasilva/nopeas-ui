import React from 'react';
import { useNavigate } from 'react-router-dom';

import MDTypography from 'shared-ui/components/md/MDTypography';

function ActionLink({ 
    label, 
    actionHandler,  
    variant="button", 
    color = "#426ff5", 
    fontWeight = "light" }) {

    const navigate = useNavigate();
    
    return (
        <MDTypography variant={variant} fontWeight={fontWeight} 
            onClick={actionHandler}
            sx={{ 
                cursor: "pointer", 
                color: {color} 
            }}>
            {label}
        </MDTypography>
    );
}

export default ActionLink;

