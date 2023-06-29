import React, { useState } from 'react'
import LeftOption from './components/LeftOption'
import RightTabs from './components/RightTabs'
import RightTable from './components/RightTable'
import './index.less'
import ChangeRecord from './components/ChangeRecord'

export default function index() {

  // 接收客户子组件传参
  const [nowOption, setNowOption] = useState<APILivestock.optionListData>()
  const propsChangeOption = (value: APILivestock.optionListData) => {
    setNowOption(value)
  }

  // 接收tab子组件传参
  const [nowTab, setNowTab] = useState<string>()
  const chooseTab = (tab: string) => {
    setNowTab(tab)
  }

  return (
    <div className="livestockAll">
      <div className="leftOption">
        <LeftOption propsChangeOption={propsChangeOption} />
      </div>
      <div className="rightAll">
        <div className="rightTabs">
          <RightTabs chooseTab={chooseTab} />
        </div>
        <div className="rightBody">
          {nowTab == 'tab1' ? <RightTable nowOption={nowOption} /> : null}
          {nowTab == 'tab2' ? <ChangeRecord nowOptionData={nowOption} /> : null}
        </div>
      </div>
    </div>
  )
}
