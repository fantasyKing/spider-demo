export default new class {
  constructor() {
    this.companyHireSiteNum = 0;
  }

  addHireSiteNum() {
    this.companyHireSiteNum += 1;
  }

  getHireSiteNum() {
    return this.companyHireSiteNum;
  }
};
