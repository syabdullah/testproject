/**
 * Service to handle pagination
 */
export default class PaginationUtils {
  /**
   * Calculates the number of pages
   * @param  {Number} totalProducts
   * @param  {Number} productLimitPerPage
   * @return {Number} Number of page
   */
  static calculatePageCount = (totalProducts, productLimitPerPage) => {
    let pageCount = Math.floor(totalProducts / productLimitPerPage);
    if (totalProducts % productLimitPerPage !== 0) {
      pageCount++;
    }
    return pageCount;
  };
}



// WEBPACK FOOTER //
// ./src/utils/pagination.js