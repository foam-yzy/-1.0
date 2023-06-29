import React, { useRef, useState } from 'react'
import BacPic from '../../../images/1-1.png'
import smallPic from '../../../images/1-12.png'

export default function index() {

  const [isView, setIsView] = useState(false)
  const imgRef = useRef(null);

  const handlePic = (event: any) => {
    console.log(event.clientX);
    setIsView(true)
    addHotspot({x: event.clientX, y: event.clientY})
  }

  function addHotspot(hotspot: {x: number, y: number}) {
    const img = document.createElement('img');
    const x = hotspot.x - 100 - 70
    const y = hotspot.y - 100
    img.src = smallPic;
    img.style.left = String(x) + 'px'
    img.style.top = String(y) + 'px'
    img.style.position = 'absolute'
    imgRef.current.appendChild(img);
}

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="" onClick={(event) => handlePic(event)}>
        <img src={BacPic} style={{ width: '100%', height: '80%' }} />
      </div>
      <div ref={imgRef}></div>
      {isView ?
        <div style={{width: 100, backgroundColor: 'grey'}}>
          abcd
        </div>
        : null}

    </div>
  )
}
