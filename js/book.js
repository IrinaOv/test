$(document).ready(function(){
	idBook= window.location.hash.replace("#","");
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/book/'+idBook,
		success: function(books){
			$('.book_about').append('<img src="'+books.cover.large+'">');
			$('.book_top').append(books.description);
			for(var i=0;i<books.reviews.length;i++){
				$('.left').append('<div class="advantages"><img src="'+books.reviews[i].author.pic+'"'+'alt="'+books.reviews[i].author.name+'">«'+books.reviews[i].cite+'»</div>')
			}
			for(var i=0;i<books.features.length;i++){
				$('.right').append('<div class="advantages"><img src="'+books.features[i].pic+'"'+'alt=""'+'>«'+books.features[i].title+'»</div>')
			}
			$('.buy span').append(books.price+'$');
			$('.buy').on('click',function(){
				$(this).parent('a').attr('href','forma.html#'+idBook);
			})
		}
	})
})