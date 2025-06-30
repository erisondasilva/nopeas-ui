import { ServiceApi } from "commons/enums/ServiceApi";

export const userConfig = {
    entityName: "Usuário",
    entityNamePlural: "Usuários",
    api: ServiceApi.auth.USERS.path,
    deletable: true,
    fields: [
        { Header: "Nome", name: "realName", type:"text", required: true , editable: false},
        { label: "Usuário", name: "username", type: "text", required: true, editable: true },
        { label: "Perfil", name: "roleIds", multiple:true, required: true, editable: true,
            type: "rest-select", apiPath: ServiceApi.auth.ROLES.path
         },
        { label: "Senha", name: "password", type: "password", required: true, editable: true },
        { label: "Inativo", name: "active", type: "boolean", required: false, editable: true },
    ],
    columns: [
        { Header: "Nome", accessor: "realName", width: "30%" },
        { Header: "Usuário", accessor: "username", width: "30%" },
        { Header: "Perfil", accessor: "roles", width: "30%" },
        { Header: "Estado", accessor: "active", width: "10%" },
    ],

    mapRowData: (item) => ({
        ...item,
        roles: JSON.stringify(item.roles.map(role => role.name)),
        active: item.active ? 'Ativo' : 'Inativo',
    }),
};