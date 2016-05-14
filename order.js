$(document).ready(function(){
	idBook= window.location.hash.replace("#","");
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/book/'+idBook,
		success: function(books){
			$('.forma_book').append('<a href="book.html#'+idBook+'"><img src="'+books.cover.small+'"></a>')
			$('.forma_book').attr('data-price',books.price);
			$('a.name_book').append(books.title)
			$('a.name_book').attr('href','book.html#'+idBook);
			$('.summ span').attr('data-count',$('.forma_book').attr('data-price'));	
			$('.summ span').text($('.summ span').attr('data-count')+'Z');	
		}
	})
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/delivery',
		success:function(delivery){
			delivery.forEach(function(item,i){
				$('.delivery').append('<p><input type="radio" name="доставка" value="'+item.name+'" data-price="'+item.price+'">'+item.name+' - '+item.price+'Z'+'</p>')
			})
			$('input:radio[name=доставка]').on('change', function (){
				priceBook=$('.forma_book').attr('data-price')
				prise1=parseFloat(priceBook);
				price2=parseFloat($(this).attr('data-price'))
				price=prise1+price2;
				$('.summ span').attr('data-count',price)
				$('.summ span').text($('.summ span').attr('data-count')+'Z')
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