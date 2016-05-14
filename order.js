$(document).ready(function(){
	idBook= window.location.hash.replace("#","");
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/book/'+idBook,
		success: function(books){
			$('.forma_book').append('<a href="book.html#'+idBook+'"><img src="'+books.cover.small+'"></a>')
			$('a.name_book').append(books.title)
			$('a.name_book').attr('href','book.html#'+idBook);
			console.log(books);
			$('.summ span').append(books.price+'Z')
		}
	})
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/delivery',
		success:function(delivery){
			delivery.forEach(function(item,i){
				$('.delivery').append('<p><input type="radio" name="доставка" value="'+item.name+'">'+item.name+' - '+item.price+'Z'+'</p>')
			})
		}
	})
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/payment',
		success:function(payment){
			payment.forEach(function(item,i){
				$('.payment').append('<p><input type="radio" name="оплата" value="'+item.title+'">'+item.title+'</p>')
			})
		}
	})
	$('button.order').on('click',function(){
	})
})