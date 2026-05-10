class SearchView {
  #parentEl = document.querySelector('.search');

  /**
   * Reads the current search query and clears the input afterwards.
   * @returns {string} The text entered into the search field.
   */
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  /**
   * Clears the search input field.
   * @returns {void}
   */
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Subscribes a controller handler to the search form submit event.
   * @param {Function} handler Callback triggered after preventing the default submit.
   * @returns {void}
   */
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
