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
    <a class="logo-link" href="vetted.shanebodimer.com" target="blank">
      <img class="logo" src="${logoUrl}">
    </a>

    <br>

    <small>
      0 results found for "${query}"
    </small>

    <div id="results" class="results">
      <div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
    </div>

  </div>` + wrapper.innerHTML

// Fetch ///////////////////////////////////////////////////////////////////////

// Render //////////////////////////////////////////////////////////////////////
var list = ""
for (var i = 0; i < 3; i++) {
  list += `
  <div class="item">
    <div class="item-img"></div>

    <div class="item-text">
      <span class="item-title">Joe's Veteran Surplus Shop</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...
      <span class="item-feature">
        Established 2013<br>
        Based in St. Louis<br>
       <div class="divider"></div>
     </span>
    </div>

  </div>
  `
}

console.log(list)
//Select and update element
var results = document.getElementById('results')
results.innerHTML = list

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













































