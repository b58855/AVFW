//Global
function Refresh()
{
	window.location.reload();
}

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
			var caption;
			if (photo.caption < 1)
			{
				caption = "";
			}
			else
			{
				caption = photo.caption.text;
			}
			var link = photo.link;
			var user = photo.user.username;
			$('#instagramAPI ul').append('<li><img src="' + pic + '" alt="Sorry cannot load"/><a href="' + link + '">' + link + '</a></li>');
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