import icons from '../../img/icons.svg';

export default class View {
  /**
   * Renders data to the DOM or returns the generated markup string.
   * @param {Object|Object[]} data The view data to render.
   * @param {boolean} [render=true] When false, returns markup instead of touching the DOM.
   * @returns {void|string} Nothing when rendering to the DOM, otherwise the generated markup.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Updates only changed text and attributes in the current DOM tree.
   * @param {Object|Object[]} data Fresh data used to compute the next UI state.
   * @returns {void}
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value),
        );
      }
    });
  }

  /**
   * Clears the view container.
   * @returns {void}
   */
  _clear() {
    this._parentElement.innerHTML = ``;
  }

  /**
   * Renders a loading spinner inside the parent element.
   * @returns {void}
   */
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders an error message for the current view.
   * @param {string} [message=this._errorMessage] Message displayed in the UI.
   * @returns {void}
   */
  renderError(message = this._errorMessage) {
    const markup = `
              <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders a success or informational message for the current view.
   * @param {string} [message=this._message] Message displayed in the UI.
   * @returns {void}
   */
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
