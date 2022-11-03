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
const btn = $(`[name=submit]`);

appDiv.innerHTML = `<h1>JS Starter</h1><hr><br/>`;
/* prettier-ignore */
fetch('https://hutils.loxal.net/whois')
  .then((response) => response.json()) // Extract JSON body content from HTTP response
  // Do something with the JSON data
  .then((data) => {
    Object.entries(data).forEach(([key, value]) => {
      try { 
        let input = document.createElement("input");
        input.name = key;
        input.type = "text";
        input.placeholder = key;
        input.value = value
        input.style.marginRight = "4px"

        form.insertBefore(input, btn)

        //form.appendChild(input))
        //$(`[name='${key}']`).value = value;
      } 
      catch (err) {console.log('GREŠKA:', err); }
    });
    // let obj = JSON.stringify(data, null, 2);
    // console.log(obj);
  });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then((response) => console.log('Success!', response))
    .then(() => form.reset())
    .catch((error) => console.error('Error!', error.message));
});
