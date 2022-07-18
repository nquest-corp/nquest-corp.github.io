let api_key = prompt("Please enter API key for Schiphol", "");

if (api_key == null) {
	let api_key = "";
}

function addHeaders(table, keys) {
  var row = table.insertRow();
  for( var i = 0; i < keys.length; i++ ) {
    var cell = row.insertCell();
    cell.appendChild(document.createTextNode(keys[i]));
  }
}

function makeTable(table, json_data) {
	for( var i = 0; i < json_data.length; i++ ) {

  		var child = json_data[i];
  		if(i === 0 ) {
  		  addHeaders(table, Object.keys(child));
  		}
  		var row = table.insertRow();
  		Object.keys(child).forEach(function(k) {
  		  console.log(k);
  		  var cell = row.insertCell();
  		  cell.appendChild(document.createTextNode(child[k]));
  		})
	}
}

function getLinks(type) {

	switch(type) {
		case 'dev':
            channel = 'dev';
            all = 'True';
            break;
        case 'current_dev':
            channel = 'dev';
            all = 'False';
            break;
        case 'prod':
            channel = 'prod';
            all = 'True';
            break;
        case 'current_prod':
            channel = 'prod';
            all = 'False';
            break;
	}
	var table = document.getElementById("outputTable");
	table.innerHTML = "";

	var url = 'http://localhost:8080/download/links?channel=' + channel + '&all=' + all
	if (api_key != null) {
		url = url + '&api_key=' + api_key
	}

	fetch(url)
	.then(response => response.json())
	.then(out => makeTable(table, out));

}