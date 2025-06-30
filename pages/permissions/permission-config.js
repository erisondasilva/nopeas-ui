import { ServiceApi } from "commons/enums/ServiceApi";

export const permissionConfig = {
    entityName: "Permissão",
    entityNamePlural: "Permissões",
    api: ServiceApi.auth.PERMISSIONS.path,
    deletable: true,
    fields: [
        { label: "Name", name: "name", type: "text", required: true, editable: true },
        { label: "Description", name: "description", type: "textarea", required: false, editable: true },
    ],
    columns: [
        { Header: "Name", accessor: "name", width: "30%" },
        { Header: "Description", accessor: "description", width: "30%"},
    ],

    mapRowData: (item) => ({
        ...item,
    }),
};