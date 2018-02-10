// Table of contents
// Pre-render: What is happening before things happen
// Render: What is being shown first
// Location: Get the user's location
// Fetch: Execute the search
// Render: Create the list
// Helpers: Helper functions

// Pre-render //////////////////////////////////////////////////////////////////
// Select element on page to edit
var wrapper = document.getElementById('rhs')

// Find users search query and decode
var query = decodeURIComponent(getUrlParam().q)

// Find relative link to logo image
var logoUrl = chrome.extension.getURL('logo.png')

// Render //////////////////////////////////////////////////////////////////////
wrapper.innerHTML = 
  `<div id="vetted">
    <a class="logo-link" href="https://vetted.springlaunch.com" target="blank">
      <img class="logo" src="${logoUrl}">
    </a>

    <br>
    
    <small class="between">
    <span><div id="count">0</div> results found for "${query}"</span>
    <a class="link" href="vetted.shanebodimer.com">see more results</a>
    </small>

    <div id="results" class="results">
      <div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
    </div>

  </div>` + wrapper.innerHTML

// Location ////////////////////////////////////////////////////////////////////
// If no location stored
if(!localStorage.getItem("state")) {

  // Get position, call function
  navigator.geolocation.getCurrentPosition(showPosition);

  // Get state from position
  function showPosition(position) {
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude+","+position.coords.longitude}&key=AIzaSyBWeMU1MHTGjl4QKTW7cUPZHOvXd5_zkfk`;
    var method = "GET";
    var shouldBeAsync = true;
    var request = new XMLHttpRequest();
    request.open(method, url, shouldBeAsync);
    request.send();
    
    // Execute on load and store
    request.onload = function () {
      var data = JSON.parse(request.responseText)
      localStorage.setItem("state", data.results[0].address_components[5].short_name)
    }
  }
}

// Fetch ///////////////////////////////////////////////////////////////////////
var url = "https://vetted.springlaunch.com/actions/search.php?query="+query;
var method = "GET";
var shouldBeAsync = true;
var request = new XMLHttpRequest();
request.open(method, url, shouldBeAsync);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send();

// Execute on load
request.onload = function () {

  // Store responses
  var status = request.status;
  var data = JSON.parse(request.responseText)

  // Create blank list
  var list = ""

  // Set length
  length = 0;
  if(data) {
    data.length > 4 ? length = 4 : length = data.length
  }

  // For each item
  for (var i = 0; i < length; i++) {

    // Create link if provided
    var link = `<a class="no-style">`
    var close = "</a>"
    if(data[i].Website) {
      var link = `<a class="no-style" href="${data[i].Website}" target="blank">`
      var close = "</a>"
    }

    // Calculate rating
    var rating = Math.round(data[i].Rating / 2)
    var stars = ""
    for (var j = 0; j < rating; j++) {
      stars += "★"
    }

    // Generate item
    list += `
    ${link}
    <div class="item">
      <div class="item-text">

        <span class="item-title">${data[i].BusinessName}</span>
        <span class="rating">${stars}</span><br>
        <span class="item-feature">
          <a style="no-style" href="mailto:${data[i].CompanyEmail}">${data[i].CompanyEmail}</a><br>
          Based in ${data[i].City}
          <div class="divider"></div>
        </span>

      </div>
    </div>
    ${close}
    `
  }

  //Select and update results
  var results = document.getElementById('results')
  results.innerHTML = list

  // If no results, clear loading icon
  if(length === 0) { results.innerHTML = "" }

  // Update count 
  document.getElementById('count').innerHTML = data.length
}

// Helpers /////////////////////////////////////////////////////////////////////
// Decode URL params
// https://www.sitepoint.com/get-url-parameters-with-javascript/
function getUrlParam() {
    // Get url
    var url = window.location.href.replace(/\+/g, '%20')
  
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1)
  
    // we'll store the parameters here
    var obj = {}
  
    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0]
  
      // split our query string into its component parts
      var arr = queryString.split('&')
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=')
  
        // in case params look like: list[]=thing1&list[]=thing2
        var paramNum = undefined
        var paramName = a[0].replace(/\[\d*\]/, function (v) {
          paramNum = v.slice(1, -1)
          return ''
        })
  
        // set parameter value (use 'true' if empty)
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1]
  
        // (optional) keep case consistent
        // paramName = paramName.toLowerCase();
        // paramValue = paramValue.toLowerCase();
  
        // if parameter name already exists
        if (obj[paramName]) {
          // convert value to array (if still string)
          if (typeof obj[paramName] === 'string') {
            obj[paramName] = [obj[paramName]]
          }
          // if no array index number specified...
          if (typeof paramNum === 'undefined') {
            // put the value on the end of the array
            obj[paramName].push(paramValue)
          }
          // if array index number specified...
          else {
            // put the value at that index number
            obj[paramName][paramNum] = paramValue
          }
        }
        // if param name doesn't exist yet, set it
        else {
          obj[paramName] = paramValue
        }
      }
    }
  
    return obj
  }













































