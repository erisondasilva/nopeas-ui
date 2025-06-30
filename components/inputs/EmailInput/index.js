import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";

const EmailInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    placeholder = "exemplo@email.com",
    ...props 
}) => {
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleChange = (e) => {
        const inputValue = e.target?.value || "";
        onChange(name, inputValue);
    };

    const isValid = !value || validateEmail(value);

    return (
        <MDInput
            fullWidth
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            placeholder={placeholder}
            value={value || ''}
            error={!isValid}
            helperText={!isValid ? "Favor entrar um email válido." : ""}
            onChange={handleChange}
            sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                    height: "100%",
                },
                width: props.width || "100%",
            }}
            {...props}
        />
    );
};

export default EmailInput;