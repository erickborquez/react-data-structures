import React, { useState, useRef, useEffect, CSSProperties } from 'react'

import * as d3 from 'd3'

import {
  getVertexSelectionFormated,
  getEdgeSelectionFormated
} from '../common/selections'

import { getTreeLayout } from '../algorithms/tree'

import styles from '../styles/tree.module.css'
import { TreeOptions } from '../types/Options'
import { EdgeLayout, TreeNode, TreeNodeLayout } from '../types/Nodes'
import { TreeDimensions } from '../types/Dimensions'
import { defaultTreeOptions } from '../common/defaultValues'

import { mergeDeep } from '../common/utilities'

interface LayoutState {
  components: {
    nodes: any[]
    edges: any[]
  }
  nodes: TreeNodeLayout[]
  edges: EdgeLayout[]
  width: number
  height: number
  root?: TreeNodeLayout
}

interface Props {
  root: TreeNode
  className?: string
  style?: CSSProperties
  options?: TreeOptions
}

const Tree: React.FC<Props> = ({
  className,
  style,
  options: initialOptions,
  root
}) => {
  const [layout, setLayout] = useState<LayoutState>({
    nodes: [],
    edges: [],
    components: { nodes: [], edges: [] },
    width: 0,
    height: 0
  })
  const [dimensions, setDimensions] = useState<TreeDimensions | null>()
  const ref = useRef(null)
  const zoomRef = useRef(undefined)

  useEffect(() => {
    const { treeLayout, edges, height, width } = getTreeLayout(root)
    const nodes: TreeNodeLayout[] = []
    const components = { nodes: [], edges: [] }

    const getNodeComponent = (root: TreeNodeLayout) => {
      const { children, ...node } = root
      nodes.push(node)
      if (root.children)
        for (const child of root.children) getNodeComponent(child)

      components.nodes.push(
        <circle
          key={root.id}
          fill='white'
          className={`tree-structure__node ${className}`}
          style={style}
        />
      )
    }
    getNodeComponent(treeLayout)

    for (const edge of edges) {
      components.edges.push(
        <path
          key={edge.id}
          strokeWidth={2}
          fill='white'
          stroke='white'
          className={`tree-structure__edge ${className}`}
          style={style}
        />
      )
    }
    setLayout({ root: treeLayout, nodes, edges, components, width, height })
  }, [root])

  useEffect(() => {
    if (!layout.root) return

    const options = mergeDeep(defaultTreeOptions, initialOptions) as TreeOptions
    const { width, height, orientation, reversed } = options
    const { radius } = options.node
    const { width: treeWidth, height: treeHeight, nodes, edges } = layout

    const padding = options.padding + radius

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

    const handleZoom = () => {
      if (!zoomRef.current && !d3.event) return
      resetScales()
      if (d3.event) {
        zoomRef.current = d3.event.transform
      }
      if (zoomRef.current) {
        xScale.domain(zoomRef.current.rescaleX(xScale).domain())
        yScale.domain(zoomRef.current.rescaleY(yScale).domain())
        ref.current.style.transform = `scale(${Math.min(1, zoomRef.current.k)})`
      }
    }

    const updateElementsPosition = () => {
      handleZoom()
      const lineGenerator = d3.line()
      edgesArr = edges.map(({ position, id }) => {
        let from, to
        if (orientation === 'vertical') {
          from = [xScale(position.from.x), yScale(position.from.y)]
          to = [xScale(position.to.x), yScale(position.to.y)]
        } else {
          from = [xScale(position.from.y), yScale(position.from.x)]
          to = [xScale(position.to.y), yScale(position.to.x)]
        }
        return { path: lineGenerator([from, to]), key: id }
      })

      svgCircles
        .data(nodes)
        .attr('cx', ({ position }) => {
          return orientation === 'vertical'
            ? xScale(position.x)
            : xScale(position.y)
        })
        .attr('cy', ({ position }) => {
          return orientation === 'vertical'
            ? yScale(position.y)
            : yScale(position.x)
        })
        .attr('r', () => radius)

      svgPaths.data(edgesArr).attr('d', (e) => e.path)
    }

    svgContainer.call(
      d3
        .zoom()
        .scaleExtent([1, 50])
        .translateExtent([
          [-100, -100],
          [500, 500]
        ])
        .extent([
          [-100, -100],
          [500, 500]
        ])
        .on('zoom', updateElementsPosition)
    )
    resetScales()
    updateElementsPosition()
  }, [initialOptions, layout])

  return (
    <svg ref={ref} width={initialOptions.width} height={initialOptions.height}>
      {layout.components.edges}
      {layout.components.nodes}
    </svg>
  )
}

export default Tree
