// $.getJSON("/articles", function(data) {
// 	console.log(data);
//   // For each one
//   for (var i = 0; i < 20; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

$(".panel.panel-default").on("click", function(){
	$("#comments").empty();
	var thisID = $(this).attr("data-id");
	//alert(thisID);
	$.ajax({
		method: "GET",
		url: "/articles/" + thisID
	}).done(function(data){
		$("#comments").append("<h2>" + data.title + "</h2><br>");
		$("#comments").append("Name: <input id = 'user-name' name = 'name'><br>");
		$("#comments").append("Comment title: <input id = 'comment-title' name = 'title'><br>");
		$("#comments").append("Comment: <textarea id = 'body-input' name = 'body'></textarea><br>");
		$("#comments").append("<button data-id = '" + data._id + "' id = 'savecomment' >Save comment</button>");
		if(data.comment) {
			$("#user-name").val(data.comment.name);
			$("#comment-title").val(data.comment.title);
			$("#body-input").val(data.comment.body);
		}
	});
});

$(document).on("click", "#savecomment", function() {
	var thisID = $(this).attr("data-id");
	$.ajax({
		method: "POST",
		url: "/articles/" + thisID,
		data: {
			name: $("#user-name").val(),
			title: $("#comment-title").val(),
			body: $("#body-input").val()
		}
	}).done(function(data){
		console.log(data);
		$("#comments").empty()
	});

	$("#user-name").val("");
	$("#comment-title").val("");
	$("#body-input").val("");
});