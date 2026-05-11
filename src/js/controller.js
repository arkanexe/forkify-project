import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import { MODAL_CLOSE_SEC } from './config.js';

/**
 * Loads and renders the recipe that matches the current hash id.
 * Also updates related UI sections like results highlighting and bookmarks.
 * @returns {Promise<void>}
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    bookmarkView.update(model.state.bookmarks);

    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);

    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

/**
 * Loads recipes for the current search query and renders the first results page.
 * @returns {Promise<void>}
 */
const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery().trim('');
    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

/**
 * Renders a specific page of search results.
 * @param {number} goToPage The page selected by the pagination controls.
 * @returns {void}
 */
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

/**
 * Updates servings in state and refreshes the currently rendered recipe.
 * @param {number} servings The new servings value requested by the user.
 * @returns {void}
 */
const controlServings = function (servings) {
  model.updateServing(servings);

  const { recipe } = model.state;
  recipeView.update(recipe);
};

/**
 * Toggles the bookmark status of the current recipe and refreshes related views.
 * @returns {void}
 */
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

/**
 * Renders bookmarks from the current model state.
 * @returns {void}
 */
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**
 * Uploads a user-created recipe, renders it, shows feedback, closes the modal,
 * and updates the browser URL with the new recipe id.
 * @param {Object.<string, string>} newRecipe Raw form data collected from the upload form.
 * @returns {Promise<void>}
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmarks);

    addRecipeView.renderMessage();

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error);
  }
};

/**
 * Registers all controller-to-view event subscriptions when the app starts.
 * @returns {void}
 */
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  addRecipeView.addHandlerUpload(controlAddRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

init();
