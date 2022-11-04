// Import stylesheets
import './style.css';

// google script path for web app script
// tutorial: https://github.com/MusabDev/save-html-form-to-google-sheets
const scriptURL =
  'https://script.google.com/macros/s/AKfycbzkIeAzPnqCkJXkGi4hSZQ9rDGweR8mgMA3oqQiD40jivRmt5pAC7WSP2Htn4PmKa_1/exec';

const ipCheck = 'https://hutils.loxal.net/whois';

// Write Javascript code!
const $ = (e) => document.querySelector(e);
const dc = (e) => document.createElement(e);

const appDiv = $('#app');
// const form = $('#form');
// const btn = $(`[name=submit]`);

const createForm = () => {
  let form = dc('form');
  form.method = 'post';
  form.action = 'submit';
  form.id = 'form1';
  return form;
};

const createBtn = () => {
  let btn = dc('input');
  btn.type = 'submit';
  btn.value = 'Send';
  return btn;
};

const makeInputField = (key, value = '', type = 'text') => {
  /* prettier-ignore */
  const capitalize = (str) =>
  str.toLowerCase().replace(/\w{3,}/g, (match) =>
    match.replace(/\w/, (m) => m.toUpperCase()));
  let proccWord = (str) =>
    capitalize(str.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));

  let input = dc('input');
  input.name = key;
  input.type = type;
  input.placeholder = proccWord(key);
  input.value = value;
  input.style.marginRight = '4px';
  //input.style.display = "none"
  return input;
};

const names = ['email', 'firstName', 'lastName'];

function composeForm() {
  var form = createForm(); // Create a form dynamically
  var s = createBtn(); // Create a submit button

  for (let item of names) form.append(makeInputField(item));

  form.append(s); // Append the button to the form
  return form;
}

appDiv.innerHTML = `<h1>JS Starter</h1><hr><br/>`; // add the header line

appDiv.appendChild(composeForm()) // add form to div
/* prettier-ignore */
// fetch(ipCheck) // fetch ip data
//   .then((response) => response.json()) // Extract JSON body content from HTTP response
//   .then((data) => // Do something with the JSON data
//     Object.entries(data).forEach(([key, value]) => {
//       try { form.insertBefore(makeInputField(key, value), btn) }
//       catch (err) {console.log('GREŠKA:', err); }
//     })
//   );

// // post data to google sheets
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//     .then((response) => console.log('Success!', response))
//     .then(() => form.reset())
//     .catch((error) => console.error('Error!', error.message));
// });
