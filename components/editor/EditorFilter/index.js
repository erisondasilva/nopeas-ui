import React from 'react';

import MDBox from "shared-ui/components/md/MDBox";
import FieldRenderer from "shared-ui/commons/FieldRenderer";

function EditorFilter({fields, filterData, setFilterData}) {

    const handleFieldChange = (fieldName, value) => {
        const updatedData = { ...filterData, [fieldName]: value};
        setFilterData(updatedData);
    };

    return (
        <>
        {fields && fields.length > 0 && (
             <MDBox gap={2} display="flex" flexWrap="wrap" >
                {fields.map((field, index) => (
                    <>
                    {FieldRenderer.renderField(
                        field,
                        filterData[field.name],
                        {},
                        handleFieldChange,
                    )}
                    </>
                ))}
            </MDBox>
        )}
        </>
    );
};

export default EditorFilter;

