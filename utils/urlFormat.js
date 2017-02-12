export default (urlArr) => {
  return urlArr.slice().map((currVal) => {
    return currVal.split('https').join('http');
  });
};
