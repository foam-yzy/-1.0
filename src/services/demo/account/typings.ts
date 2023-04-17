/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace APIAccount {

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: any;
  }
  // 新增、修改
  interface AccountInfo {
    id?: number;
    userName: string;
    phone: String;
    roleId: number,
    status: boolean,
    account?: string,
    clientId: Array<number>,
    clientIds: Array<number>,
    clientRelevance: number
  }

  interface AccountStatus {
    id?: number,
    status: boolean
  }
}
