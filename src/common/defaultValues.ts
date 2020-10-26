import { FormatedElement } from '../types/Elements'
import { FormatedKeyValueElement } from '../types/Elements'
import {
  Options,
  MapOptions,
  QueueOptions,
  StackOptions,
  NodeOptions,
  EdgeOption,
  TreeOptions
} from '../types/Options'
import { FormatedArraySelection } from '../types/Selections'

import { FormatedTreeNode, Node, TreeNode } from '../types/Nodes'
import { TreeDimensions } from '../types/Dimensions'

export const defaultElement: FormatedElement = {
  style: {},
  className: '',
  value: ''
}

export const defaultSelection: FormatedArraySelection = {
  eval: () => false,
  className: '',
  style: {}
}

export const defaultKeyValueElement: FormatedKeyValueElement = {
  style: {},
  className: '',
  value: '',
  keyValue: ''
}

export const defaultArrayOptions: Options = {
  element: { className: '', style: {} }
}

export const defaultMapOptions: MapOptions = {
  element: { className: '', style: {} },
  keyElement: { className: '', style: {} }
}

export const defaultQueueOtions: QueueOptions = {
  element: { className: '', style: {} },
  elementsToShow: 5,
  frontIndexLabel: 'Front',
  backIndexLabel: 'Back',
  showBack: true,
  showBackIndex: true,
  showFrontIndex: true
}

export const defaultStackOptions: StackOptions = {
  element: { className: '', style: {} },
  elementsToShow: 5,
  topIndexLabel: 'Top',
  rearIndexLabel: 'Rear',
  showRear: true,
  showRearIndex: true,
  showTopIndex: true
}

export const defaultNodeOptions: NodeOptions = {
  style: {},
  className: '',
  padding: 20,
  radius: 10,
  margin: 10
}
export const defaultEdgeOptions: EdgeOption = {
  style: {},
  className: ''
}

export const defaultTreeOptions: TreeOptions = {
  height: 800,
  width: 600,
  edge: { ...defaultNodeOptions },
  node: { ...defaultNodeOptions },
  orientation: 'vertical',
  reversed: false,
  zoom: true,
  maxZoom: 1,
  minZoom: 1,
  padding: 5
}

export const defaultNode: Node = {
  id: -1,
  value: '',
  className: '',
  style: {}
}

export const defaultTreeNode: FormatedTreeNode = {
  id: -1,
  value: '',
  className: '',
  style: {},
  children: []
}
