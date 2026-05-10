import previewView from './previewView.js';
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found  for your query! Please try again :)';
  _message = '';

  /**
   * Creates markup for the current page of search results.
   * @returns {string} Concatenated preview markup for result items.
   */
  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
