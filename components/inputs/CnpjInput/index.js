import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";

const CnpjInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    placeholder = "00.000.000/0000-00",
    ...props 
}) => {
    const formatCNPJ = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        
        // Apply CNPJ mask: XX.XXX.XXX/XXXX-XX
        if (digits.length <= 2) {
            return digits;
        } else if (digits.length <= 5) {
            return `${digits.slice(0, 2)}.${digits.slice(2)}`;
        } else if (digits.length <= 8) {
            return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
        } else if (digits.length <= 12) {
            return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
        } else {
            return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
        }
    };

    const validateCNPJ = (cnpj) => {
        // Remove formatting
        const cleanCNPJ = cnpj.replace(/\D/g, '');
        
        // Check if has 14 digits
        if (cleanCNPJ.length !== 14) return false;
        
        // Check for known invalid CNPJs
        if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
        
        // Validate first check digit
        let sum = 0;
        let weight = 2;
        for (let i = 11; i >= 0; i--) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }
        let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (checkDigit !== parseInt(cleanCNPJ.charAt(12))) return false;
        
        // Validate second check digit
        sum = 0;
        weight = 2;
        for (let i = 12; i >= 0; i--) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }
        checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return checkDigit === parseInt(cleanCNPJ.charAt(13));
    };

    const handleChange = (e) => {
        const rawValue = e.target?.value || "";
        const formattedValue = formatCNPJ(rawValue);
        onChange(name, formattedValue);
    };

    const isValid = !value || validateCNPJ(value);

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
            helperText={!isValid ? "CNPJ inválido" : ""}
            onChange={handleChange}
            inputProps={{
                maxLength: 18, // XX.XXX.XXX/XXXX-XX
            }}
            sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                    height: "100%",
                },
                width: props.width || "190px",
            }}
            {...props}
        />
    );
};

export default CnpjInput;