export const resizeArray = (array, size, defaultValue) => {
  const newArray = [...array];
  while (newArray.length < size) newArray.push(defaultValue);
  return newArray;
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
