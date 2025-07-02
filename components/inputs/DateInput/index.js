import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";

const DateInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    ...props 
    }) => {

    return (
       <MDInput
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            type="date"
            value={value}
            onChange={onChange}
            sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                    height: "100%",
                },
                width: props.width || "150px",
            }}
            {...props}
        />
    );
};

export default DateInput;