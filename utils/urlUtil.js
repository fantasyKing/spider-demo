export default new class {
  complete = (url, root) => {
    if (url && url.search(/^http/i) === -1) {
      if (root.endsWith('/')) {
        url = `${this.removeLast(root)}${url}`;
      } else {
        url = `${root}${url}`;
      }
    }
    return url;
  }

  removeLast = (url) => {
    return url.substring(0, url.length - 1);
  }
};
