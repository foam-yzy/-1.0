/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

//监管考核-打卡统计查询
export async function queryAssessmentList(
  params: APIAssessment.queryAssessmentList
) {
  return request('/regulation/clockCount', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//监管考核-打卡明细查询
export async function queryDetailsList(
  params: APIAssessment.queryAssessmentList
) {
  return request('/regulation/queryDetails', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 打卡明细导出
export async function exportClockDetail(
  body?: {accountId?:number,currentPage?: number, pageSize?: number},
) {
  return request('/regulation/exportExcel', {
    method: 'POST',
    data: body,
    responseType:'blob',
    type: 'application/vnd.ms-excel'
  });
}
