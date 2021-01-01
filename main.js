import {
  clearPushListener,
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
} from './searchBar.js';
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchresults.js';
import { getSearchTerm, retrieveSearchResults } from './datafunctions.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // set the focus
  setSearchFocus();

  //  3 listeners clear text
  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);

  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);

  clear.addEventListener('keydown', clearPushListener);
  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

// procedural work flow function
const submitTheSearch = (event) => {
  event.preventDefault();
  //   delete search results
  deleteSearchResults();
  // process the search
  processTheSearch();
  // set the focus
  setSearchFocus();
};

// procedural
const processTheSearch = async () => {
  // clear the stats line
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) {
    //build search results
    buildSearchResults(resultArray);
  }

  // set stats line
  setStatsLine(resultArray.length);
};
