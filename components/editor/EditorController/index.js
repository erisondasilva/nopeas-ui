import React, {useState, useEffect} from 'react';

import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";

import Card from "@mui/material/Card";
import EditorForm from "shared-ui/components/editor/EditorForm";
import MDAlert from "shared-ui/components/md/MDAlert";
import EditorData from '../EditorData';
import axiosInstance from "shared-ui/commons/axiosInstance";

function EditorController({ registerConfig, subtitle, renderFilter, renderEditorForm, defaultFilterData}) {
    const [tableData, setTableData] = useState({ rows: [] }); 
    const [showEditor, setShowEditor] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [filterData, setFilterData] = useState(defaultFilterData || {});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAddClick = () => {
        setSelectedData(null); 
        setShowEditor(true);
        setSuccess(null);
        setError(null);
    };

    const handleEditClick = (rowData) => {
        setSelectedData(rowData);
        setShowEditor(true);
        setSuccess(null);
        setError(null);
    };

    const handleBackClick = (reload) => {
        setShowEditor(false);
        setSelectedData(null);
        if(reload) {
            reloadTable();
        }
    };
    
    const reloadTable = () => {
        axiosInstance.get(registerConfig.api, { params: filterData })
            .then(response => {
                const rows = response.data.map(item => registerConfig.mapRowData(item));
                setTableData({ rows });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        reloadTable();
    }, [filterData]);

    return (
        <MDBox pt={6} pb={3} >
            <MDBox >
                {error && <MDAlert color="error" fontSize="small" dismissible={true}>{error}</MDAlert>}
                {success && <MDAlert color="success" fontSize="small" dismissible={true}>{success}</MDAlert>}
                
                
                {!showEditor ? (
                    <Card sx={{ p:3 }} >
                        <MDBox pt={3} px={3}>
                            {registerConfig.entityNamePlural && (
                            <MDTypography variant="h5" fontWeight="medium">
                                {registerConfig.entityNamePlural}
                            </MDTypography>
                            )}
                            {subtitle && (
                            <MDTypography variant="button" fontWeight="light"  color="secondary">
                                {subtitle}
                            </MDTypography>
                            )}
                        </MDBox>
                        {renderFilter && (
                            <MDBox mt={2} mx={3}>
                                {(renderFilter)({
                                    filterData: filterData,
                                    setFilterData: setFilterData,
                                })}
                            </MDBox>
                        )}
                        <EditorData
                            registerConfig={registerConfig}
                            tableRows={tableData}
                            handleEditClick={handleEditClick}
                            handleAddClick={handleAddClick}
                        />
                    </Card>
                ) : (
                    <MDBox display="flex" alignItems="center" justifyContent="center">
                        <Card>
                            <MDBox sx={{ p:4, maxWidth: 820 }}>
                                <MDBox ml={2}>
                                    <MDTypography variant="h5" fontWeight="medium">
                                        {selectedData ? `Editar ${registerConfig.entityName}` : `Criar ${registerConfig.entityName}`}
                                    </MDTypography>
                                </MDBox>
                                {renderEditorForm ? (renderEditorForm({
                                        registerConfig,
                                        selectedEntity: selectedData,
                                        handleBackClick: handleBackClick,
                                        setError: setError,
                                        setSuccess: setSuccess,
                                    })
                                ) : (   
                                    <EditorForm
                                        registerConfig={registerConfig}
                                        entityId={selectedData?.id}
                                        handleBackClick={handleBackClick}
                                        setError={setError}
                                        setSuccess={setSuccess}
                                    />
                                )}
                            </MDBox>
                        </Card>
                    </MDBox>
                )}
            </MDBox>
        </MDBox>
    );
};

export default EditorController;

