import { AppSettingsAltSharp } from "@mui/icons-material";
import { ServiceApi } from "commons/enums/ServiceApi";

export const roleConfig = {
    entityName: "Perfil De Acesso",
    entityNamePlural: "Perfis de Acesso",
    api: ServiceApi.auth.ROLES.path,
    fields: [
        { label: "Perfil", name: "name", type: "text", editable: false,  },
        { label: "Permissões", name: "permissionIds", type: "rest-select", required: true, editable: true,
            apiPath: ServiceApi.auth.PERMISSIONS.path, checkbox:true, multiple: true,
        },
    ],
    columns: [
        { Header: "Perfil", accessor: "name", width: "30%" },
    ],

    mapRowData: (item) => ({
        ...item,
    }),
};