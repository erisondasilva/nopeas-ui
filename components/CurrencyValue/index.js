import MDBox from 'shared-ui/components/md/MDBox';
import MDTypography from 'shared-ui/components/md/MDTypography';
import React from 'react';

function formatCurrencyValue(value) {
    if (value === null || value === undefined || value === '') {
        return '0,00';
    }
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
        return '0,00';
    }
    
    return numValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function CurrencyValue({ value, currency, color = "text" }) {
    
    return (
        <>
            {`${currency? currency : ""} ${formatCurrencyValue(value)}`}
        </>
    );
}

export default CurrencyValue;

