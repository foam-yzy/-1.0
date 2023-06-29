import { useLocation } from '@umijs/max'
import React from 'react'

export default function CheckHoops() {

  const location = useLocation()
  console.log(location.state);
  
  return (
    <div>CheckHoops</div>
  )
}
