import React from 'react';

import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";
import MDInput from "shared-ui/components/md/MDInput";
import FileDropzone from 'shared-ui/components/inputs/FileDropzone';
import CurrencyInput from 'shared-ui/components/inputs/CurrencyInput';
import PhoneInput from 'shared-ui/components/inputs/PhoneInput';
import EmailInput from 'shared-ui/components/inputs/EmailInput';
import CpfInput from 'shared-ui/components/inputs/CpfInput';
import CnpjInput from 'shared-ui/components/inputs/CnpjInput';
import SwitchInput from 'shared-ui/components/inputs/SwitchInput';
import RestDataSelect from 'shared-ui/components/selects/RestDataSelect';
import PermissionsDataSelect from 'shared-ui/components/selects/PermissionsDataSelect';
import DateInput from 'shared-ui/components/inputs/DateInput';

/**
 * FieldRenderer - Utility class for rendering form fields based on configuration
 * 
 * @param {Object} field - Field configuration object
 * @param {Object} currenValue - Current set value for the field (eg. from the form data)
 * @param {Function} handleFieldChange - Function to handle field value changes
 * @param {boolean} isEdit - Whether this is an edit mode (optional, default false)
 * @param {Object} customFieldRenderer - Optional custom field renderer for specific field types
 * @param {Object} filter - Optional filter object for select fields eg. { area: 'SOMEAREA' }
 */
export const FieldRenderer = {

    renderField: (field, currentValue, handleFieldChange, isEdit = false, customFieldRenderer, filter) => {

        const fieldValue = field.type === "boolean" 
            ? null
            : (currentValue ? currentValue 
                : (field.default || (field.multiple ? [] : "")));
        
        const isEditable = field.editable !== undefined ? field.editable : true;
        
        switch (field.type) {
            case "text":
            case "number":
            case "password":
                return (
                    <MDInput
                        label={field.label}
                        name={field.name}
                        required={field.required && !(isEdit && field.type === "password")}
                        disabled={isEdit && !isEditable}
                        type={field.type}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.name, e.target?.value || "")}
                        inputProps={{
                            maxLength: field.maxLength || (field.type === "number" ? 10 : field.type === "password" ? 50 : 200)
                        }}
                        sx={{
                            width: field.width || "100%",
                        }}
                    />
                );

            case "textarea":
                return (
                    <MDInput
                        label={field.label}
                        name={field.name}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        multiline
                        rows={field.rows || 4}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.name, e.target?.value || "")}
                        inputProps={{
                            maxLength: field.maxLength || 250
                        }}
                        sx={{
                            width: field.width || "100%",
                        }}
                    />
                );

            case "date":
                return (
                    <DateInput
                        label={field.label}
                        name={field.name}
                        required={field.required && !isEdit}
                        disabled={isEdit && !isEditable}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.name, e.target?.value || "")}
                        width={field.width || null}
                    />
                );

            case "currency":
                return (
                    <CurrencyInput
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        required={field.required && !isEdit}
                        disabled={isEdit && !isEditable}
                        width={field.width || null}
                    />
                );

            case "tel":
                return (
                    <PhoneInput
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        width={field.width}
                    />
                );

            case "email":
                return (
                    <EmailInput
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        width={field.width || "100%"}
                    />
                );

            case "cpf":
                return (
                    <CpfInput
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        width={field.width}
                    />
                );

            case "cnpj":
                return (
                    <CnpjInput
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        onChange={handleFieldChange}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        width={field.width}
                    />
                );    
            case "file":
                return (
                    <MDBox mt={-2}>
                        <MDBox ml={1.5}>
                            <MDTypography variant="caption" color="secondary">
                                {field.label}
                            </MDTypography>
                        </MDBox>    
                        <MDBox mt={-1}>
                            <FileDropzone
                                acceptedTypes={field.acceptedTypes || "images"}
                                uploadFolder={field.uploadFolder}
                                uploadUrl={field.uploadUrl}
                                onUpload={(fileOrUrl) => {
                                    console.log("File uploaded:", fileOrUrl);
                                    handleFieldChange(field.name, fileOrUrl);
                                }} 
                                currentValue={fieldValue}
                            />
                        </MDBox>
                    </MDBox>
                );

            case "select":
                return (
                    <MDInput
                        select
                        label={field.label}
                        name={field.name}
                        value={fieldValue}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        onChange={(e) => handleFieldChange(field.name, e.target?.value || "")}
                        sx={{
                            height: "40px",
                            "& .MuiInputBase-root": {
                                height: "100%",
                            },
                            width: field.width || "100%",
                        }}
                    >
                        {field.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </MDInput>
                );

            case "boolean":
                const booleanValue = currentValue !== undefined 
                    ? currentValue
                    : (field.default !== undefined ? field.default : false);
                    
                return (
                    <SwitchInput
                        label={field.label}
                        name={field.name}
                        value={booleanValue}
                        onChange={handleFieldChange}
                        disabled={isEdit && !isEditable}
                        defaultValue={field.default}
                    />
                );

            case "rest-select":
                return (
                    <RestDataSelect
                        name={field.name}
                        label={field.label}
                        apiPath={field.apiPath}
                        multiple={field.multiple}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        setSelected={handleFieldChange}
                        selected={fieldValue}
                        fieldLabel={field.fieldLabel}
                        width={field.width || "100%"}
                        checkbox={field.checkbox}
                        filter={filter || {}}
                    />
                );

            case "permissions-select":
                return (
                    <PermissionsDataSelect
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        disabled={isEdit && !isEditable}
                        setSelected={handleFieldChange}
                        selected={fieldValue}
                        filter={filter || {}}
                    />
                );

            case "display-only":
                return (
                    <MDBox>
                        <MDTypography variant="caption" color="secondary">
                            {field.label}
                        </MDTypography>
                        <MDTypography variant="body2">
                            {fieldValue || '-'}
                        </MDTypography>
                    </MDBox>
                );

            default:
                if (customFieldRenderer) {
                    return customFieldRenderer.renderField(field, currentValue, handleFieldChange, isEdit, filter);
                }

                console.warn(`Unknown field type: ${field.type}. Consider adding it to CustomFieldRenderer`);
                return (
                    <MDBox>
                        <MDTypography variant="body2" color="error">
                            Unknown field type: {field.type}.
                        </MDTypography>
                    </MDBox>
                );
        }
    }
};

export default FieldRenderer;