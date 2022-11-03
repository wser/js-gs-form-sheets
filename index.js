// Import stylesheets
import './style.css';

// google script path
// tutorial: https://github.com/MusabDev/save-html-form-to-google-sheets
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzkIeAzPnqCkJXkGi4hSZQ9rDGweR8mgMA3oqQiD40jivRmt5pAC7WSP2Htn4PmKa_1/exec';

// Write Javascript code!
const $ = (e) => document.querySelector(e);

const appDiv = $('#app');
const form = $('#form');

appDiv.innerHTML = `<h1>JS Starter</h1>`;

fetch('https://hutils.loxal.net/whois')
  .then((response) => response.json()) // Extract JSON body content from HTTP response
  // Do something with the JSON data
  .then((data) => {
    Object.entries(data).forEach( ([key, value]) => $(`[name='${key}']`) = value );
  })
  .then(() => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then((response) => console.log('Success!', response))
        .then(() => form.reset())
        .catch((error) => console.error('Error!', error.message));
    });
  });
