$('#instagram').on('pageinit', function()
{
	var url = "https://api.instagram.com/v1/media/popular?callback=?&amp;client_id=7e4c2629226e4a5185d400a95b482edc&amp;min_id=10";
	$.getJSON(url, function(images){
		$.each(images.data, funtion(index, photo){
			var item = "<li><img src='" + photo.images.standard_resolution.url + "' alte='" + photo.user.id + "' /></li>
			$("#instagram ul").append(item);
		});
	});
});