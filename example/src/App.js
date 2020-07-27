import React from 'react'

import { Array1D } from 'react-data-structures'
import 'react-data-structures/dist/index.css'

const App = () => {
  return (
    <main className='main'>
      <div className='container'>
        <Array1D array={[1, 2, 3, 4]} />
      </div>
    </main>
  )
}

export default App
