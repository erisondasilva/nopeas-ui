import React from 'react';

import MDBox from "shared-ui/components/md/MDBox";
import MDTypography from "shared-ui/components/md/MDTypography";
import MDButton from "shared-ui/components/md/MDButton";
import Icon from "@mui/material/Icon";
import DataTable from "shared-ui/components/DataTable";

function EditorData({ 
    title, subtitle,
    registerConfig, 
    tableRows = {rows: []}, 
    handleEditClick, 
    handleAddClick,
    editLabel = "Editar",
    addLabel = "NOVO",
    }) {

    const prepareTableData = () => {
        const hasEditAction = !!handleEditClick;
        
        // Prepare columns
        const columns = hasEditAction 
            ? [
                ...registerConfig.columns,
                {
                    Header: "Ações",
                    accessor: "actions",
                    align: "center",
                },
            ]
            : registerConfig.columns;

        // Prepare rows
        const rows = hasEditAction
            ? (tableRows.rows || []).map((row) => ({
                ...row,
                actions: (
                    <MDButton
                        size="small"
                        color="secondary"
                        onClick={() => handleEditClick(row)}
                    >
                        {editLabel}
                    </MDButton>
                ),
            }))
            : (tableRows.rows || []);

        return { columns, rows };
    };

    const tableData = prepareTableData();

    return (
        <MDBox>
            <MDBox pt={3} px={3} display="flex" justifyContent="space-between">
                <MDBox>
                    <MDTypography variant="h5" fontWeight="medium">
                        {title}
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="light"  color="secondary">
                        {subtitle}
                    </MDTypography>
                </MDBox>
                {handleAddClick && (
                    <MDBox py={1}>
                        <MDButton size="medium" color="success" onClick={handleAddClick}>
                            <Icon fontSize="small">add</Icon>
                            {addLabel? addLabel : "Adicionar"}
                        </MDButton>
                    </MDBox>
                )}
            </MDBox>
            <DataTable
                canSearch={(registerConfig.table && registerConfig.table.canSearch !== undefined) ?
                    registerConfig.table.canSearch : true}
                table={tableData}
            />
        </MDBox>
    );
};

export default EditorData;

