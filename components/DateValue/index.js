import React from 'react';

function DateValue({ dateValue, isDeadline = false }) {
    
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let color = "text";
    if(isDeadline) {
        if (dateValue === todayStr || dateValue === tomorrowStr) {
            color = "warning";
        } else if (dateValue < todayStr) {
            color = "error";
        }
    }
    
    const formatDateForDisplay = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            {formatDateForDisplay(dateValue)}
        </>
    );
}

export default DateValue;

