import { queryCompanyList } from '@/services/demo/device/controller'
import React, { useEffect, useState } from 'react'
import './LeftOption.less';

interface propsInter {
  propsChangeOption: (data: APIDevice.optionListData) => void
}
export default function LeftOption(props: propsInter) {
  const [optionData, setOptionData] = useState<any>([])
  const [nowOptionData, setNowOptionData] = useState<{ id: number }>()

  // 请求得到企业列表
  const getOptionData = async () => {
    const res = await queryCompanyList()    
    setOptionData(res)
    setNowOptionData({ id: res[0].id })
    props.propsChangeOption(res[0])
  }

  useEffect(() => {
    getOptionData()
  }, [])

  // 选中企业发生变化时 do something
  const changeOption = (data: APIDevice.optionListData) => {
    setNowOptionData({ id: data.id })
    props.propsChangeOption(data)
  }

  return (
    <div>
      <div className='spanAllText'>全部</div>
      {optionData.map((item: APIDevice.optionListData) => {
        //当点击事件触发时，赋className
        const nowClassName = (item.id === nowOptionData?.id) ? 'active' : ''
        return (
          <div key={item.id} onClick={() => changeOption(item)} className='leftOption-all'>
            <div className={nowClassName}>
              {item.clientName}
            </div>
          </div>
        );
      })}
    </div>
  )
}
