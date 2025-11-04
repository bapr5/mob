import React from 'react'
import monkey from '../assets/monkey.png'

import './Component1.css'

export default function Component1() {
  return (<div class="comp1">
    <div>
        <div>Компонент 1</div>
        <img src={monkey} alt="Бибизяна" class="rotate-on-hover"/>
    </div>
    </div>
  )
}
