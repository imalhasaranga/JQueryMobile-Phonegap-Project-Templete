var domainrequesting = "http://www.viditure.com/KEBY/";
var identification ="comviditurebyimsyntxfix";

var docid = "";
var docshort = "";
var nextpage = "";

var mediafileTaken = "";
var isvalidated = false;
var sessionid = "";


$(document).on('pageshow',function(){
	$(".homepagecont").css("visibility","visible");
});


$(document).on("pageshow","#Homepage",function(){
	$(window).on("resize",function () {
		middlecontent();
	});

	$(".checklogin").on("click",function(){
		var email = $("#emaillogin").val();
		var password = $("#passwordlog").val();
		password = CryptoJS.SHA256(password)+"";
		getlogin(email,password);
	});

	

	
});


$(document).on("pageshow","#recording",function(){
	$("#documentid").val(docshort);
	mediafileTaken = "";
});


$(function(){

	
	

});


//This function calles when the defined custom url shema is clicked
//url pattern ViditureMob://?Documentid=232323423&Documentshort=Kw3KD
/*
function handleOpenURL(url) {
	arrparams = url.match("^vidituremobapp://\\?Documentid=((.?)*)\\&Documentshort=((.?)*)\\&nextpage=((.?)*)$");
	docid = arrparams[1];
	docshort = arrparams[3];
	nextpage = arrparams[5];
  	console.log("Params" + arrparams);
}
*/














	