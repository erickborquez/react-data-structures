import React, { useState, useRef, useEffect } from 'react'

import * as d3 from 'd3'

import {
  getVertexSelectionFormated,
  getEdgeSelectionFormated
} from '../../common/selections'
import { defaultElementOptions } from '../../common/defaultValues'

import styles from './style.css'

const Tree = ({
  className = '',
  vertexOptions = null,
  edgesOptions = null,
  selectVertex = null,
  selectEdge = null,
  orientation = 'vertical',
  reversed = false,
  width = 0,
  height = 0,
  nodes,
  onZoom = () => null,
  root
}) => {
  const [state, setState] = useState({
    edges: [],
    vertex: [],
    treeHeight: 0,
    treeWidth: 0,
    vertexComponents: [],
    edgesComponents: [],
    dimensions: {
      padding: 20,
      nodeRadius: 10,
      nodeMargin: 10,
      width: width,
      height: height
    }
  })
  const ref = useRef(null)
  const zoomRef = useRef(undefined)

  useEffect(() => {
    const rootLabel = root || nodes[Object.keys(nodes)[0]]
    if (!nodes[rootLabel]) return
    const nodesData = {}
    const vertex = []
    const edges = []
    const visited = {}
    let treeHeight = 0
    let treeWidth = 0
    const getNodeData = (label, height) => {
      if (!nodes[label] || visited[label]) return
      visited[label] = true
      let width = 0
      treeHeight = Math.max(treeHeight, height)
      try {
        ;(nodes[label].children || []).forEach((children) => {
          getNodeData(children, height + 1)
          width += nodesData[children].width
        })
      } catch (e) {}
      width = Math.max(1, width)
      nodesData[label] = {
        ...nodes[label],
        width: width,
        height: height,
        label: label
      }
    }

    /// The x position goes form 0 to 1, the y goes form 0 to treeHeight
    const getAbsolutePos = (label, start, end, parentPos, parentLabel) => {
      const middle = (start + end) / 2
      const pos = [middle, nodesData[label].height]
      nodesData[label].pos = pos
      /// If its not the root insert a vertex;
      if (parentPos)
        edges.push({
          from: parentPos,
          to: pos,
          key: label,
          parent: parentLabel,
          children: label
        })
      let currentLeft = start
      ;(nodesData[label].children || []).forEach((children) => {
        /// The width that the child spans
        const childrenWidth = nodesData[children].width / treeWidth
        getAbsolutePos(
          children,
          currentLeft,
          currentLeft + childrenWidth,
          pos,
          label
        )
        currentLeft += childrenWidth
      })
    }

    getNodeData(rootLabel, 0)
    treeWidth = nodesData[rootLabel].width
    getAbsolutePos(rootLabel, 0, 1, undefined, rootLabel)
    for (const label in nodesData) vertex.push(nodesData[label])

    /// Getting the components and the styles from the selectVertex
    const defaultVertexOptions = { ...defaultElementOptions, ...vertexOptions }
    const vertexSelections =
      selectVertex !== null ? getVertexSelectionFormated(selectVertex) : []
    const vertexComponents = vertex.map((v, i) => {
      let { className, style } = defaultVertexOptions

      vertexSelections.forEach((selection) => {
        if (selection.callback(v)) {
          className = `${className} ${selection.className}`
          style = { ...style, ...selection.style }
        }
      })
      return (
        <circle
          key={i}
          fill='white'
          {...defaultElementOptions}
          onClick={(event) =>
            defaultVertexOptions.onClick({ ...v, ...nodes[v.label] }, event)
          }
          className={`tree-structure__node ${className}`}
          style={style}
        />
      )
    })

    /// Gettng the components and the styles from selectEdge
    const defaultEdgeOptions = { ...defaultElementOptions, ...edgesOptions }
    const edgesSelections =
      selectEdge !== null ? getEdgeSelectionFormated(selectEdge) : []
    const edgesComponents = edges.map((e, i) => {
      let { className, style } = defaultEdgeOptions
      edgesSelections.forEach((selection) => {
        if (selection.callback(e)) {
          className = `${className} ${selection.className}`
          style = { ...style, ...selection.style }
        }
      })
      return (
        <path
          key={i}
          strokeWidth={2}
          fill='white'
          stroke='white'
          {...defaultEdgeOptions}
          className={`tree-structure__edge ${className}`}
          style={style}
          onClick={(event) => defaultEdgeOptions.onClick(e, event)}
        />
      )
    })

    setState((s) => {
      const { nodeRadius, nodeMargin, padding } = s.dimensions

      let newHeight = height
      if (!height) {
        if (orientation === 'vertical') {
          newHeight = (nodeRadius + nodeMargin) * 2 * treeHeight + padding * 2
        } else {
          newHeight = (nodeRadius + nodeMargin) * 2 * treeWidth + padding * 2
        }
      }
      const currentDimensions = {
        ...s.dimensions,
        treeHeight: treeHeight,
        treeWidth: treeWidth,
        height: newHeight
      }
      const newState = {
        dimensions: currentDimensions,
        edges,
        vertex,
        vertexComponents: vertexComponents,
        edgesComponents: edgesComponents
      }
      return newState
    })
  }, [
    nodes,
    root,
    selectVertex,
    selectEdge,
    vertexOptions,
    edgesOptions,
    height,
    orientation
  ])

  useEffect(() => {
    const { dimensions, vertex, edges } = state
    const { padding, width, treeHeight, height, nodeRadius } = dimensions
    const svgContainer = d3.select(ref.current)
    const svgCircles = svgContainer.selectAll('circle')
    const svgPaths = svgContainer.selectAll('path')
    let edgesArr = []
    let xScale
    let yScale
    const resetScales = () => {
      xScale = d3.scaleLinear().range([padding, width - padding])
      yScale = d3.scaleLinear().range([height - padding, padding])

      if (orientation === 'vertical') {
        xScale.domain(reversed ? [0, 1] : [1, 0])
        yScale.domain(reversed ? [0, treeHeight] : [treeHeight, 0])
      } else {
        xScale.domain(reversed ? [treeHeight, 0] : [0, treeHeight])
        yScale.domain(reversed ? [1, 0] : [0, 1])
      }
    }
    /// Handling zoom
    const handleZoom = () => {
      if (!zoomRef.current && !d3.event) return
      resetScales()
      if (d3.event) {
        zoomRef.current = d3.event.transform
        onZoom(zoomRef.current)
      }
      if (zoomRef.current) {
        xScale.domain(zoomRef.current.rescaleX(xScale).domain())
        yScale.domain(zoomRef.current.rescaleY(yScale).domain())
        ref.current.style.transform = `scale(${Math.min(1, zoomRef.current.k)})`
      }
    }

    /// Updating the elements
    const updateElementsPosition = () => {
      handleZoom()
      const lineGenerator = d3.line()
      edgesArr = edges.map((edge) => {
        let from, to
        if (orientation === 'vertical') {
          from = [xScale(edge.from[0]), yScale(edge.from[1])]
          to = [xScale(edge.to[0]), yScale(edge.to[1])]
        } else {
          from = [xScale(edge.from[1]), yScale(edge.from[0])]
          to = [xScale(edge.to[1]), yScale(edge.to[0])]
        }
        return { path: lineGenerator([from, to]), key: edge.key }
      })

      svgCircles
        .data(vertex)
        .attr('cx', (v) =>
          orientation === 'vertical' ? xScale(v.pos[0]) : xScale(v.height)
        )
        .attr('cy', (v) =>
          orientation === 'vertical' ? yScale(v.height) : yScale(v.pos[0])
        )
        .attr('r', () => nodeRadius)

      svgPaths.data(edgesArr).attr('d', (e) => e.path)
    }

    svgContainer.call(
      d3
        .zoom()
        .scaleExtent([1, 50])
        .translateExtent([
          [-100, -100],
          [width, height]
        ])
        .extent([
          [-100, -100],
          [width, height]
        ])
        .on('zoom', updateElementsPosition)
    )
    resetScales()
    updateElementsPosition()
  }, [state, ref, orientation, reversed, onZoom])

  return (
    <div
      className={`${styles.treeStructureContainer} ${className}`}
      style={{ width: width, height: state.dimensions.height }}
    >
      <svg ref={ref} width={width} height={state.dimensions.height}>
        <g>
          {state.edgesComponents}
          {state.vertexComponents}
        </g>
      </svg>
    </div>
  )
}

export default Tree
