// Import stylesheets
import './style.css';

// Write Javascript code!
const $ = (e) => document.querySelector(e);
const dc = (e) => document.createElement(e);

const autoLog = (ipCheck, scriptURL) => {
  ipCheck = 'https://hutils.loxal.net/whois';
  // google script path for web app script
  // tutorial: https://github.com/MusabDev/save-html-form-to-google-sheets
  scriptURL =
    'https://script.google.com/macros/s/AKfycbzkIeAzPnqCkJXkGi4hSZQ9rDGweR8mgMA3oqQiD40jivRmt5pAC7WSP2Htn4PmKa_1/exec';

  const createForm = () => {
    let form = dc('form');
    form.method = 'post';
    form.action = 'submit';
    form.id = 'form';
    return form;
  };

  const makeInputField = (key, value = '', type = 'text', visible = true) => {
    let input = dc('input');
    input.name = key;
    input.type = type;
    input.value = value; // fill the field with string
    if (!visible) input.style.display = 'none';
    return input;
  };

  let form = createForm(); // create form

  /* prettier-ignore */
  fetch(ipCheck) // fetch ip data
    .then((response) => response.json()) // extract JSON body content from HTTP response
    
    .then((data) => {// do something with the JSON data
      Object.entries(data).forEach(([key, value]) => {
        try { let prefilled = makeInputField(key, value, 'text', false) // prefill input fields
              form.append(prefilled) } // append each field to form
        catch (err) {console.log('GREŠKA:', err); }
      });
    })

    .then(() => appDiv.append(form)) // add the generated form to div

    .then(()=> {
      // automatically post data to google sheets
      fetch(scriptURL, { method: 'POST', body: new FormData(form) }) // fetch & post google script
      .then((response) => console.log('Success!', response))      
      .catch((error) => console.error('Error!', error.message));
    })

    .then(() => form.parentNode.removeChild(form)) // remove form from page
};

const appDiv = $('#app'); // select app div

appDiv.innerHTML = `<h1>JS Starter</h1><hr><br/>`; // add the HTML header line

autoLog();
