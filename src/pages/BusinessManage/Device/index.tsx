import React, { useState } from 'react'
import LeftOption from './components/LeftOption'
import RightTable from './components/RightTable'
import styles from './index.less'

export default function index() {

    const [optionData, setOptionData] = useState<APIDevice.optionListData>({} as APIDevice.optionListData)
    // 接收左边企业列表组件传参(id、name)
    const propsChangeOption = (data: APIDevice.optionListData) => {
        setOptionData(data)
    }

    return (
        <div className={styles.mainBody}>
            <div className={styles.leftOption}>
                <LeftOption propsChangeOption={propsChangeOption} />
            </div>
            <div className={styles.rightTable}>
                <RightTable optionData={optionData} />
            </div>
        </div>

    )
}
