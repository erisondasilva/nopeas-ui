import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";

const PhoneInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    placeholder = "(XX)xXXXX-XXXX",
    ...props 
}) => {
    const formatPhoneNumber = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        
        // Apply mask based on length
        if (digits.length <= 2) {
            return `(${digits}`;
        } else if (digits.length <= 6) {
            return `(${digits.slice(0, 2)})${digits.slice(2)}`;
        } else if (digits.length <= 10) {
            return `(${digits.slice(0, 2)})${digits.slice(2, 6)}-${digits.slice(6)}`;
        } else {
            return `(${digits.slice(0, 2)})${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
        }
    };

    const validatePhone = (value) => {
        const phoneRegex = /^\([0-9]{2}\)[0-9]{4,5}-[0-9]{4}$/;
        return phoneRegex.test(value);
    };

    const handleChange = (e) => {
        const rawValue = e.target?.value || "";
        const formattedValue = formatPhoneNumber(rawValue);
        onChange(name, formattedValue);
    };

    const isValid = !value || validatePhone(value);

    return (
        <MDInput
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            type="tel"
            pattern="\([0-9]{2}\)[0-9]{4,5}-[0-9]{4}"
            placeholder={placeholder}
            value={value || ''}
            error={!isValid}
            helperText={!isValid ? "Formato Inválido. Use (XX)XXXXX-XXXX ou (XX)XXXX-XXXX" : ""}
            onChange={handleChange}
            inputProps={{
                maxLength: 15,
            }}
            sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                    height: "100%",
                },
                width: props.width || "180px",
            }}
            {...props}
        />
    );
};

export default PhoneInput;