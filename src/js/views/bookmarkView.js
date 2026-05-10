import previewView from './previewView.js';
import View from './View.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe annd bookmark it :)';
  _message = '';

  /**
   * Subscribes a handler that renders bookmarks once the page finishes loading.
   * @param {Function} handler Controller callback for bookmark initialization.
   * @returns {void}
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Creates markup for the bookmarks list.
   * @returns {string} Concatenated preview markup for bookmarked recipes.
   */
  _generateMarkUp() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
