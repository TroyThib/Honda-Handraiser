var BUTTON = "";

//GA Scripts
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
//Document Ready
$(document).ready(function() {
	$("#copyYear").html((new Date).getFullYear());
	var img = "";
	function QS(key, default_){
		if (default_==null) default_="";
		key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
		var qs = regex.exec(window.location.href);
		if(qs == null)
			return default_;
		else
			return qs[1];
	}
	HR = QS("cell","");
	if(HR=="") HR = data.default.HR;
	HR = HR.toLowerCase();
	BUTTON = QS("button","none");
	BUTTON = BUTTON.toLowerCase();
	DISCOVER_POS = 0;
	EXPLORE_POS = 0;
	SHOP_POS = 0;
	EVENT = QS("event","none");
	EVENT = EVENT.toLowerCase();
	PID = QS("pid","none");
	FN = QS("name","none");
	YEAR = QS("year","2016");
	if(FN.length==0){
		FN = "none";
	}
	MOD = QS("vehicle","");
	MODorig = MOD;
	$("#logo a img").attr("src",data[HR].logo);
	var headline = data[HR].headline.specific;
	
	
	if(MOD=="default"||MOD=="Default"||MOD.length==0){
		MOD = data.default.MOD;
	}
	
	if(MOD.search("-") != -1){
        MODName = MOD.toUpperCase();
    }else if(MOD.indexOf(String.fromCharCode(43)) != -1){
    	MOD = MOD.replace(String.fromCharCode(43), "_");
    	MODName = MOD.split("_");
    	MODName = MODName[0].substring(0,1).toUpperCase() + MODName[0].substring(1) + " " + MODName[1].substring(0,1).toUpperCase() + MODName[1].substring(1);
    }else{
    	MODName = MOD.substring(0,1).toUpperCase() + MOD.substring(1);
    }
	
	MOD = MOD.toLowerCase();

	if(FN=="none"&&(MOD=="default"||MOD.length==0)){
		headline = data[HR].headline.noNameNoVehicle;
	}else if(FN=="none"&&(MOD!="default"||MOD.length!=0)){
		headline = data[HR].headline.noName;
	}else if(MOD=="default"||MOD.length==0){
		headline = data[HR].headline.noVehicle;
	}
	
	headline = headline.replace("[[FIRSTNAME]]",FN);
	headline = headline.replace("[[MODEL]]",MODName);
	MODFirstLetter = MODName.substr(0,1).toLowerCase();
	if((MODFirstLetter=="a"||MODFirstLetter=="e"||MODFirstLetter=="i"||MODFirstLetter=="o"||MODFirstLetter=="u")&&headline.search("new")<0){
		headline = headline.replace("driving a","driving an");
	}
	$("#salutation").html(headline);
	var sliders = "";
	for(i=1;i<6;i++){
		//console.log(MOD);
		//console.log(data[HR].carousel[MOD]);
		if(data[HR].carousel[MOD][i][YEAR]==undefined){
			sliders += "<li><a href='" + data[HR].carousel[MOD][i].link + "'><img alt='" + data[HR].carousel[MOD][i].alt + "' src='" + data[HR].carousel[MOD][i].img + "' /></a></li>";
		}else{
			sliders += "<li><a href='" + data[HR].carousel[MOD][i][YEAR].link + "'><img alt='" + data[HR].carousel[MOD][i][YEAR].alt + "' src='" + data[HR].carousel[MOD][i][YEAR].img + "' /></a></li>";
		}
		switch(data[HR].carousel[MOD][i].link){
			case "#shop":
				SHOP_POS = i-1;
				break;
			case "#explore":
				EXPLORE_POS = i-1;
				break;
			case "#discover":
				DISCOVER_POS = i-1;
				break;
		}
	}
	
	$("#slider1").html(sliders);
	$("#shopHeader").html(data[HR].shop.title);
	var titleText = data[HR].shop.titleText;
	if(MODorig==""){
		titleText = data[HR].shop.titleTextNoVehicle;
	}
	titleText = titleText.replace("[[MODEL]]",MODName);
	$("#shopHeaderText").html(titleText);
	//dynamic image
	img = (data[HR].shop.build[MOD]["img"+YEAR]!=undefined)?data[HR].shop.build[MOD]["img"+YEAR]:data[HR].shop.build[MOD].img;
	$("#buildYourHondaImg").attr("src",img).attr("alt",data[HR].shop.build[MOD].alt);
	$("#buildYourHondaText").html(data[HR].shop.build.text);
	$("#buildYourHonda a").attr("href",data[HR].shop.build[MOD].link);
	//dynamic image
	img = (data[HR].shop.compare[MOD]["img"+YEAR]!=undefined)?data[HR].shop.compare[MOD]["img"+YEAR]:data[HR].shop.compare[MOD].img;
	$("#compareModelsImg").attr("src",img).attr("alt",data[HR].shop.compare[MOD].alt);
	$("#compareModelsText").html(data[HR].shop.compare.text);
	$("#compareModels a").attr("href",data[HR].shop.compare[MOD].link);
	//dynamic image
	img = (data[HR].shop.offers[MOD]["img"+YEAR]!=undefined)?data[HR].shop.offers[MOD]["img"+YEAR]:data[HR].shop.offers[MOD].img;
	$("#offersImg").attr("src",img).attr("alt",data[HR].shop.offers[MOD].alt);
	$("#offersText").html(data[HR].shop.offers.text);
	$("#offers a").attr("href",data[HR].shop.offers[MOD].link);
	$("#paymentCalculator").attr("href",data[HR].shop.payments[MOD]);
	$("#requestQuote").attr("href",data[HR].shop.quotes[MOD]);
	//dynamic image
	img = (data[HR].shop.closerLook[MOD]["img"+YEAR]!=undefined)?(data[HR].shop.closerLook[MOD]["img"+YEAR]):(data[HR].shop.closerLook[MOD].img);	
	$("#closerLookImg").attr("src",img).attr("alt",data[HR].shop.closerLook[MOD].alt);
	var closerHeader = data[HR].shop.closerLook.header;
	if(MODorig.length==0){
		closerHeader = closerHeader.replace(" at the [[MODEL]]","");
	}else{
		closerHeader = closerHeader.replace("[[MODEL]]",MODName);
	}
	$("#closerLookHeader").html(closerHeader);
	closerText = "";
	if(MODorig==""){
		closerText = data[HR].shop.closerLook.textNoVehicle;
	}else{
		closerText = data[HR].shop.closerLook.text;
	}
	closerText = closerText.replace("[[MODEL]]",MODName);
	$("#closerLookText").html(closerText);
	$("#closerLookGallery").attr("href",data[HR].shop.closerLook[MOD].gallery);
	$("#closerLookBrochure").attr("href",data[HR].shop.closerLook[MOD].brochure);
	$("#closerLookFeatures").attr("href",data[HR].shop.closerLook[MOD].features);
	// Espanol Link - #closerLookEspanolLink
	$("#closerLookEspanolLink").attr("href",data[HR].shop.closerLook[MOD].espanol);
	if(HR=="pq"||HR=="br"){
		if(MODorig==""){
			$("#closerLookUpdates").attr("href",data[HR].shop.closerLook[MOD].updates).html("Get updates from Honda &raquo;");
		}else{
			$("#closerLookUpdates").attr("href",data[HR].shop.closerLook[MOD].updates).html("Get updates on the " + MODName + " &raquo;");
		}
	}else if(HR=="op"||HR=="go"){
		if(MODorig==""){
			$("#closerLookUpdates").attr("href",data[HR].shop.closerLook[MOD].updates).html("Get updates from Honda &raquo;");
		}else{
			$("#closerLookUpdates").attr("href",data[HR].shop.closerLook[MOD].updates).html("Get more updates from Honda &raquo;");
		}
	}else{
		$("#closerLookUpdates").attr("href",data[HR].shop.closerLook[MOD].updates).html("Get updates from Honda &raquo;");
	}
	
	img = (data[HR].shop.accessories[MOD]["imgs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["imgs"+YEAR][0]:data[HR].shop.accessories[MOD].imgs[0];
	$("#banner-image1").attr("src",img);	
	img = (data[HR].shop.accessories[MOD]["imgs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["imgs"+YEAR][1]:data[HR].shop.accessories[MOD].imgs[1];
	$("#banner-image2").attr("src",img);
	img = (data[HR].shop.accessories[MOD]["imgs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["imgs"+YEAR][2]:data[HR].shop.accessories[MOD].imgs[2];
	$("#banner-image3").attr("src",img);
	img = (data[HR].shop.accessories[MOD]["thumbs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["thumbs"+YEAR][0]:data[HR].shop.accessories[MOD].thumbs[0];
	$("#accessorize_thumb_1").attr("src",img);
	img = (data[HR].shop.accessories[MOD]["thumbs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["thumbs"+YEAR][1]:data[HR].shop.accessories[MOD].thumbs[1];
	$("#accessorize_thumb_2").attr("src",img);
	img = (data[HR].shop.accessories[MOD]["thumbs"+YEAR]!=undefined)?data[HR].shop.accessories[MOD]["thumbs"+YEAR][2]:data[HR].shop.accessories[MOD].thumbs[2];
	$("#accessorize_thumb_3").attr("src",img);
	$("#accessoryTitle").html(data[HR].shop.accessories.title);
	var accessoryText = data[HR].shop.accessories.text;
	if(MODorig==""){
		accessoryText = data[HR].shop.accessories.textNoVehicle;
	}
	accessoryText = accessoryText.replace("[[MODEL]]",MODName);
	$("#accessoryText").html(accessoryText);
	$("#accessorize_link").html('<a href="'+data[HR].shop.accessories[MOD].link+'">See our latest &raquo;</a>');
	
	$("#modal_btn_1").attr("src",data.discover[0].img).attr("alt",data.discover[0].title);
	$("#modal_btn_1_title").html(data.discover[0].title);
	$("#modal_1_title").html(data.discover[0].title);
	$("#modal_btn_1_text").html(data.discover[0].text);
	$("#modal_btn_1_link").html(" <a href='" + data.discover[0].link + "'>" + data.discover[0].linkText + "</a>");
	$("#modal_btn_2").attr("src",data.discover[1].img).attr("alt",data.discover[1].title).click(function(e){
		//this code will need to be removed if they put a video back in - this is for making pic link where the link from the text goes.
		e.preventDefault();
		window.open(data.discover[1].link);
	});
	$("#modal_btn_2_title").html(data.discover[1].title);
	$("#modal_2_title").html(data.discover[1].title);
	$("#modal_btn_2_text").html(data.discover[1].text);
	$("#modal_btn_2_link").html(" <a href='" + data.discover[1].link + "'>" + data.discover[1].linkText + "</a>");
	$("#modal_btn_4").attr("src",data.explore[0].img).attr("alt",data.explore[0].title);
	$("#modal_btn_4_title").html(data.explore[0].title);
	$("#modal_4_title").html(data.explore[0].title);
	$("#modal_btn_4_text").html(data.explore[0].text);
	$("#modal_btn_4_link").html(" <a href='" + data.explore[0].link + "'>" + data.explore[0].linkText + "</a>");
	$("#modal_btn_5").attr("src",data.explore[1].img).attr("alt",data.explore[1].title);
	$("#modal_btn_5_title").html(data.explore[1].title);
	$("#modal_5_title").html(data.explore[1].title);
	$("#modal_btn_5_link").html(" <a href='" + data.explore[1].link + "'>" + data.explore[1].linkText + "</a>");
	$("#modal_btn_5_text").html(data.explore[1].text);
	$("#modal_btn_6").attr("src",data.explore[2].img).attr("alt",data.explore[2].title);
	$("#modal_btn_6_title").html(data.explore[2].title);
	$("#modal_6_title").html(data.explore[2].title);
	$("#modal_btn_6_text").html(data.explore[2].text);
	$("#modal_btn_6_link").html(" <a href='" + data.explore[2].link + "'>" + data.explore[2].linkText + "</a>");
	
	disclaimer = (data.disclaimer[MOD]["text"+YEAR]!=undefined)?data.disclaimer[MOD]["text"+YEAR]:data.disclaimer[MOD].text;
	$("#legalText").html(disclaimer);
	
/* START OF SCROLL TO ID :: This animates scrolling to an anchor link */	
	$("nav li,.rslides li").click(function() {
		var URL = $(this).find(':first-child').attr("href");
		var nav_h = $('nav').height() + 0;
		if (URL.substring(0, 1) == '#'){ 
			URL = URL.substring(1);
			if(URL == 'top'){
				$('html,body').animate({scrollTop: 0},'slow');
			}else{
				var aTag = $("div[id='"+ URL +"']");
				$('html,body').animate({scrollTop: aTag.offset().top + -10},'slow');
				if ($(window).width() <= 625) {  
					$('html,body').animate({scrollTop: aTag.offset().top + -60},'slow');
				}
			}
		}else return;
	});
/* END OF SCROLL TO ID */	
 
/* This changes the opacity of the nav button onClick */	
	$('nav img').click(function(event) {
		var ID = event.target.id;
		$('nav li img').css({ opacity: .5 });
		$(this).css({ opacity: 1 });
	});
// START OF responsiveSlides
	$(function() {
		$("#slider1").responsiveSlides({
			auto: true,
			pager: true,
			nav: true,
			speed: 900,
			timeout: 5000,  
			//maxwidth: 800,
			namespace: "centered-btns"
		  });
	});
// END OF responsiveSlides

/* This set the hight of the .small_module DIVs */
	function set_small_module_module_content_height(){
		$('.small_module .module_content').height('inherit');
		var max_h = 0;
		$('.small_module').each(function(i, obj) {
			var h = $('.module_content',obj).height();
			if(h >= max_h){max_h = h;}
		});
		$('.small_module .module_content').height(max_h);
	}
/* This set the hight of the .medium_module DIVs */  
	function set_medium_module_module_content_height(){
		$('.medium_module .module_content').height('inherit');
		var max_h = 0;
		$('.medium_module').each(function(i, obj) {
			var h = $('.module_content',obj).height();
			if(h >= max_h){max_h = h;}
      	});
    	$('.medium_module .module_content').height(max_h);
	}
// START OF ACCESSORIES GALLERY
	$( '.accessorize_thumb' ).click( function( event ) {
		$(".accessorize_thumb").removeClass("accessorize_thumb_on");
		$(event.target).addClass("accessorize_thumb_on");
		var id = String( event.target.id ).replace( /[^0-9]+/gmi, '' ) - 1;
		var phase = 'end';
		var direction = id > currentImg ? 'left' : 'right';
		var difference = Math.abs( id - currentImg );
		
		if( id !== currentImg ){
			if( difference === 1 )
				swipeHandler( null, phase, direction, null );
			else
				for( var i = 0; i < difference; i++ )
					swipeHandler( null, phase, direction, null );
		}
	});
// END OF ACCESSORIES GALLERY
// START OF MODAL SCRIPT
	var iframe_URL = [];
	iframe_URL[1] = data.discover[0].vid;
	iframe_URL[2] = data.discover[1].vid;
	iframe_URL[4] = data.explore[0].vid;
	iframe_URL[5] = data.explore[1].vid;
	iframe_URL[6] = data.explore[2].vid;
// if view port is small do not show modal. Change buttn URL to directly link to YT video 
	$('.modal_btn').click(function(event) {
		var ID = event.target.id;
		var MODAL_NUM = ID.charAt(ID.length - 1);
		var iframe_ID = "#modal_iframe_"+MODAL_NUM;
		var autoplay_URL = iframe_URL[MODAL_NUM]+"&autoplay=1";
		$('#modal_'+MODAL_NUM).plainModal('open', {duration: 500});
		$(iframe_ID).attr("src",autoplay_URL);
	}); 
    $('.close_modal_btn').click(function(event) {
	    var ID = event.target.id;
	    var MODAL_NUM = ID.charAt(ID.length - 1);
	    var iframe_ID = "#modal_iframe_"+MODAL_NUM;
	    $(iframe_ID).attr("src","");
        $('#modal_'+MODAL_NUM).plainModal('close', {duration: 500});
    });
// END OF MODAL SCRIPT
// START OF MOBILE SCRIPT
	function size_slideshow_images(){
		$('.banner_right span').hide();
		$("#accNav").width($("#banner-gallery").width());
		$(".modal_link").show();
		$(".socialIcons").css("width","327px");
		$(".socialIcon").css("margin-right","45px");
		$(".socialIcon:nth-child(4)").css("margin-right","0px");
		if ($(window).width() <= 625) {
			if($(window).width()<=498){
				$('#modal_btn_1_text').hide();
				$(".socialIcons").css("width","252px");
				$(".socialIcon").css("margin-right","20px");
				$(".socialIcon:nth-child(4)").css("margin-right","0px");
			}else{
				
			}
			$("#slider1 li a img").each(function(){
	   			var src = $(this).attr("src");
	   			if(src.indexOf("/ss/m/")<0){
			   		src = src.replace("/ss/","/ss/m/");
		   			$(this).attr("src",src);
	   			}
		   });
		}else{
       		if($(window).width()<=955){
				
			}else{
				$('.banner_right span').show();
			}
       		$("#slider1 li a img").each(function(){
	   			var src = $(this).attr("src");
	   			if(src.indexOf("/ss/m/")>0){
		   			src = src.replace("/ss/m/","/ss/");
		   			$(this).attr("src",src);
	   			}
		   });
			set_small_module_module_content_height();
			set_medium_module_module_content_height();
       }  
	};
  
	function show_hide_mobile_nav(show_hide){
		if ($(window).width() <= 625){
			if(show_hide == 'show'){  
				$("nav").animate({top:"0px"}); // show nav at top of page
			}else{ 
				var nav_h = $('nav').height();
				$("nav").animate({top:-nav_h}); 
			}
		}
	};
	size_slideshow_images();
	$(window).resize(function(){
		size_slideshow_images();
	});
/* START OF YOUTUBE VIDEO */
	var player1;
	var player2;
	var player3;
	var player4;
	var player1_url = 'http://www.youtube.com/embed/lKG4hu8TnHQ?enablejsapi=1';
	var player2_url = 'http://www.youtube.com/embed/Z8jM3wJS7Ho?enablejsapi=1';;
	var player3_url = 'http://www.youtube.com/embed/Z8jM3wJS7Ho?enablejsapi=1';;
	var player4_url = 'http://www.youtube.com/embed/cbxnH8NXPAg?enablejsapi=1';;
	function onYouTubeIframeAPIReady() {
		player1 = new YT.Player('modal_iframe_1', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});
		player2 = new YT.Player('modal_iframe_2', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});
		player3 = new YT.Player('modal_iframe_3', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});
		player4 = new YT.Player('modal_iframe_4', {events: {'onReady': onPlayerReady,'onStateChange': onPlayerStateChange}});
	}
	function onPlayerReady(event) {}
	var done = false;
	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING && !done) {done = true;}
	}
	  
	function stopVideo(){
		$("#modal_iframe_1").attr("src","");
		$("#modal_iframe_2").attr("src","");
		$("#modal_iframe_3").attr("src","");
		$("#modal_iframe_4").attr("src","");
		$("#modal_iframe_5").attr("src","");
		$("#modal_iframe_6").attr("src","");
	}

	$("html").click(function(){stopVideo();});
	$('body').children().click(function(ev) {ev.stopPropagation();});
	if($('.modal').css('display') == 'none' ){stopVideo();}
/* END OF YOUTUBE VIDEO */  
/* Request a Quote */
	//$('#zip').on('keypress', function(evt) {
	//var charCode = (evt.which) ? evt.which : event.keyCode;
	//return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
	//});
/* Accessorize gallery script  */
	var swipeOptions = {
			triggerOnTouchEnd: true,
			swipeStatus: swipeHandler,
			allowPageScroll: "vertical",
			threshold: 75
		};
	var IMG_WIDTH = 440;
	var currentImg = 0;
	var maxImages = 3;
	var speed = 500;
	var imgs = $("#imgs");
	var imgsTotal = $( imgs	 ).find( 'img' ).length;

	$( '#imgs' ).css( 'width', ( IMG_WIDTH * imgsTotal ) + 'px' );

	function swipeHandler( event, phase, direction, distance ){
		if(phase == "move" && (direction == "left" || direction == "right")) {
			var duration = 0;
		
			if (direction == "left"){
				scrollImages((IMG_WIDTH * currentImg) + distance, duration);
			}else if (direction == "right"){
				scrollImages((IMG_WIDTH * currentImg) - distance, duration);
			}
		}else if(phase == "cancel"){
			scrollImages(IMG_WIDTH * currentImg, speed);
		}else if (phase == "end"){
			if (direction == "right"){
				previousImage();
			}else if (direction == "left"){
				nextImage();
			}
		}
	}
	function previousImage() {
		currentImg = (currentImg-1<0)?maxImages-1:currentImg-1;
		scrollImages(IMG_WIDTH * currentImg, speed);
		$(".accessorize_thumb").removeClass("accessorize_thumb_on");
		$($(".accessorize_thumb")[currentImg]).addClass("accessorize_thumb_on");
	}

	function nextImage() {
		currentImg = (currentImg+1>maxImages-1)?0:currentImg+1;
		scrollImages(IMG_WIDTH * currentImg, speed);
		$(".accessorize_thumb").removeClass("accessorize_thumb_on");
		$($(".accessorize_thumb")[currentImg]).addClass("accessorize_thumb_on");
	}
	function scrollImages(distance, duration) {
		imgs.css("transition-duration", (duration / 1000).toFixed(1) + "s");
		//inverse the number we set in the css
		var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
		imgs.css("transform", "translate(" + value + "px,0)");
	}
	imgs.swipe( swipeOptions );
	
	$("#accNavLeft").click(previousImage);
	$("#accNavRight").click(nextImage);
});

//Window load
$(window).load(function(){
	switch(BUTTON){
		case "shop":
			$(".centered-btns1_tabs").find('a').eq(SHOP_POS).trigger('click');
			break;
		case "explore":
			$(".centered-btns1_tabs").find('a').eq(EXPLORE_POS).trigger('click');
			break;
		case "discover":
			$(".centered-btns1_tabs").find('a').eq(DISCOVER_POS).trigger('click');
			break;
	}
	
	ga('create', 'UA-59563779-1', 'auto');
	ga('send', 'pageview');
	
	$("#centered-btns1_s0 a").click(function(event){
		ga('send', 'event', 'carousel', 'jump', 'shop_jump');
	  });
	  $("#centered-btns1_s1 a").click(function(event){
		ga('send', 'event', 'carousel', 'click', 'vehicle');
	  });
	  $("#centered-btns1_s2 a").click(function(event){
		ga('send', 'event', 'carousel', 'click', 'toolscompare');
	  });
	  $("#centered-btns1_s3 a").click(function(event){
		ga('send', 'event', 'carousel', 'jump', 'discover_jump');
	  });
	  $("#centered-btns1_s4 a").click(function(event){
		ga('send', 'event', 'carousel', 'jump', 'explore_jump');
	  });
	  $("#buildYourHonda a").click(function(event){
		ga('send', 'event', 'shop', 'click', 'build');
	  });
	  $("#compareModels a").click(function(event){
		ga('send', 'event', 'shop', 'click', 'compare');
	  });
	  $("#offers a").click(function(event){
		ga('send', 'event', 'shop', 'click', 'offers');
	  });
	  $("#paymentCalculator").click(function(event){
	  	ga('send', 'event', 'shop', 'click', 'payments');
	  });
	  $("#requestQuote").click(function(event){
	  	ga('send', 'event', 'shop', 'click', 'quote');
	  });
	  $("#closerLookGallery").click(function(event){
	  	ga('send', 'event', 'shop_closer', 'click', 'gallery');
	  });
	  $("#closerLookFeatures").click(function(event){
	  	ga('send', 'event', 'shop_closer', 'click', 'brochure');
	  });
	  $("#closerLookBrochure").click(function(event){
	  	ga('send', 'event', 'shop_closer', 'click', 'features');
	  });
	  $("#closerLookUpdates").click(function(event){
	  	ga('send', 'event', 'shop_closer', 'click', 'getupdates');
	  });
	  $("#accessorize_thumb_1").click(function(event){
	  	ga('send', 'event', 'shop_access', 'click', 'access1');
	  });
	  $("#accessorize_thumb_2").click(function(event){
	  	ga('send', 'event', 'shop_access', 'click', 'access2');
	  });
	  $("#accessorize_thumb_3").click(function(event){
	  	ga('send', 'event', 'shop_access', 'click', 'access3');
	  });
	  $("#accessorize_link").click(function(event){
	  	ga('send', 'event', 'shop_access', 'click', 'accessTXT');
	  });
	  $("#modal_btn_1").click(function(event){
	  	ga('send', 'event', 'discover', 'video', 'asimoVID');
	  });
	  $("#modal_btn_1_link").click(function(event){
	  	ga('send', 'event', 'discover', 'click', 'asimoTXT');
	  });
	  $("#modal_btn_2").click(function(event){
	  	ga('send', 'event', 'discover', 'click', 'lanewatch');
	  });
	  $("#modal_btn_2_link").click(function(event){
	  	ga('send', 'event', 'discover', 'click', 'lanewatchTXT');
	  });
	  $("#modal_btn_4").click(function(event){
	  	ga('send', 'event', 'explore', 'video', 'incommunityVID');
	  });
	  $("#modal_btn_4_link").click(function(event){
	  	ga('send', 'event', 'explore', 'click', 'incommunityTXT');
	  });
	  $("#modal_btn_5").click(function(event){
	  	ga('send', 'event', 'explore', 'video', 'inserviceVID');
	  });
	  $("#modal_btn_5_link").click(function(event){
	  	ga('send', 'event', 'explore', 'click', 'inserviceTXT');
	  });
	  $("#modal_btn_6").click(function(event){
	  	ga('send', 'event', 'explore', 'video', 'inmusicVID');
	  });
	  $("#modal_btn_6_link").click(function(event){
	  	ga('send', 'event', 'explore', 'click', 'inmusicTXT');
	  });
	  
	  $("#linkFacebook").click(function(event){
	  	event.preventDefault();
	  	ga('send','event','social','click','facebook');
	  });
	  $("#linkTwitter").click(function(event){
	  	event.preventDefault();
	  	ga('send','event','social','click','twitter');
	  });
	  $("#linkYouTube").click(function(event){
	  	event.preventDefault();
	  	ga('send','event','social','click','youtube');
	  });
	  $("#linkPinterest").click(function(event){
	  	event.preventDefault();
	  	ga('send','event','social','click','pinterest');
	  });
	  
	  $("#linkHonda").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'hondacom');
	  });
	   $("#linkHonda2").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'ahm');
	  });
	   $("#linkHondaES").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'espanol');
	  });
	   $("#linkCustomerService").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'faqs');
	  });
	   $("#linkOwnerResources").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'owner_resources');
	  });
	   $("#linkMobileSite").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'mobilesite');
	  });
	   $("#linkPrivacy").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'privacy');
	  });
	   $("#linkTerms").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'terms');
	  });
	   $("#linkHondaWorldwide").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'worldwide');
	  });
	   $("#linkAdChoices").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'footer', 'click', 'adchoicesahm');
	  });
	  
	  /* Main Nav */
	  
	  $("#linkMainNavHome").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'main_nav', 'click', 'nav1');
	  });
	  
	 $("#linkMainNavShop").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'main_nav', 'click', 'nav2');
	  });
	  
	  $("#linkMainNavDiscover").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'main_nav', 'click', 'nav3');
	  });
	  
	  $("#linkMainNavExplore").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'main_nav', 'click', 'nav4');
	  });
	  
	  /* Spanish #closerLookEspanolLink */
	  
	  $("#closerLookEspanolLink").click(function(event){
	  	event.preventDefault();
	  	ga('send', 'event', 'shop_closer', 'click', 'espanol');
	  });
	  
	  ga('set','pid',PID);
	  ga('set','vehicle',MOD);
	  ga('set','cell',HR);
	  
	  $("a").click(function(event){
	  		event.preventDefault();
			var h = event.currentTarget;
			h = $(h).attr("href");
			if(h.substr(0,1)!="#"){
				window.open(h);
			}
	  });
});

  



 
