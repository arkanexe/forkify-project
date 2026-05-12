import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Delegates pagination button clicks to the provided controller handler.
   * @param {Function} handler Callback receiving the destination page number.
   * @returns {void}
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Creates pagination controls based on the current search result page.
   * @returns {string} Pagination button markup.
   */
  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (numPages <= 1) return '';

    if (curPage === 1 && numPages > 1) {
      return this._next(curPage);
    }

    if (curPage === numPages && numPages > 1) {
      return this._previous(curPage);
    }

    if (curPage > 1 && curPage < numPages) {
      return `${this._previous(curPage)} ${this._next(curPage)}`;
    }

    return '';
  }

  /**
   * Creates the previous-page button markup.
   * @param {number} pageTo Current page number.
   * @returns {string} Previous-page button markup.
   */
  _previous(pageTo) {
    return `
        <button data-goto = "${pageTo - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageTo - 1}</span>
        </button>`;
  }

  /**
   * Creates the next-page button markup.
   * @param {number} pageTo Current page number.
   * @returns {string} Next-page button markup.
   */
  _next(pageTo) {
    return `
         <button data-goto = "${pageTo + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${pageTo + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}
export default new PaginationView();
