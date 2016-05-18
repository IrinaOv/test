$(function(){
		$('.eye').height($('.eye').width()*1);
		$('.black_eye').height($('.black_eye').width()*1);
		$(window).resize(function(){
			 $('.eye').height($('.eye').width()*1);
			 $('.black_eye').height($('.black_eye').width()*1);
		});
	$(window).mousemove(function (pos) { 
		var scrollTop=window.pageYOffset*100/$(document).height();
		var left=pos.pageX*100/$(document).width()-8;
		var top=pos.pageY*100/$(document).height();
		pupil_left=left;
		pupil_top=top;
		if(left<5){
			pupil_left=5;
		}
		if(left>80){
			pupil_left=80;
		}
		if(top<3){
			pupil_top=5;
		}
		if(top>75){
			pupil_top=75;
		}
			$(".black_eye").css('left',pupil_left+'%').css('top',pupil_top+'%');
			console.log(left);
			console.log(top);
		});
});