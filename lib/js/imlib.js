
var Dbase1 = "mdudd2xdabdfesdredfdfadf5utgfgcdfirmauladtdd3dfse2322s44176ssss1";
var authkey  = "d34b2bc2b6c0e3914f1339a6bf802fa656c31549";



var cog = new Image();
var imagecamethod;

/*
Date.prototype.yyyymmdd = function() {
		var yyyy = this.getFullYear().toString();
  		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  		var dd  = this.getDate().toString();
  		var hour = (this.getHours().toString().length ==1) ? ("0"+this.getHours().toString()) : this.getHours().toString();
  		var minutes = (this.getMinutes().toString().length == 1) ? ("0"+this.getMinutes().toString())  :  this.getMinutes().toString();
  		return yyyy + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0])+" "+hour+":"+minutes; // padding
  	};

 function getCurrentDateTime(){

  		d = new Date();
  		return  d.yyyymmdd();
  	}
*/


/*
function timediff(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        var sedonds = parseInt((t2-t1)/(1000));
        if(sedonds > 59){
        	var minutes = parseInt((sedonds/60));
         	var seconds = (sedonds%60);
         	return returndouble(minutes)+" : "+returndouble(seconds);
        }else{
        	return "00 : "+ (((sedonds+"").length == 1) ? "0"+sedonds : sedonds);
        }
         
    }
    function returndouble(sedonds1){
    	return (((sedonds1+"").length == 1) ? "0"+sedonds1 : sedonds1);
    }
*/

function navigatePage(page){
	$.mobile.navigate(page);
}

function navigatePageRefresh(page){
	$.mobile.navigate(page);
	location.reload();
}

function getDataArray(){

	var dbasearray = localStorage.getItem( Dbase1);
  		if(dbasearray == null || dbasearray == ""){

  			dbasearray = new Array();
  		}else{
  			dbasearray =JSON.parse(dbasearray);
  		
  		}
  	return dbasearray;
}




function clearSaveData(dataarray){
  		var jsondata = JSON.stringify(dataarray);
  		localStorage.setItem(Dbase1,jsondata);
}

