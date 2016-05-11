function callbackWall(result) {
	for (var i=1; i<result.response.length; i++) {
		var from_id = result.response[i].from_id;
		var text = result.response[i].text;
		var date = new Date(0);
		date.setUTCSeconds(result.response[i].date);
		var day = date.getDate();
	    var month = date.getMonth() + 1;
	    var year = date.getFullYear();
	    var hour = date.getHours();
	    var mins = date.getMinutes();
		date = day + '.' + month + '.' + year + ' ' + hour + ':' + mins;

		$('.x-table').append("<tr class='x-row'><td><a href='http://new.vk.com/id" + from_id + "' target='_blank'>" + from_id + "</a></td><td>" + text + "</td><td>" + date + "</td></tr>");
	}
}

function getPostsFromWall(group_id, number, type) {
	var script = document.createElement('SCRIPT');
	script.src = "https://api.vk.com/method/wall.get?owner_id=-" + group_id + "&count=" + number + "&filter=" + type + "&param_v=5.52&callback=callbackWall";
	document.getElementsByTagName("head")[0].appendChild(script);
}

function saveFile(fileContents, fileName){
    var link = document.createElement('a');
    link.download = fileName;
    link.href = 'data:text/csv;charset=UTF-8,%EF%BB%BF' + fileContents;
    link.click();
    link.remove();
}

function generateFileName() {
	var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var mins = date.getMinutes();
    var fileName = 'exported_table_' + day + "." + month + "." + year + "_" + hour + "." + mins + '.csv';

    return fileName;
}

$(document).ready(function () {
	$('.x-wall').on('click', function() {
		$('.x-row').remove();
		var number = $('.x-number').val();
		var group_id = $('.x-group_id').val();
		var type = $('.x-type option:selected').val();

		getPostsFromWall(group_id, number, type);
	});

	$('.x-download').on('click', function(e) {
        var fileName = generateFileName();
        var csv = $('.x-table').table2CSV({
        	delivery:'value',
    		separator : ';'
    	});
    	var fileContent = encodeURIComponent(csv);
      	saveFile(fileContent, fileName);
	})
});
