var domainrequesting = "http://www.viditure.com/KEBY/";
var identification ="comviditurebyimsyntxfix";

var docid = "";
var docshort = "";
var nextpage = "";

var mediafileTaken = "";
var isvalidated = false;
var sessionid = "";


$(document).on('pageshow',function(){
	middlecontent();
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

	

	var logindata = getDataArray();
	if(logindata.length > 0){
		var itemmx = logindata[0];
		$("#emaillogin").val(itemmx.email);
		$("#passwordlog").val(itemmx.email);
		
		getlogin(itemmx.email,itemmx.password);
	}
});


$(document).on("pageshow","#recording",function(){
	$("#documentid").val(docshort);
	mediafileTaken = "";
});


$(function(){

	
	$(".logoutrest").on("click",function(){
		logout();
	});

	$(".videorestart").on("click",function(){

		docshort = $("#documentid").val();

		if(docshort != ""){

			showLoading();
			setLoadingMessage("Validating Document");
			isValidDocShort(function(bool){

				if(bool){
					isvalidated = bool;
					setLoadingMessage("Validating Success!");
					hideLoading(function(){
						captureVideoGAPPLUGIN(function(mediaFiles){
							var i, len;
							for (i = 0, len = mediaFiles.length; i < len; i++) {
							var mediaFile = mediaFiles[i];
							mediafileTaken = mediaFile;
							$(".videorecorpic").empty();
							$(".videorecorpic").css("width", "100%");
							$(".videorecorpic").css("padding-top","0px");
							$(".videorecorpic").css("padding-bottom","0px");

							var videoplayer = "<video width=\"100%\" controls>"+
												  	"<source src=\""+mediaFile.fullPath+"\" >"+
													"Your browser does not support this video."+
											   "</video>";

							$(".videorecorpic").append(videoplayer);
							}
						});
					});
				}else{
					isvalidated =bool;
					hideLoading(function(){
						showMessage(function(){}, "Validating Failed", 1000, "ww");		
					});
					
				}

			});

			
		}
	});

	$(".usevideorec").on("click",function(){

		if((mediafileTaken != "") && ($("#documentid").val() != "")){
			showLoading();
			setLoadingMessage("File Is Being Uploaded..");
			var Params = new Object();
            Params.id = identification; 
			Params.docshort = docshort; 
			Params.docid = docid; 
			uploadVideoFile(mediafileTaken,domainrequesting+"DocVideouploadRest;jsessionid="+sessionid,Params,function(responddata){

				hideLoading(function(){
						showMessage(function(){

							window.location = domainrequesting+nextpage;

						}, "Done!!, Please Complete process in browser", 2000, "ss");		
					});
			});

		}

	});

});


//This function calles when the defined custom url shema is clicked
//url pattern ViditureMob://?Documentid=232323423&Documentshort=Kw3KD

function handleOpenURL(url) {
	arrparams = url.match("^vidituremobapp://\\?Documentid=((.?)*)\\&Documentshort=((.?)*)\\&nextpage=((.?)*)$");
	docid = arrparams[1];
	docshort = arrparams[3];
	nextpage = arrparams[5];
  	console.log("Params" + arrparams);
}



function middlecontent(){


	var windowheight = $(window).height();
	var contentheight = $(".homepagecont").height();
	if(windowheight > contentheight){

		var fix = (windowheight-contentheight)/2;
		fix = fix-40;
		$(".homepagecont").css("margin-top",fix+"px");
	}

}


function getlogin(email,password){

	if(validateEmail(email)){
		showLoading();
		setLoadingMessage("Login in..");
		$.post(domainrequesting+"Login", { "id" : identification, "email" : email, "password" : password }, function(data){
			
			if(data.MessageT == "-1"){
				hideLoading(function(){
					showMessage(function(){}, "Please activate this account", 1000, "ww");	
				});	
			}else if(data.MessageT == "-2"){
				hideLoading(function(){
					showMessage(function(){}, "Login failed", 1000, "ww");
				});
			}else if(data.MessageT == "1"){
				sessionid = data.sessionid;
				setLoadingMessage("Success...");
				hideLoading(function(){
					navigatePage("#recording");
				});
				var logindata = getDataArray();
				logindata[0] = { 
									email:email,
									password : password,
									otherdata : new Array()
							   };
				clearSaveData(logindata);
			}

		});

	}else{
		showMessage(function(){}, "Email Is not Valid", 1000, "ww");
	}

}


function isValidDocShort(isvalidcallback){
		$.post(domainrequesting+"ValidateDocRest;jsessionid="+sessionid, { "id" : identification, "docid" : docid,  "docshort" : docshort }, function(data){
			if(data.MessageT  == "1"){
				docid = data.DocId;
				docshort = data.DocShort;
				$("#documentid").val(docshort);
				isvalidcallback(true);
			}else if(data.MessageT  == "0"){
				isvalidcallback(false);
			}
		});
}

function logout(){
	
	showLoading();
	setLoadingMessage("Login Out..");
	$.post(domainrequesting+"LogoutRest;jsessionid="+sessionid, { id : identification }, function(data){
			
			if($.trim(data) == "done"){
				clearSaveData(new Array());
				hideLoading(function(){
					$(".homepagecont").css("visibility","hidden");
					navigatePage("#Homepage");
					
				});
			}

	});
}


	