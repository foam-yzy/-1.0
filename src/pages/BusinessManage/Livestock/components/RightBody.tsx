import { PageContainer } from '@ant-design/pro-components'
import React from 'react'

export default function RightBody() {
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {}
      }}
      childrenContentStyle={{padding: 0}}
    >
      <div>RightBody</div>
    </PageContainer>
  )
}
