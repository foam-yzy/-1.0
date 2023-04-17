import { request } from '@umijs/max';


// 请求得到企业信息列表
export async function queryCompanyList(

) {
  return request<any>('/account-client/queryClientIdAndClientName', {
    method: 'GET',
  });
}

// 根据企业id请求得到table的数据
export async function queryDataByDeviceId(
  params: {
    id: number,
    currentPage?: number;
    pageSize?: number;
  },
) {
  return request<any>('/api/v1/queryDataByDeviceId', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// table根据id删除
export async function deleteDataById(
  params: {
    id: number
  },
) {
  return request<any>('/api/v1/queryDataByDeviceId', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

