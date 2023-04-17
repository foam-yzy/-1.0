/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//账号查询
export async function queryAccountList(
  params: {
    account?: number,
    userName?: string,
    phone?: string,
    roleId?: number,
    status?: boolean,
    currentPage?: number;
    pageSize?: number;
  },
) {
  return request<API.Result_PageInfo_UserInfo__>('/account/queryAccountPage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 账号重置
export async function handleAccountReset(
  params: {
    id?: number
  },
) {
  return request(`/account/resetPassword`, {
    method: 'POST',
    data: { ...params },
  });
}

// 账号停启用
export async function changeStatus(
  body?: APIAccount.AccountStatus,
) {
  return request<API.Result_UserInfo_>('/account/updateAccountStatus', {
    method: 'POST',
    data: body,
  });
}

// 新增账号
export async function addAccount(
  body?: APIAccount.AccountInfo,
) {
  return request<API.Result_UserInfo_>('/account/addAccount', {
    method: 'POST',
    data: body,
  });
}

// 新增账号
export async function updateAccount(
  body?: APIAccount.AccountInfo,
) {
  return request<API.Result_UserInfo_>('/account/updateAccount', {
    method: 'POST',
    data: body,
  });
}

// 得到角色枚举类
export async function queryRoleEnum(
) {
  return request<[]>('/account-role/queryRoleIdAndRoleName', {
    method: 'GET',
  });
}

// 得到监管企业列表
export async function queryClientList(
  ) {
    return request<[]>('/account-client/queryClientIdAndClientName', {
      method: 'GET',
    });
  }