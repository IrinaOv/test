$(document).ready(function(){
	idBook= window.location.hash.replace("#","");
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/book/'+idBook,
		success: function(books){
			$('.forma_book').append('<a href="book.html#'+idBook+'"><img src="'+books.cover.small+'"></a>');
			$('.forma_book').attr('data-price',books.price);
			$('a.name_book').append(books.title);
			$('a.name_book').attr('href','book.html#'+idBook);
			$('.summ span').attr('data-count',$('.forma_book').attr('data-price'));	
			$('.summ span').text($('.summ span').attr('data-count')+'Z');	
		}
	})
	var p=false;
	var s=false;
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/delivery',
		success:function(delivery){
			delivery.forEach(function(item,i){
				$('.delivery').append('<p><input type="radio" name="доставка" value="'+item.name+'" data-price="'+item.price+'">'+item.name+' - '+item.price+'Z'+'</p>')
			})
			$('input:radio[name=доставка]').on('change', function (){
				priceBook=$('.forma_book').attr('data-price');
				prise1=parseFloat(priceBook);
				price2=parseFloat($(this).attr('data-price'));
				price=prise1+price2;
				$('.summ span').attr('data-count',price);
				$('.summ span').text($('.summ span').attr('data-count')+'Z');
				p=true;
			})
		}
	})
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/payment',
		success:function(payment){
			payment.forEach(function(item,i){
				$('.payment').append('<p><input type="radio" name="оплата" value="'+item.title+'">'+item.title+'</p>');
			});
			$('input:radio[name=оплата]').on('change', function () {
				p=true;
			});
		}
	});
	$('button.order').on('click',function(){
		$('.error_forma').text('');
		if($('input[name=Имя]').val()==''||$('input[name=Телефон]').val()==''||$('input[name=почта]').val()==''){
			$('.error_forma').append('<span>Заполните поля Имя, Телефон, Эл.адрес</span>');
			s=false;
		}
		else{
			s=true;
			if(!$.isNumeric($('input[name=Телефон]').val())||$('input[name=Телефон]').val().length!==11){
				$('.error_forma').append('<span>Введите номе телефона в формате 79999999999</span>');
				s=false;
			}
			var post = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if(post.test($('input[name=почта]').val())){
			}else
			{
				$('.error_forma').append('<span>Не верно введен электронный адрес</span>');
				s=false;
			}
		}
		if(p==false){
			$('.error_forma').append('<span>Выберете способ доставки и способ оплаты</span>');
		}
		if(s==true && p==true){

			console.log('все верно');
			
		}
	})

})