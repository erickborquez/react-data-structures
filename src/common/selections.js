/// Formating the selections based if its an object or a index
export const formateSelectionFromObject = (selection, callback) => {
  const formated = { className: "default-selection", style: {}, callback: callback, ...selection };
  return formated;
}

const formateSelectionFromFunction = (callback) => {
  return { className: "default-selection", style: {}, callback: callback };
}


/// Formating different type of source

const formateSingleSelection = (selection) => {
  if (selection >= 0) {  /// Checking if it's a number

    return formateSelectionFromFunction((index) => index === selection);
  }
  else if (selection instanceof Function) {
    return formateSelectionFromFunction(selection);
  }
  else if (selection.callback instanceof Function)
    return formateSelectionFromObject(selection, selection.callback)
  else if (Number.isInteger(selection.index))
    return formateSelectionFromObject(selection, (index) => index === selection.index);
  return formateSelectionFromObject(selection, () => false);

}

const formateSingleSelectionPair = (selection) => {
  if (selection instanceof Array)
    return formateSelectionFromFunction((i, j) => i === selection[0] && j === selection[1]);
  if (selection instanceof Function)
    return formateSelectionFromFunction(selection);
  if (selection.callback instanceof Function)
    return formateSelectionFromObject(selection, selection.callback);
  if (selection.index instanceof Array)
    return formateSelectionFromObject(selection, (i, j) => selection.index[0] === i && selection.index[1] === j)

  return formateSelectionFromObject(selection, () => false);
}

const formateSingleSelectionKeyValue = (selection) => {
  if (selection instanceof Function)
    return formateSelectionFromFunction(selection);
  if (selection.callback instanceof Function)
    return formateSelectionFromObject(selection, selection.callback);
  return formateSelectionFromObject(selection, (key, value) => selection.key === key && selection.value === value);
}


/// Elemens will call these functions based on the structure of his elements
export const getSelections1DFormated = (selection) => {
  let selectionsArray = [];
  if (selection instanceof Array) {
    selectionsArray = selection.map(s => formateSingleSelection(s));
  } else selectionsArray[0] = formateSingleSelection(selection);
  return selectionsArray;
}

export const getSelections2DFormated = (selection) => {
  let selectionsArray = [];
  // If the selection is an array and isn't a [y,x] selection
  if (selection instanceof Array && !Number.isInteger(selection[0])) {
    selectionsArray = selection.map(s => formateSingleSelectionPair(s));
  }
  else selectionsArray[0] = formateSingleSelectionPair(selection);

  return selectionsArray;
}

export const getSelectionsKeyValue = (selection) => {
  let selectionsArray = [];
  if (selection instanceof Array) {
    selectionsArray = selection.map(s => formateSingleSelectionKeyValue(s));
  }
  else selectionsArray[0] = formateSingleSelectionKeyValue(selection);
  return selectionsArray;
}

///// Vertex selections


const formateSingleSelectionVertex = (selection) => {
  if (typeof selection === 'function') return formateSelectionFromFunction(selection);
  if (typeof selection === 'string' || typeof selection === 'number')
    return formateSelectionFromFunction(vertex => vertex.label === selection);
  if (typeof selection.callback === 'function') return formateSelectionFromObject(selection, selection.callback);
  return formateSelectionFromObject(selection, (vertex) => vertex.label === selection.label);

}

export const getVertexSelectionFormated = (selection) => {
  let selectionsArray = [];
  if (selection instanceof Array) {
    selectionsArray = selection.map(s => formateSingleSelectionVertex(s));
  }
  else selectionsArray[0] = formateSingleSelectionVertex(selection);
  return selectionsArray;
}


///// Edge selections

const formateSingleSelectionEdge = (selection) => {
  if (typeof selection === 'function') return formateSelectionFromFunction(selection);
  if (typeof selection === 'string' || typeof selection === 'number')
    return formateSelectionFromFunction(v => v.label === selection);
  if (typeof selection.callback === 'function') return formateSelectionFromObject(selection, selection.callback);
  if (typeof selection.label === 'string' || typeof selection.label === 'number')
    return formateSelectionFromObject(e => e.label === selection.label);
  return formateSelectionFromObject(selection, e => e.from === selection.from && e.to === formateSelectionFromFunction.to);
}


export const getEdgeSelectionFormated = (selection) => {
  let selectionsArray = [];
  if (selection instanceof Array) {
    selectionsArray = selection.map(s => formateSingleSelectionEdge(s));
  }
  else selectionsArray[0] = formateSingleSelectionEdge(selection);
  return selectionsArray;
}