const getLocationBtn = document.getElementById('getLocationBtn');
const removeLocationBtn = document.getElementById('removeLocationBtn');
const mapDiv = document.getElementById('map');

// check if latitude and longitude are already saved in local storage
if(localStorage.getItem('lat') && localStorage.getItem('long')) {
	// disable the getLocationBtn as location has already been fetched
	getLocationBtn.disabled = true;
	// retrieve the latitude and longitude from local storage
	const lat = localStorage.getItem('lat');
	const long = localStorage.getItem('long');
	// display the map with the saved location
	mapDiv.innerHTML = `<iframe
		width="600"
		height="450"
		style="border:0"
		loading="lazy"
		allowfullscreen
		src="https://maps.google.com/maps?q=28.6152977, 77.3640534&output=embed">
	</iframe>`;
}

// add event listener to getLocationBtn
getLocationBtn.addEventListener('click', () => {
	// check if geolocation is supported
	if(navigator.geolocation) {
		// get current position
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		// display error message if geolocation is not supported
		alert('Geolocation is not supported by your browser');
	}
});

// add event listener to removeLocationBtn
removeLocationBtn.addEventListener('click', () => {
	// remove lat and long from local storage
	localStorage.removeItem('lat');
	localStorage.removeItem('long');
	// enable the getLocationBtn
	getLocationBtn.disabled = false;
	// remove the map
	mapDiv.innerHTML = '';
});

// callback function to show the user's position
function showPosition(position) {
	// retrieve the latitude and longitude from the position object
	const lat = position.coords.latitude;
	const long = position.coords.longitude;
	// save the latitude and longitude in local storage
	localStorage.setItem('lat', lat);
	localStorage.setItem('long', long);
	// display the map with the user's location
	mapDiv.innerHTML = `<iframe
		width="600"
		height="450"
		style="border:0"
		loading="lazy"
		allowfullscreen
		src="https://maps.google.com/maps?q=28.6152977, 77.3640534&output=embed">
	</iframe>`;
	// disable the getLocationBtn as location has been fetched
	getLocationBtn.disabled = true;
}
