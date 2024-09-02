import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/systemManage/getRoleList',
    method: 'get',
    params
  });
}

/** add role */
export function fetchAddRole(data?: Api.SystemManage.AddRoleData) {
  return request<Api.SystemManage.Role>({
    url: '/systemManage/role',
    method: 'post',
    data
  });
}

/** edit role */
export function fetchEditRole(id: number, data?: Api.SystemManage.EditRoleData) {
  return request<Api.SystemManage.Role>({
    url: `/systemManage/role/${id}`,
    method: 'put',
    data
  });
}

/** remove role */
export function fetchRemoveRole(ids: number[]) {
  return request({
    url: `/systemManage/role`,
    method: 'delete',
    data: { ids }
  });
}
/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/systemManage/getAllRoles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}

/** add user */
export function fetchAddUser(data?: Api.SystemManage.AddUserData) {
  return request<Api.SystemManage.User>({
    url: '/systemManage/user',
    method: 'post',
    data
  });
}

/** edit user */
export function fetchEditUser(userId: number, data?: Api.SystemManage.EditUserData) {
  return request<Api.SystemManage.User>({
    url: `/systemManage/user/${userId}`,
    method: 'put',
    data
  });
}

/** edit user */
export function fetchRemoveUser(ids: number[]) {
  return request<Api.SystemManage.User>({
    url: `/systemManage/user`,
    method: 'delete',
    data: {
      ids
    }
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/systemManage/getMenuList/v2',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/systemManage/getMenuTree',
    method: 'get'
  });
}

/** get dict list */
export function fetchGetDictList(params?: Api.SystemManage.DictSearchParams) {
  return request<Api.SystemManage.DictList>({
    url: '/systemManage/getDict',
    method: 'get',
    params
  });
}

/** remove dict */
export function fetchRemoveDict(ids: number[]) {
  return request<Api.SystemManage.Dict>({
    url: `/systemManage/user`,
    method: 'delete',
    data: {
      ids
    }
  });
}
