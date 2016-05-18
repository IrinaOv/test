$(document).ready(function(){
	idBook= window.location.hash.replace("#","");
	var currency;
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/book/'+idBook,
		success: function(books){
			$('.forma_book').append('<a href="book.html#'+idBook+'"><img src="'+books.cover.small+'"></a>');
			$('.forma_book').attr('data-price',books.price);
			$('a.name_book').append(books.title);
			$('a.name_book').attr('href','book.html#'+idBook);
			$('.summ span').attr('data-count',$('.forma_book').attr('data-price'));	
			$('.summ span').text($('.summ span').attr('data-count')+'$');	
		}
	})
	var flagDelivery=false;
	var flagPayment=false;
	var flagInput=false;
	var flagAdress=true;
	$.ajax({
		url:'https://netology-fbb-store-api.herokuapp.com/order/delivery',
		success:function(delivery){
			delivery.forEach(function(item,i){
				$('.delivery').append('<p><input type="radio" name="доставка" value="'+item.name+'" data-price="'+item.price+'"data-address="'+item.needAdress+'"'+'data-id="'+item.id+'"data-delivery="'+item.currency+'">'+item.name+' - '+item.price+'$'+'</p>')
			})
			$('input:radio[name=доставка]').on('change', function (){
				priceBook=$('.forma_book').attr('data-price');
				prise1=parseFloat(priceBook);
				price2=parseFloat($(this).attr('data-price'));
				price=prise1+price2;
				$('.summ span').attr('data-count',price);
				$('.summ span').text($('.summ span').attr('data-count')+'$');
				flagDelivery=true;
				if($(this).attr('data-address')=='true')
				{
					$('form .adress').removeClass('disable');
					flagAdress=false;
				}
				else{
					$('form .adress').addClass('disable');
					flagAdress=true;
				}
				currency=$('input:radio[name=доставка]:checked').attr('data-delivery');
				$(".payment").text('Способ оплаты:');
					$.ajax({
					url:'https://netology-fbb-store-api.herokuapp.com/order/delivery/'+$('input:radio[name=доставка]:checked').attr('data-id')+'/payment',
					success:function(payment){
						payment.forEach(function(item,i){
							$('.payment').append('<p><input type="radio" name="оплата" value="'+item.title+'"data-id="'+item.id+'">'+item.title+'</p>');
						});
						$('input:radio[name=оплата]').on('change', function () {
							flagPayment=true;
						});
					}
				});
			})
		}
	})

	$('button.order').on('click',function(){
		$('.error_forma').text('');
		if($('input[name=Имя]').val()==''||$('input[name=Телефон]').val()==''||$('input[name=почта]').val()==''||$('textarea[name="Комментарий"]').val()==''){
			$('.error_forma').append('<span>Заполните поля Имя, Телефон, Эл.адрес, Комментарий</span>');
			flagInput=false;
		}
		else{
			flagInput=true;
			if(!$.isNumeric($('input[name=Телефон]').val())||$('input[name=Телефон]').val().length!==11){
				$('.error_forma').append('<span>Введите номе телефона в формате 79999999999</span>');
				flagInput=false;
			}
			var post = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if(post.test($('input[name=почта]').val())){
			}else
			{
				$('.error_forma').append('<span>Не верно введен электронный адрес</span>');
				flagInput=false;
			}
		}
		if (!$('form .adress').hasClass('disable') && $('form .adress textarea').val()==''){
			flagAdress=false;
			$('.error_forma').append('<span>Заполните поле адрес</span>');
		}
		else{
			flagAdress=true;
		}
		if(flagDelivery==false){
			$('.error_forma').append('<span>Выберете способ доставки</span>');
		}
		if(flagPayment==false){
			$('.error_forma').append('<span>Выберете способ оплаты</span>');
		}
		if(flagInput==true && flagPayment==true && flagAdress==true && flagDelivery==true){
				var post={
					'manager':'ovi@uvelirsoft.ru',
					'book':idBook,
					'name':$('input[name=Имя]').val(),
					'phone':$('input[name=Телефон]').val(),
					'email':$('input[name=почта]').val(),
					'comment':$('textarea[name=Комментарий]').val(),
					'delivery':{
						'id':$('input[name=доставка]:checked').attr('data-id'),
						'address':$('textarea[name=Адрес]').val()
					},
					'payment':{
						'id':$('input[name=оплата]:checked').attr('data-id'),
						'currency':currency
					}
					};
					$('.summ').empty();
					$('.row.row_forma').empty();
					$('.forma form').css('display','none');
					$('.row.row_forma').css('text-align','center');
					$('button.order').toggle();
				$.ajax({
					type:'POST',
					url:'https://netology-fbb-store-api.herokuapp.com/order',
					data:post,
					success:function(request){
						$('.row.row_forma').append('Ваш заказ успешно отправлен <a href="index.html">вернуться на главную</a>');
						$('.row.row_forma').css('margin-bottom',$(window).height()-$('html').height()+27+'px');
					},
					error:  function(){
						$('.row.row_forma').append('При отправке заказа произошла ошибка, повторите попытку позже <br><a href="index.html">вернуться на главную</a>');
          },
				})	
		}
	})

})