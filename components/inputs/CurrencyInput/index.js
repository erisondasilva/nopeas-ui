import React from 'react';
import MDInput from "shared-ui/components/md/MDInput";
import MDTypography from "shared-ui/components/md/MDTypography";
import { InputAdornment } from '@mui/material';

const CurrencyInput = ({ 
    label, 
    name, 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    placeholder = "0,00",
    ...props 
}) => {
    const formatCurrency = (value) => {
        // Handle empty or null values
        if (!value && value !== 0) return '';
        
        // If it's already a string with digits, use it; otherwise convert to string
        const stringValue = typeof value === 'string' ? value : value.toString();
        
        // Remove all non-digits
        const digits = stringValue.replace(/\D/g, '');
        
        if (digits === '') return '';
        
        // Convert to number and divide by 100 to get decimal places
        const numericValue = parseInt(digits) / 100;
        
        // Format with Brazilian currency format
        return numericValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const getCurrencyDisplayValue = () => {
        if (!value && value !== 0) return '';
        // Convert stored decimal back to display format
        const decimalValue = parseFloat(value) || 0;
        const cents = Math.round(decimalValue * 100);
        return formatCurrency(cents.toString());
    };

    const handleChange = (e) => {
        const inputValue = e.target?.value || "";
        // Extract only digits from what user typed
        const digits = inputValue.replace(/\D/g, '');
        
        if (digits === '') {
            onChange(name, '');
            return;
        }
        
        // Convert to decimal value (divide by 100)
        const decimalValue = (parseInt(digits) / 100).toFixed(2);
        onChange(name, decimalValue);
    };

    return (
        <MDInput
            label={label}
            name={name}
            required={required}
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            value={getCurrencyDisplayValue()}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <MDTypography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            R$
                        </MDTypography>
                    </InputAdornment>
                ),
            }}
            inputProps={{
                maxLength: 20,
            }}
            sx={{
                height: "40px",
                "& .MuiInputBase-root": {
                    height: "100%",
                },
                width: props.width || "200px",
            }}
            {...props}
        />
    );
};

export default CurrencyInput;