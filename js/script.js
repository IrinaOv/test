$(document).ready(function(){
var idBook;
$.ajax({
	url:'https://netology-fbb-store-api.herokuapp.com/book/',
	success: function(books){
		console.log(books)
		var p=0;
		var i=0;
		booksLoad=function(){
		 while(i<books.length && p!=4)
			{
				$('.row_books').append('<div class="book" id="'+books[i].id+'"><a href="book.html#'+books[i].id+'"><img src="'+books[i].cover.small+'"><div class="book-title">'+books[i].title+'</div></a></div>');
				p++;
				i++;
				if(i==books.length){
					$('.button').toggle()
				}
			}
		 }
		booksLoad();
		$('.button').on('click',function(){
			p=0;
			booksLoad();
		})

	}
});

})