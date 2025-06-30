import { ServiceApi } from "commons/enums/ServiceApi";

export const roleConfig = {
    entityName: "Perfil De Acesso",
    entityNamePlural: "Perfis de Acesso",
    api: ServiceApi.auth.ROLES.path,
    fields: [
        { label: "Perfil", name: "name", type: "text", editable: false,  },
        { label: "Permissões", name: "permissionIds", type: "permissions-select",
            required: false, editable: true },
    ],
    columns: [
        { Header: "Perfil", accessor: "name", width: "30%" },
    ],

    mapRowData: (item) => ({
        ...item,
    }),
};