import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";

const CpfInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    placeholder = "000.000.000-00",
    ...props 
}) => {
    const formatCPF = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        
        // Apply CPF mask: XXX.XXX.XXX-XX
        if (digits.length <= 3) {
            return digits;
        } else if (digits.length <= 6) {
            return `${digits.slice(0, 3)}.${digits.slice(3)}`;
        } else if (digits.length <= 9) {
            return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
        } else {
            return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
        }
    };

    const validateCPF = (cpf) => {
        // Remove formatting
        const cleanCPF = cpf.replace(/\D/g, '');
        
        // Check if has 11 digits
        if (cleanCPF.length !== 11) return false;
        
        // Check for known invalid CPFs
        if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
        
        // Validate check digits
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
        }
        let checkDigit = 11 - (sum % 11);
        if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
        if (checkDigit !== parseInt(cleanCPF.charAt(9))) return false;
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
        }
        checkDigit = 11 - (sum % 11);
        if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
        return checkDigit === parseInt(cleanCPF.charAt(10));
    };

    const handleChange = (e) => {
        const rawValue = e.target?.value || "";
        const formattedValue = formatCPF(rawValue);
        onChange(name, formattedValue);
    };

    const isValid = !value || validateCPF(value);

    return (
        <MDInput
            label={label}
            name={name}
            type="text"
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            value={value || ''}
            error={!isValid}
            helperText={!isValid ? "CPF inválido" : ""}
            onChange={handleChange}
            inputProps={{
                maxLength: 14, // XXX.XXX.XXX-XX
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

export default CpfInput;