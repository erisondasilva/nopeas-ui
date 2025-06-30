import React from 'react';
import { Switch } from '@mui/material';
import MDBox from 'shared-ui/components/md/MDBox';
import MDTypography from 'shared-ui/components/md/MDTypography';

function SwitchInput({ 
    label, 
    name, 
    value, 
    onChange, 
    disabled = false,
    defaultValue = false 
}) {
    const booleanValue = value !== undefined ? value : defaultValue;

    return (
        <MDBox gap={2} pl={2} pt={1}>
            <MDTypography variant="button" fontWeight="light">
                {label}
            </MDTypography>
            <Switch 
                checked={booleanValue} 
                disabled={disabled}
                onChange={(e) => onChange(name, e.target.checked)} 
            />
        </MDBox>
    );
}

export default SwitchInput;