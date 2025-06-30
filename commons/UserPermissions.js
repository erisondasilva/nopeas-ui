
export const hasRole = (role) => {
  const roles = JSON.parse(localStorage.getItem('roles')) || [];
  return roles.includes(role);
};

export const hasPermission = (permission) => {
  try {
    const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
    return permissions.includes(permission);
  } catch (e) {
    console.error("Error parsing permissions", e);
    return false;
  }
};

export const hasAnyOfPermissions = (permissions) => {
  try {
    const storedPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
    return permissions.some(permission => storedPermissions.includes(permission));
  } catch (e) {
    console.error("Error parsing permissions", e);
    return false;
  }
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

export const getUserRealName = () => {
  return getUser()?.realName ? getUser()?.realName : getUser()?.username;
}

export default {
  hasRole,
  hasPermission, hasAnyOfPermissions,
  getUser, getUserRealName,
};
