// Import stylesheets
import './style.css';

// google script path for web app script
// tutorial: https://github.com/MusabDev/save-html-form-to-google-sheets
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzkIeAzPnqCkJXkGi4hSZQ9rDGweR8mgMA3oqQiD40jivRmt5pAC7WSP2Htn4PmKa_1/exec';

const ipCheck = 'https://hutils.loxal.net/whois';

// Write Javascript code!
const $ = (e) => document.querySelector(e);

const appDiv = $('#app');
const form = $('#form');
const btn = $(`[name=submit]`);

const makeInputField = (key, value) => {
  let input = document.createElement('input');
  input.name = key;
  input.type = 'text';
  input.placeholder = key;
  input.value = value;
  input.style.marginRight = '4px';
  //input.style.display = "none"
  return input;
};

appDiv.innerHTML = `<h1>JS Starter</h1><hr><br/>`;
/* prettier-ignore */
fetch(ipCheck)
  .then((response) => response.json()) // Extract JSON body content from HTTP response
  // Do something with the JSON data
  .then((data) => {
    Object.entries(data).forEach(([key, value]) => {
      try { form.insertBefore(makeInputField(key, value), btn) } 
      catch (err) {console.log('GREŠKA:', err); }
    });
    // let obj = JSON.stringify(data, null, 2);
    // console.log(obj);
  });

// post data to google sheets
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => console.log('Success!', response))
    .then(() => form.reset())
    .catch((error) => console.error('Error!', error.message));
});
