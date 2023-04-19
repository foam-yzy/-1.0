import React, { useState } from 'react'
import LeftOption from './components/LeftOption'
import RightTable from './components/RightTable'
import './index.less'

export default function index() {

    const [optionData, setOptionData] = useState<APIDevice.optionListData>({} as APIDevice.optionListData)
    // 接收左边企业列表组件传参(id、name)
    const propsChangeOption = (data: APIDevice.optionListData) => {
        setOptionData(data)
    }

    return (
        <div className="mainDeviceBody">
            <div className="leftOption">
                <LeftOption propsChangeOption={propsChangeOption} />
            </div>
            <div className="rightTableBody">
                <RightTable optionData={optionData} />
            </div>
        </div>

    )
}
