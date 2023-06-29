import { downloadInsuredAPI, downloadLivestockAPI, exportLivestockAPI } from '@/services/demo/livestock/controller'
import { ProForm, ProFormUploadButton } from '@ant-design/pro-components'
import { history } from '@umijs/max'
import { Button, Upload, message } from 'antd'
import React from 'react'

interface propsInter {
  optionData: APILivestock.optionListData | undefined
}
export default function toolBarButton(props: propsInter) {

  // 下载档案模板
  const downloadLivestock = async () => {
    const res = await downloadLivestockAPI()
    downloadFile(res, '档案模板' + '.xlsx')
  }

  // 下载参保模板
  const downloadInsured = async () => {
    const res = await downloadInsuredAPI()
    downloadFile(res, '参保模板.xlsx')
  }

  // 封装文件下载函数
  const downloadFile = (res: any, name: string) => {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = URL.createObjectURL(new Blob([res]))
    a.download = name

    // document.body.appendChild(a)
    a.click()
    // document.body.removeChild(a)
  }

  // 批量导入档案拦截处理
  const beforeUploadLivestock = (file: any) => {
    console.log(file.type)
    if (file.type != "application/vnd.ms-excel" || file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      //只允许上传excel格式的文件
      //请求接口
      return false
    }
    return true
  }

  // 批量导入档案
  const importLivestock = async(value: any) => {
    console.log(value.file);
    try {
      await exportLivestockAPI({client_id: props.optionData?.id, File: value.file})
      return true
    } catch (error) {
      return false
    }
  }

  // 点击抵押解押
  const handleMortgageAndRelease = () => [
    history.push('/BusinessManage/Livestock/components/MortgageAndRelease', props.optionData?.id)
  ]

  // 批量导入参保
  const importInsured = (value: any) => { }
  return (
    <div>
      <ProForm layout='inline' submitter={false}>
        <Upload onChange={importLivestock} showUploadList={false} beforeUpload={beforeUploadLivestock} maxCount={1}>
          <Button className='everyButton'>
            批量导入档案
          </Button>
        </Upload>

        <Upload onChange={importInsured} showUploadList={false}>
          <Button
            className='everyButton'
          >
            批量导入参保
          </Button>
        </Upload>

        <Button
          className='everyButton'
          onClick={downloadLivestock}
        >
          档案模板
        </Button>
        <Button
          className='everyButton'
          onClick={downloadInsured}
        >
          参保模板
        </Button>
        <Button
          className='everyButton'
          onClick={handleMortgageAndRelease}
        >
          抵押/解押导入
        </Button>
        <Button
          className='everyButton'
        >
          导出牲畜
        </Button>
      </ProForm>
    </div>
  )
}

