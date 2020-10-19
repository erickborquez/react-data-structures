import React, { useState, useEffect } from 'react'

import {
  Array1D,
  Array2D,
  MapStructure,
  Queue,
  Stack,
  Tree
} from 'react-data-structures'

import 'react-data-structures/dist/index.css'

let count = 0

const App = () => {
  const [tree, setTree] = useState({ root: { value: '0', children: [] } })
  useEffect(() => {
    if (count > 10) return
    setTimeout(() => {
      const treeCopy = JSON.parse(JSON.stringify(tree))
      const parent = Object.keys(treeCopy)[
        Math.floor(Math.random() * Object.keys(treeCopy).length)
      ]
      treeCopy[count] = { value: count, children: [] }
      treeCopy[parent].children.push(count)
      count++
      setTree(treeCopy)
    }, 1)
  }, [tree])

  return (
    <main className='main'>
      {/* <div className='container'>
        <Tree
          nodes={tree}
          root='root'
          width={800}
          height={400}
          orientation='vertical'
          reversed={false}
        />
      </div> */}
      <div className='container'>
        <Array1D
          elements={[1, 2, 3, 4, 4, 5, { value: 10, style: { color: 'blue' } }]}
          options={{ element: { style: { color: 'red' } } }}
        />
      </div>
      <div className='container'>
        <Array2D
          elements={[
            [1, 2],
            [3, 4]
          ]}
        />
      </div>
      {/*
      <div className='container'>
        <MapStructure
          elements={[
            { key: '1', value: 2 },
            { key: '1', value: 2 },
            { key: '1', value: 2 },
            { key: '1', value: 2 }
          ]}
        />
      </div>
      <div className='container'>
        <Queue elements={[1, 2, 3, 4, 5]} showBack elementsToShow={3} />
      </div>
      <div className='container'>
        <Stack elements={[1, 2, 3, 4, 5]} showRear elementsToShow={4} />
      </div>{' '}
      */}
    </main>
  )
}

export default App
