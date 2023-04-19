import React from 'react'
import LeftOption from './components/LeftOption'
import RightTabs from './components/RightTabs'
import RightBody from './components/RightBody'
import styles from './index.less'

export default function index() {
  return (
    <div className={styles.livestockAll}>
      <div className={styles.leftOption}><LeftOption /></div>
      <div className={styles.rightAll}>
        <div className={styles.rightTabs}><RightTabs /></div>
        <div className={styles.rightBody}><RightBody /></div>
      </div>
    </div>
  )
}
