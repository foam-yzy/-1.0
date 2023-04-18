import { request } from '@umijs/max';


// 请求得到企业信息列表
export async function queryCompanyList() {
  return request('/account-client/queryClientIdAndClientName', {
    method: 'GET',
  });
}

// 获取圈舍列表
export async function queryHoopsList(
  params: {
    clientId: number
  },
) {
  return request('/device/queryHoopsIdAndName', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

// 获取围栏列表
export async function queryFenceByHoops(
  params: { hoopsId: number }
) {
  return request('/device/queryFenceIdAndName', {
    method: 'GET',
    params: params
  });
}

// 根据企业id请求得到table的数据
export async function queryDataByDeviceId(
  params: {
    clientId: number,
    currentPage?: number,
    pageSize?: number,
    hoopsName?: string,
    deviceType?: boolean,
    deviceName?: string,
    workStatus?: boolean,
  },
) {
  return request<any>('/device/queryDevicePage', {
    method: 'POST',
    data: {
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
  return request<any>('/device/deleteDevice', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 更新状态
export async function changeStatusById(
  params: {
    id?: number,
    deviceStatus: boolean
  },
) {
  return request<any>('/device/updateDeviceStatus', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 新增-摄像头
export async function addDeviceByCamera(
  params: APIDevice.addDeviceByCameraInter,
) {
  return request('/device/addCamera', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 新增-基站
export async function addDevice(
  params: APIDevice.addDeviceInter,
) {
  return request('/device/addBaseStation', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 修改-摄像头
export async function upDeviceByCamera(
  params: APIDevice.addDeviceByCameraInter,
) {
  return request('/device/updateCamera', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 修改-基站
export async function upDevice(
  params: APIDevice.addDeviceInter,
) {
  return request('/device/updateBaseStation', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

