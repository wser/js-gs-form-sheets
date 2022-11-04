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
const transformString = (e) => {
  /* prettier-ignore */
  const capitalize = (str) => 
    str.toLowerCase().replace(/\w{3,}/g, (match) => match.replace(/\w/, (m) => m.toUpperCase()));
  return capitalize(e.replace(/([a-z0-9])([A-Z])/g, '$1 $2'));
};

const createForm = () => {
  let form = dc('form');
  form.method = 'post';
  form.action = 'submit';
  form.id = 'form';
  return form;
};

const createBtnSubmit = () => {
  let btn = dc('input');
  btn.type = 'submit';
  btn.name = 'submit';
  btn.value = 'Send';
  return btn;
};

const makeInputField = (key, value = '', type = 'text', visible = true) => {
  let input = dc('input');
  if (key.endsWith('*')) input.required = true;
  input.name = key;
  input.type = type;
  input.placeholder = transformString(key);
  input.value = value; // fill the field with string
  input.style.marginRight = '4px';
  if (!visible) input.style.display = 'none';
  return input;
};

const composeForm = (arr) => {
  let form = createForm(); // Create a form dynamically
  for (let item of arr) form.append(makeInputField(item)); // Create input fields from array
  return form;
};

const createApp = () => {
  const appDiv = $('#app'); // select app div

  appDiv.innerHTML = `<h1>JS Starter</h1><hr><br/>`; // add the HTML header line

  const emptyFields = ['email*', 'firstName', 'lastName']; // array of empty fields

  let form = composeForm(emptyFields); // create fundamental fields

  /* prettier-ignore */
  fetch(ipCheck) // fetch ip data
    .then((response) => response.json()) // extract JSON body content from HTTP response
    .then((data) => {// do something with the JSON data
      Object.entries(data).forEach(([key, value]) => {
        try { let prefilled = makeInputField(key, value, 'text', false) // prefill input fields
              form.append(prefilled) } // append each field to form
        catch (err) {console.log('GREŠKA:', err); }
      });
      form.append(createBtnSubmit()); // append submit button to the form
    });

  // post data to google sheets
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) }) // fetch & post google script
      .then((response) => console.log('Success!', response))
      .then(() => form.reset())
      .catch((error) => console.error('Error!', error.message));
  });

  appDiv.append(form); // add the generated form to div
};

createApp();
