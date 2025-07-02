import React, { useState, useEffect } from 'react';

import Grid from "@mui/material/Grid";

import MDBox from "shared-ui/components/md/MDBox";
import MDButton from "shared-ui/components/md/MDButton";

import axiosInstance from "shared-ui/commons/axiosInstance";
import { FieldRenderer } from 'shared-ui/commons/FieldRenderer';

function EditorForm({ 
        registerConfig, 
        entityId, 
        presetFormData,
        handleBackClick, setError, setSuccess, 
        updateCallback, deleteCallback,
        renderFields,
    }) {
    const [localFormData, setLocalFormData] = useState({});

    useEffect(() => {
        setSuccess && setSuccess(null);
        setError && setError(null);

        if (entityId && registerConfig.api) {
            // Fetch entity data from API
            const fetchEntityData = async () => {
                try {
                    const response = await axiosInstance.get(`${registerConfig.api}/${entityId}`);

                    let updatedData = { ...response.data };
                    if (presetFormData) {
                        updatedData = { ...updatedData, ...presetFormData };
                    }

                    setLocalFormData(updatedData);
                } catch (error) {
                    console.error("Error fetching entity data:", error);
                }
            };
            fetchEntityData();
        } else {
            let updatedData = {};
            registerConfig.fields.forEach((field) => {
                if (field.default) {
                    updatedData = { ...updatedData, [field.name]: field.default };
                }
            });
            
            if (presetFormData) {
                updatedData = { ...updatedData, ...presetFormData };
            }
            
            setLocalFormData(updatedData);
        }
    }, [entityId, registerConfig.api]);

    useEffect(() => {
    }, [presetFormData]);

    const handleFieldChange = (fieldName, value) => {
        const updatedData = { ...localFormData, [fieldName]: value};
        setLocalFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess && setSuccess(null);
        setSuccess && setError(null);
        try {
            let response;
            if (entityId) {
                response = await axiosInstance.put(`${registerConfig.api}/${entityId}`, localFormData);
            } else {
                response = await axiosInstance.post(`${registerConfig.api}`, localFormData);
            }

            // Reset formData after successful submission
            setLocalFormData(registerConfig.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
            
            updateCallback && updateCallback(response.data);
            handleBackClick && handleBackClick(true);
            setSuccess && setSuccess(`Registro salvo com sucesso!`);
        } catch (error) {
            console.error("Error saving data:", error.response?.data);
            if(setError) {
                if(error?.response?.data && error?.response?.data?.error) {
                    setError(error.response.data.error);
                } else {
                    setError("Erro ao salvar os dados. Tente novamente.");
                }
            }
        }
    };

    const handleDelete = async () => {
        if (!entityId) return;

        const confirmDelete = window.confirm(`Tem certeza que quer remover este registro?`);
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`${registerConfig.api}/${entityId}`);

            deleteCallback && deleteCallback();
            handleBackClick && handleBackClick(true);
            setSuccess && setSuccess(`Registro removido com sucesso!`);
        } catch (error) {
            console.error("Error deleting entity:", error);
            setError && setError("Não foi possível remover o registro. Tente novamente.");
        }
    };

    return (
       <MDBox >
            <form onSubmit={handleSubmit}>
                <MDBox py={3} px={3}>
                    <Grid container spacing={3}>
                        {renderFields ? (
                            <>
                            {(renderFields)({
                                registerConfig: registerConfig,
                                localFormData: localFormData,
                                handleFieldChange: handleFieldChange,
                                entityId: entityId,
                            })}
                            </>
                        ):(
                            <>
                            {registerConfig.fields.map((field, index) => (
                                <>
                                <Grid item xs={field.xs? field.xs : 6} key={index}>
                                    {FieldRenderer.renderField(
                                        field,
                                        localFormData[field.name],
                                        handleFieldChange,
                                        !!entityId,
                                        registerConfig.customFieldRenderer
                                    )}
                                </Grid>
                                {field.breakline && (
                                    <Grid item xs={6} key={`breakline-${index}`}></Grid>
                                )}
                                </>
                            ))}
                            </>
                        )}
                    </Grid>
                </MDBox>
                <MDBox>
                    <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
                        <Grid item xs={3}>
                            {registerConfig.deletable && entityId && (
                                <MDButton
                                    variant="gradient"
                                    color="error"
                                    size="small"
                                    onClick={handleDelete}
                                >
                                    DELETE
                                </MDButton>
                            )}
                        </Grid>
                        <Grid item xs={9}>
                             <MDBox display="flex" justifyContent="flex-end" px={3} gap={2}>
                                {handleBackClick && (
                                    <MDButton size="small" color="secondary" onClick={handleBackClick} >
                                        CANCELAR
                                    </MDButton>
                                )}
                                <MDButton type="submit" variant="gradient" color="success" size="small">
                                    SALVAR
                                </MDButton>
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </form>
        </MDBox>
    );
}

export default EditorForm;

