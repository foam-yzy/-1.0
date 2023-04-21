declare namespace APILivestock {

  // proTable字段
  interface deviceList {
    id?: number,
    clientId: number,
    hoopsId: number,
    hoopsName: string,
    fenceId: number,
    fenceName: number,
    livestockType: string,
    intelligentEarNumber: string,
    normalEarNumber: string,
    livestockStatus: boolean,
    updateTime: string,
    insuredStatus: boolean,
    mortgageStatus: boolean,
    birthTime: string,
    currentFinancingInstitutions: string
  }

  // 客户列表字段
  interface optionListData {
    id: number,
    clientName: string
  }
}
