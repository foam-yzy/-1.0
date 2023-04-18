/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace APIDevice {

  // proTable字段
  interface deviceList {
    id?: number,
    hoopsName: string,
    fenceName: string,
    deviceType: number,
    workStatus: boolean,
    deviceName: string,
    reportTime: string,
    createTime: string,
    deviceStatus: boolean,

    clientId: number,
    fenceId: number,
    gimbal: boolean,
    hoopsId: number,
    sipChannelNumber: number,
    sipId: number,

    mac: string,
  }

  // 企业列表字段
  interface optionListData {
    id: number,
    clientName: string
  }

  // 新增/修改-摄像头
  interface addDeviceByCameraInter {
    id?: number,
    clientId?: number,
    deviceName?: string,
    fenceId?: number,
    gimbal?: boolean,
    hoopsId?: number,
    sipChannelNumber?: number,
    sipId?: number
  }

  // 新增/修改-基站
  interface addDeviceInter {
    id?: number,
    clientId?: number,
    deviceName?: string,
    fenceId?: number,
    hoopsId?: number,
    mac?: string,
  }
}