function appendSaveData(dataarray){
		dbasearray = getDataArray();
		dbasearray[dbasearray.length] = dataarray;
  		var jsondata = JSON.stringify(dbasearray);
  		localStorage.setItem(Dbase1,jsondata);
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


function showMessage(callback, message,delay,type){
	/*
		type 
		ss -- success
		ww -- warning 
		nn -- normal
	*/

	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all toastclass "+type+"'><h1>"+message+"</h1></div>").css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
				  .appendTo( $.mobile.pageContainer ).delay( delay )
				  .fadeOut( 400, function(){
				    $(this).remove();
				    if(callback !== ""){
				    		callback();
				    }
				    
				  });
	
	
}


function callback1(){
	//navigatePage("#settings");
}

function setSelectedValue(elemntid,value){
	var el = $("#"+elemntid);
	el.val(value).attr('selected', true).siblings('option').removeAttr('selected');
	el.selectmenu("refresh", true);
}


function setOptionsSelect(selectview,textindex,arrrayd){
	var stringoptions = "";
	$("#preferedpharmacisit").empty();
	for(var i=0; i<arrrayd.length; ++i){
				stringoptions += " <option value=\""+i+"\" >"+arrrayd[i][textindex]+"</option>";
	}

	$("#"+selectview).append(stringoptions).selectmenu('refresh', true);;
	

}



function setOptionsSelectMultiple(selectview, arrrayd){
	var stringoptions = "";
	$("#selectpharmacies").empty();
	for(var i=0; i<arrrayd.length; ++i){
				stringoptions += " <option  value=\""+arrrayd[i][6]+"\" >"+arrrayd[i][0]+"</option>";
	}

	$("#"+selectview).append(stringoptions).selectmenu('refresh', true);;
	
	var selectedoppharmacies = getDataArrayLocations();
	

	$("#selectpharmacies > option").each(function(i) {
    	if(selectedoppharmacies[i] =="true"){
    		$(this).attr("selected", "selected");
    	}
	});

	$("#selectpharmacies").selectmenu('refresh');

}


function listVIewRefresh(selectview){
	if ( $("#"+selectview).hasClass('ui-listview')) {
    			$("#"+selectview).listview('refresh');
     } else {
    			$("#"+selectview).trigger('create');
     }
}

$(function(){
	jQuery('.numbersOnly').keyup(function () { 
    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
});



/*
<div class="loadingimage">
    <div class="loadinmiddle">
    <div>
        <img src="lib/js/loading.GIF" />
        <div class="statusloading">Please wait..</div>
    </div>
    </div>
</div>

OR
<canvas width="27" height="27" id="loadingicon"></canvas>
*/

  var shadowlock = 0;
	function showLoading(){
					$(".loadingimage").height($(document).height());
					$(".loadingimage").css("display","table");
					initdrawing();
          if(shadowlock == 0){
              shadowlock = 1;
              $(window).on("resize",function(){
                  var backcover = $(".loadinmiddle");
                  var windoz = $(window);
                  backcover.css("height", (windoz.height())+"px");
                  backcover.css("width",(windoz.width())+"px");
              });
          }
	}
	function hideLoading(callback){
					$(".loadingimage").delay( 900 ) .fadeOut( 400, function(){
						$(".loadingimage").css("display","none");
						$(".statusloading").html("Please wait..");
						clearInterval(imagecamethod);
            if(callback){
              callback();  
            }
						
					});
	}
				
	function setLoadingMessage(Message){
			$(".statusloading").html(Message);
	}





function initdrawing() {
    cog.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABK1JREFUeNqMVt1ZGzkUvVfS4IW1l8GO82w6IBXE7mCpAFMB+Pt4Z6iApALcAe4AU0HoAJfg7BPYHinnXmmciX+y0YdmJHnQ0bk/R5cvh5cUyFPwRD4EChgEvGWMB36R3+JaiTkmD5gOs8yNb25uLlerFf1pM2yIGA82TEY7xow1oj4GBU6S6yywPNG4JwDH+XGv0Whs7ndN8n97mmPsLCSYgy7ImPQE/pFDyAF+7L0fgTNFUDBcLal90taD1doQ/T6NT9DnW8zkT+jJuQVYukG3hifCVk/L3JOxMBa8VVlSp9MhHKLaB+zpNo1fdgEpmByuMqUAV5viOQLwXNax9KBAFNEEpN1pUwnQmvl6aTza6zNjrCKaymeyOdYAMgfg18iG4T/qw+AC94zvpzDjcwqOXo3VGH26H0xMZ7jPxgT0R2zUi4BYt6bAfEbJvJFZKA4ODgZ5nhcJLE9mk35X21vWC/TXKmiwr2xszoQd/PQv3t/QCzY2twpqBpb5FKOp+hCgzWaTWq0W1Xx0ij5An9WC5VtiLMwvNBrVaSGMvQk5jHQVPN7sb0HzAtE+QJrNgrcUNEARieWCut0ugR0tl8sKcJ5Ahc3jRviPK8ZGTaaBwGKyT+gTiwM4a3Jrba6MbeVXo5F4kp9shn29ndUYC9vLirGDXzRhrYhD8DME5Hkg22df5rDYS/RXmVIsaP/Q/SXs600YnifTjbeSWliEdTYb3QyTqYfdDKTL4B1KS6tVqf6SgGq3P9BvZGpvNIrPCgVKZlGlCDQDxJiCjVppCab05DJHzb+b1Gm36X80cVjLuzozexs0f6IgRkA5XRhzIixRL1+IzhwdHVHrn1Y9oXe1i10aKT6bGGhg1CKK+cT0zCGCs0oXTIogybJMw/779//o48duMvnO9rzLn+Kz8wgS5Shqo4njpCoOQA5Ajb8adHh4SMvVghaLhYb/HsBip88krNVISSEigOlhjmi0LziNhr6wOsgO9C1339vbGznnNAU2AM9Svk235cqKieKGkldAf7DGvTrjnjJnzyQoMu0ZTuZgUqvmlYR+f39XIE4uqCX1E/rDZpCYmKwOOmivAfYK9KF1AM7EdG4uAMLAOjmQideQXOJQkyUisqYiFRhtSFbxCxj8do0T30dmTvLhC+an0MZZVBHX09tBTG4qFigZEJEChjTIEwtRik81Qa7uOQU0IrYAe7FRjqYw6SlYjgAyN1GmHsFIGPfVnxzFuFITKEkfYK+oWZ5qKlIkcZ7UE92oXBmeIgIxtAO5UtSHqo9uiLW+sme5ejSIRASeAFR4LYy8MMzL1aq3EYWzJF28BgMEzGYpBkrMKelgl+P6uTcVY8NjLYyYPwMTCcufSaouH6al9xNJcjC82vDb9uVZKbrWIumNO+waVsu1TCC+Wxcg6xaSpsZSYM2wLO9/U8qZWH+wztQnsfAxV/E3MIKZVf1FsmJVV8mamhEmxZ0X7sSsABsGv1tZJGejmptU7FBUDYzPAXQBwFEEl+9+stFEroJEci2ELwIMmZuWoSTE9DYYcWVCjlJrZWMpeBhlAEqBiulPE84S3ixU5gSTwGGOdyEVNJXxA8nPevshwABHktBS1YoQ+QAAAABJRU5ErkJggg=='; // Set source path
    imagecamethod = setInterval(draw,10);
}
var rotation = 0;
function draw(){
    var ctx = document.getElementById('loadingicon').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.save();
    ctx.clearRect(0,0,27,27);
    ctx.translate(13.5,13.5); // to get it in the origin
    rotation +=1;
    ctx.rotate(rotation*Math.PI/64); //rotate in origin
    ctx.translate(-13.5,-13.5); //put it back
    ctx.drawImage(cog,0,0);
    ctx.restore();
}