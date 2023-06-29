import { request } from '@umijs/max';


// 请求得到客户信息列表
export async function queryClientList() {
  return request('/account-client/queryClientIdAndClientName', {
    method: 'GET',
  });
}

// 获取圈舍列表
export async function queryHoopsList(
  params: { clientId?: number },
) {
  return request('/livestock/queryHoopsIdAndName', {
    method: 'GET',
    params: params,
  });
}

// 获取围栏列表
export async function queryFenceList(
  params: { hoopsId?: number },
) {
  return request('/livestock/queryFenceIdAndName', {
    method: 'GET',
    params: params,
  });
}

// 获取牲畜类型
export async function queryLivestockType() {
  return request('/livestock/getAllMenu', {
    method: 'GET',
  });
}

// 根据客户id请求得到table的数据
export async function queryHoopsByClientId(
  params: APILivestock.livestockList | APILivestock.pageHoops | { clientId: number }
) {
  return request('/livestock/LivesPage', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

// 牲畜出栏
export async function outLivestockByHoopsId(
  params: {
    hoopsId?: number,
    columnType: boolean,
  }
) {
  return request('/livestock/outLivestock', {
    method: 'POST',
    data: params
  });
}

// 牲畜出栏
export async function changeLivestockById(
  params: {
    id?: number,
    hoopsId: number,
    fenceId: number,
  }
) {
  return request('/livestock/changeLivestock', {
    method: 'POST',
    data: params
  })
}

// 牲畜换标
export async function swapLivestockById(
  params: {
    id?: number,
    intelligentEarNumber: string,
    earTagsReason: boolean,
  }
) {
  return request('/livestock/swapLivestock', {
    method: 'POST',
    data: params
  })
}

// 牲畜根据id删除
export async function deleteLivestockById(
  params: {
    id?: number
  },
) {
  return request<any>('/livestock/deleteLivestock', {
    method: 'POST',
    data: params,
  });
}

// 牲畜新增
export async function insertLivestock(
  params: APILivestock.livestockList
) {
  return request('/livestock/addLives', {
    method: 'POST',
    data: params,
  })
}

// 下载档案模板
export async function downloadLivestockAPI() {
  return request('/livestock/downloadLivestock', {
    method: 'GET',
    responseType: 'blob'
  })
}

// 下载参保模板
export async function downloadInsuredAPI() {
  return request('/livestock/downloadInsured', {
    method: 'GET',
    responseType: 'blob'
  })
}

// 批量导入档案模板
export async function exportLivestockAPI(
  params: {
    client_id?: number,
    File: any
  }
) {
  return request('/livestock/importLivestock', {
    method: 'POST',
    data: params,
    // headers: {
    //   'Content-Type': "multipart/form-data",
    // },
  })
}

// 请求得到变动记录table的数据
export async function queryOrderList(
  params: APILivestock.changeRecordList
) {
  return request('/livestock/change/queryOrderList', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

