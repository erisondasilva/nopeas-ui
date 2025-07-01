

import { ServiceApi } from "commons/enums/ServiceApi";


export const roleConfig = {
    entityName: "Perfil De Acesso",
    entityNamePlural: "Perfis de Acesso",
    api: ServiceApi.auth.ROLES.path,

    fields: [
        { label: "Perfil", name: "name", type: "text", editable: false,  width: "320px"  },
        { label: "Permissões", name: "permissionIds", type: "permissions-select", required: false, editable: true,
            apiPath: ServiceApi.auth.PERMISSIONS.path, multiple: true,  width: "320px" 
        },
    ],
    columns: [
        { Header: "Perfil", accessor: "name", width: "30%" },
        { Header: "Permissões", accessor: "permissionIds", width: "70%",
            Cell: ({ value }) => {
                return JSON.stringify(value);
            }
        },
    ],

    mapRowData: (item) => ({
        ...item,
    }),
};