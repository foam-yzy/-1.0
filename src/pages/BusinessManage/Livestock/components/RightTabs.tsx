import React, { useEffect, useState } from 'react'

interface propsInter {
  chooseTab: (tab: string) => void
}
export default function RightTabs(props: propsInter) {
  const [nowTab, setNowTab] = useState('tab1')
  const chooseTab = (tab: string) => {
    // console.log(tab);
    setNowTab(tab)
    props.chooseTab(tab)
  }
  useEffect(() => {
    props.chooseTab(nowTab)
  }, [])
  
  return (
    <>
      <div className='tab1' onClick={() => chooseTab('tab1')}>
        <div className={(nowTab == 'tab1') ? 'tabActive' : undefined}>
          牲畜档案
        </div>
      </div>
      <div className="tab2" onClick={() => chooseTab('tab2')}>
        <div className={(nowTab == 'tab2') ? 'tabActive' : undefined}>
          变动记录
        </div>
      </div>
    </>

  )
}
