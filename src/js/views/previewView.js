import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  /**
   * Creates markup for a single recipe preview card.
   * Highlights the preview when it matches the current hash id.
   * @returns {string} Preview list item markup.
   */
  _generateMarkUp() {
    const hash = window.location.hash.slice(1);

    return `
      <li class="preview">
          <a class="preview__link ${this._data.id === hash ? 'preview__link--active' : ''}" href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" loading="lazy" decoding="async" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
       </li>`;
  }
}

export default new PreviewView();
