declare namespace APILivestock {

  // 牲畜档案proTable字段
  interface livestockList {
    id?: number,
    clientId?: number,
    hoopsId?: number,
    hoopsName?: string,
    fenceId?: number,
    fenceName?: number,
    livestockType?: string,
    intelligentEarNumber?: string,
    normalEarNumber?: string,
    livestockStatus?: boolean,
    updateTime?: string,
    insuredStatus?: boolean,
    mortgageStatus?: boolean,
    birthTime?: string,
    currentFinancingInstitutions?: string
    loanEndTime: string,
    loanStartTime: string
  }

  // 客户列表字段
  interface optionListData {
    id: number,
    clientName: string
  }

  interface pageHoops {
    pageSize?: number,
    currentPage?: number
  }

  // 变动记录proTable字段
  interface changeRecordList {
    id?: number,
    changeTime?: string
    changeType?: string,
    clientName?: string,
    intelligentEarNumber?: string,
    changeContent?: string,
    oldChangeContent?: string,
    newChangeContent?: string,
    changeUser?: string,
    pageSize?: number,
    currentPage?: number,
    clientId?: number,
  }
}
