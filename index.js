// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

fetch('https://hutils.loxal.net/whois')
  // Extract JSON body content from HTTP response
  .then((response) => response.json())
  // Do something with the JSON data
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    var result = JSON.stringify(data, null, 2);
    appDiv.innerHTML += result;
  });
