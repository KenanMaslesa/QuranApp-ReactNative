export const createArray = (from: number, to: number): number[] => {
  var array = [];
  for (var i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
};
