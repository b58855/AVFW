//Global
function Refresh()
{
	window.location.reload();
}

//Home
$('#home').on('pageinit', function(){
});

//Instagram
$('#instagramAPI').on('pageinit', function(){
	console.log('INSTAGRAM');
	
	DisplayInstaForm();
	$('#instagramAPI content div:last a:last').on('click', ReadInstaForm);
});

function DisplayInstaForm()
{
	console.log('INSTAFORM');
	
	$('#instagramAPI content div:last').html('<label>Search</label><br /><input></input><br /><a href="#">Submit</a>');
}

function ReadInstaForm()
{
	console.log('READINSTAFORM');
	$('#instagramAPI ul').html('');
	tag = $('#instagramAPI content div:last input').val();
	console.log(tag);
	DisplayInstaResults(tag)
}

function DisplayInstaResults(tag)
{
	var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&amp;client_id=26ec7cbb4b054d0a9a88b2e060566dd5&amp;min_id=10;';
		
	$.getJSON(url, function(info){
		console.log(info);
		console.log(info.data);
		
		$.each(info.data, function(index, photo){
			var pic = photo.images.standard_resolution.url;
			var link = photo.link;
			var user = photo.user.username;
			$('#instagramAPI ul').append('<li><a href="' + link + '"><img src="' + pic + '" alt="Sorry cannot load"/></a><p>' + user + '</p></li>');
		});
	});
}

//Wikilocation
$('#wikilocation').on('pageinit', function(){
	console.log('WIKILOCATION');
	$('#wikilocation content div:first>a:last').on('click', Refresh);
	
	DisplayWikiForm()
	$('#wikilocation content div:last a').on('click', ReadWikiForm);
});

function DisplayWikiForm()
{
	console.log('WIKIFORM');
	//turn link into a button
	$('#wikilocation content div:last').html('<label>Latitude</label><br /><input></input><br /><label>Longitude</label><br /><input></input><br /><a href="#">Submit</a>');
}

function ReadWikiForm()
{
	console.log('READWIKIFORM');
	
	var lat = $('#wikilocation content div:last input:first').val();
	var lng = $('#wikilocation content div:last input:last').val();
	console.log(lat + ' : ' + lng);
	
	DisplayWikiResults(lat, lng);
}

function DisplayWikiResults(lat, lng)
{
	console.log('DISPLAYRESULTS');
	var url = 'http://api.wikilocation.org/articles?lat=' + lat + '&lng=' + lng + '&limit=5';
	
	$('#wikilocation content div:last').html('<h4>Latitude: ' + lat + '</h4><h4>Longitude: ' + lng + '</h4>');
	
	$.getJSON(url, function(info){
		console.log(info);

		if(info.articles.length > 0)
		{	
			$.each(info.articles, function(index){
				$('#wikilocation content ul').append('<li><a href="' + info.articles[index].mobileurl + '" data-role="button">' + info.articles[index].title + '</a></li>');
				console.log(info.articles[index].title);
			});
		}
		else
		{
			$('#wikilocation content ul').append('<p>Sorry, there are no Wikipedia articles for this location.</p>');
		}
	});
}


//Geolocation
$('#geolocation').on('pageinit', function(){
	console.log('GEOLOCATION');
	navigator.geolocation.getCurrentPosition(GeoSuccess, GeoFail);
});

function GeoSuccess(position)
{
	console.log('GEO SUCCESS');
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var altitude = position.coords.altitude;
	var accuracy = position.coords.accuracy;
	var altAccuracy = position.coords.altitudeAccuracy;
	var heading = position.coords.heading;
	var speed = position.coords.speed;
	var time = new Date(position.timestamp);
	
	$('#geolocation content').html(
		'<h3>Your Current Location</h3><p>Latitude: ' + latitude + 
		'<br/>Longitude: ' + longitude + '</p><br/><img src="http://maps.google.com/maps/api/staticmap?center=' + latitude + ',' +longitude + '&zoom=13&size=540x280&maptype=roadmap&markers=color:red|' + latitude + ',' + longitude + '&sensor=false" width="540" height="280" alt="Map of your location." />'
	);
}

function GeoFail()
{
	console.log('GEO FAIL');
	$('#geolocation content').html('<p>Sorry there was a failure.</p>');
}


//Compass
//Can only start and stop compass once
//find way to stop compass on leaving page and restart on re-entering page
$('#compass').on('pageinit', function(){
	console.log('COMPASS');
	var option = { frequency: 200 };
	var compass = navigator.compass.watchHeading(CompassSuccess, CompassFail, option);
});

function CompassSuccess(heading)
{
	console.log('COMPASS SUCCESS');
	var magHeading = heading.magneticHeading;
	var direction = 'N/A';
	
	var rotation = 360 - magHeading;
	var degrees = 'rotate(' + rotation + 'deg)';
	$('#compassIMG').css('-webkit-transform', degrees);

	/*$('#compass content').html(
	'<p>Direction: ' + direction +
	'<br/>Magnetic Heading: ' + magHeading + '</p>');*/
}

function CompassFail()
{
	console.log('COMPASS FAIL');
	$('#compass content div:last').html('<p>Failure</p>');
}


//Notification
$('#notification #confirm').on('click', function(){
	console.log('CONFIRM NOTIFICATION');
	var num = Math.floor(Math.random() * 4);
	console.log(num);
	
	switch(num)
	{
		case 0:
			navigator.notification.confirm("How are you?", Confirm, "Greetings", "Bye");
			navigator.notification.beep(3);
			navigator.notification.vibrate(3000);
			break;
			
		case 1:
			navigator.notification.confirm("I am Notification.", Confirm, "My Name is:", "Nice to meet you.");
			navigator.notification.beep(3);
			navigator.notification.vibrate(3000);
			break;
			
		case 2:
			navigator.notification.confirm("This is a nice little party.", Confirm, "At a Party", "Fiesta Time");
			navigator.notification.beep(3);
			navigator.notification.vibrate(3000);
			break;
			
		case 3:
			navigator.notification.confirm("Hola, estás preciosa!", Confirm, "En Español", "Muy bien muchas gracias.");
			navigator.notification.beep(3);
			navigator.notification.vibrate(3000);
			break;
	}
});

function Confirm()
{
}


//Camera
$('#camera').on('pageinit', function(){
	console.log('CAMERA');
	navigator.camera.getPicture(CameraSuccess, CameraFail, { quality: 40, destinationType: Camera.DestinationType.FILE_URI });
});

function CameraSuccess(imageLoc)
{
	console.log('CAMERA SUCCESS');
	console.log(imageLoc);
	$('#camera content').html('<img src="' + imageLoc + '">');
}

function CameraFail()
{
	$('#camera content').html('<p>Sorry the image could not load</p>');
}