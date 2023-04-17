/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace APIAssessment {

  interface AssessmentInfo {
    id: number;
    account: string;
    userName: string;
    phone: string;
    normalClock: number;
    abnormalClock:number;
    clockStatus: boolean;
    updateTime: string;
  }

  // 打卡统计-查询所需参数
  interface queryAssessmentList {
    id?: number;

    startTime?: string;
    endTime?: string;
    account?: number,
    userName?: string,
    phone?: string,

    clockStatus?: boolean,
    currentPage?: number;
    pageSize?: number;
  }

  // 导出明细查询参数
  interface queryClockList {
    startTime?: string;
    endTime?: string;
    clockStatus?: boolean,
    currentPage?: number;
    pageSize?: number;
  }
}
