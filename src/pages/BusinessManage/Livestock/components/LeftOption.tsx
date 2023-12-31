import React, { useEffect, useState } from 'react'
import './LeftOption.less';
import { queryClientList } from '@/services/demo/livestock/controller';

interface propsInter {
  propsChangeOption: (data: APILivestock.optionListData) => void
}
export default function LeftOption(props: propsInter) {
  const [optionData, setOptionData] = useState<any>([])
  const [nowOptionData, setNowOptionData] = useState<{ id: number }>()

  // 请求得到客户列表
  const getOptionData = async () => {
    const res = await queryClientList()
    setOptionData(res)
    setNowOptionData({ id: res[0].id })
    props.propsChangeOption(res[0])
  }

  useEffect(() => {
    getOptionData()
  }, [])

  // 选中客户发生变化时 do something
  const changeOption = (data: APILivestock.optionListData) => {
    setNowOptionData({ id: data.id })
    props.propsChangeOption(data)
  }

  return (
    <div>
      <div className='spanAllText'>全部</div>
      {optionData.map((item: APILivestock.optionListData) => {
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
