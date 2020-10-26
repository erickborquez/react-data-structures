import { Children } from 'react'
import { formateTreeNode } from '../common/formatElement'
import { EdgeLayout, TreeNode, TreeNodeLayout } from '../types/Nodes'

export const getTreeLayout = (
  root: TreeNode
): {
  treeLayout: TreeNodeLayout
  edges: EdgeLayout[]
  height: number
  width: number
} => {
  const formatedRoot = _getHeightAndWidth(root, 0)
  const treeLayout = _getTreeLayout(formatedRoot, 0, 1, formatedRoot.width)
  const { edges, height } = getEdgesAndHeight(treeLayout)
  console.log(height)
  return { treeLayout, edges, height, width: treeLayout.width }
}

export const _getTreeLayout = (
  root: TreeNodeLayout,
  start: number,
  end: number,
  maxWidth: number,
  parent?: TreeNodeLayout
): TreeNodeLayout => {
  let mid = (start + end) / 2
  let childrenWithLayout: TreeNodeLayout[] = []
  let left = start
  for (let child of root.children) {
    let width = child.width / maxWidth
    childrenWithLayout.push(
      _getTreeLayout(child, left, left + width, maxWidth, root)
    )
    left += width
  }
  const newRoot: TreeNodeLayout = {
    ...root,
    children: childrenWithLayout,
    position: { x: mid, y: root.height }
  }
  return newRoot
}

export const _getHeightAndWidth = (
  root: TreeNode,
  height: number
): TreeNodeLayout => {
  const formatedRoot = formateTreeNode(root)
  let children: TreeNodeLayout[] = [],
    width = 0
  for (let child of formatedRoot.children) {
    const formatedChildren = _getHeightAndWidth(child, height + 1)
    children.push(formatedChildren)
    width += formatedChildren.width
  }
  const layout: TreeNodeLayout = {
    ...formatedRoot,
    children,
    width: Math.max(1, width),
    height,
    position: { x: 0, y: 0 }
  }
  return layout
}

const getEdgesAndHeight = (
  root: TreeNodeLayout
): { edges: EdgeLayout[]; height: number } => {
  const edges = []
  let maxHeight = 0

  const dfs = (node: TreeNodeLayout, height: number) => {
    maxHeight = Math.max(height, maxHeight)
    if (node.children)
      for (let child of node.children) {
        let edge: EdgeLayout = {
          id: `${node.id}-${child.id}`,
          from: node.id,
          to: child.id,
          value: 0,
          position: { from: node.position, to: child.position }
        }
        edges.push(edge)
        dfs(child, height + 1)
      }
  }
  dfs(root, 0)
  return { edges, height: maxHeight }
}
