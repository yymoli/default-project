/*
 *根据环境切换数据
 * api_url:app接口路径,
 * img_url:yyuap服务相关头像图片服务器接口路径,
 * upload_url:图片服务接口路径
 * mwap_url:wap站路径
 * yyuap_url:yyuap全路径
 * app_version:当前app版本号
 * 环境编号使用数字：environment
 * 内网测试环境:1
 * 92环境:2
 * 123环境:3
 * 预发布环境:4
 * B环境：5
 * 正式环境：6
 * 其他测试环境：7
 * 本地测试环境：8
 * Common全局对象
 * */
var api_url,img_url,upload_url,mwap_url,yyuap_url,environment,app_version,Common;
environment = 4;
app_version = '2.2.0';
switch(environment){
	case 1:
		//内网测试环境:1
		api_url='http://10.1.198.61:9081/';
		img_url='https://uastest.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://10.1.78.30/filesrv/";
		mwap_url="http://10.1.78.30/mwap/";
		yyuap_url='https://uastest.yyuap.com';
	break;
	case 2:
		//92环境:2
		api_url='http://172.20.14.92/hrsrv/';
		img_url='https://uastest.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://172.20.14.92/filesrv/";
		mwap_url="http://172.20.14.92/mwap/";
		yyuap_url='https://uastest.yyuap.com';
	break;
	case 3:
		//123环境:3
		api_url='http://123.103.9.205:8090/hrsrv/';
		img_url='https://uastest.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://123.103.9.205:8090/filesrv/";
		mwap_url="http://123.103.9.205:8090/mwap/";
		yyuap_url='https://uastest.yyuap.com';
	break;
	case 4:
		//预发布环境:4
		api_url='http://123.103.9.205:8098/hrsrv/';
		img_url='https://uastest.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://123.103.9.205:8098/filesrv/";
		mwap_url="http://123.103.9.205:8098/mwap/";
		yyuap_url='https://uastest.yyuap.com';
	break;
	case 5:
		//B环境：5
		api_url='http://10.3.6.5/hrsrv/';
		img_url='https://uas.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://10.3.6.5/filesrv/";
		mwap_url="http://10.3.6.5/mwap/";
		yyuap_url='https://uas.yyuap.com';
	break;
	case 6:
		//正式环境：6
		api_url='http://www.yonyouhr.com/hrsrv/';
		img_url='https://uas.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://www.yonyouhr.com/filesrv/";
		mwap_url="http://www.yonyouhr.com/mwap/";
		yyuap_url='https://uas.yyuap.com';
	break;
	case 7:
		//其他测试环境：7
		api_url='http://yhr.market.c.citic/hrsrv/';
		img_url='https://uas.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://yhr.market.c.citic/filesrv/";
		mwap_url="http://yhr.market.c.citic/mwap/";
		yyuap_url='https://uas.yyuap.com';
	break;
	case 8:
		//本地测试环境：8
		api_url='http://yhr.market.c.citic/hrsrv/';
		img_url='https://uas.yyuap.com/tenantuser/rest/user/uploadavator';
		upload_url="http://yhr.market.c.citic/filesrv/";
		mwap_url="http://yhr.market.c.citic/mwap/";
		yyuap_url='https://uas.yyuap.com';
	break;

}
// 处理ios兼容:active 
document.addEventListener('DOMContentLoaded', function () {
	document.body.addEventListener('touchstart', function () {
	    //...空函数即可
	});  
});

/*********************************** Global Variable&&Constant Define ***********************************/
var G__CACHE_KEY_CONTACTS_DEPARTMENT_LIST = "__CACHE_CONTACTS_DEPARTMENT_LIST";
var G__App_PreLoad = true;
var G__Cache_Duration = 1000*60*5;//5分钟
var G_CurUserInfo = {};
summer.on("init", function(){
	try{
		G_CurUserInfo = summer.getStorage("userinfo");
		if(typeof G_CurUserInfo == "string"){
			G_CurUserInfo = JSON.parse(G_CurUserInfo);
		}
		Common = {
			userinfo : summer.getStorage("userinfo"),
			//根据名字获取背景颜色
			getColor:function (name) {
				var color= ['#eead10','#f99a2b','#f38134','#6495ed','#3ab1aa','#0abfb5','#06aae1','#00bfff','#96bc53','#00ced1','#89a8e0'];
				var newName = encodeURI(name).replace(/%/g, "");
				var lastName, hexadecimal, tenBinary;
				//长度大于等于6位，取后六位
				if(newName.length >= 6) {
					lastName = newName.substr(lastName,6);
					hexadecimal = parseInt(lastName,16);
					tenBinary = hexadecimal%10;
					return color[tenBinary];
				} else {
					return color[10]
				}
			},
			//判断路径中是否包含该url，如果没有，就加上
			ishttp:function (url){
				if(url==null)return null;
				return url.substr(0,4)=="http"?url:"http://"+url;
			},
			//给wap版提供的数据
			getWapData:function (){
				var obj={
					u_logints:Common.userinfo.u_logints,
					u_usercode:Common.userinfo.u_usercode,
					u_username:Common.userinfo.username,
					u_usermobile:Common.userinfo.phone,
					u_staffid:Common.userinfo.staffid,
					tenantid:Common.userinfo.tenantid,
					token:Common.userinfo.token,
					u_useravator:Common.userinfo.useravator,
					isprincipal:Common.userinfo.isprincipal,
					indocflag:Common.userinfo.indocflag,
					rf:'yapp',
					clientversion:app_version
				}
				var objstr=JSON.stringify(obj);
				var jiaobj=encodeURIComponent(objstr);
				return jiaobj;
			},
			//此处为友人才专用upload， 带参数和header的请求,上传图片
			uploadHr:function (path){
			    summer.showProgress({
			        title :'加载中...'
			    });
			    var callObj={};
			    var fileURL = path;
			    var options = new FileUploadOptions();
				    options.fileKey="file";
				    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
				    options.mimeType="image/jpeg";   
			    var headers={'Authority':getAuth()};
			    var random = createUUID(); 
			    var params = {};
				    params.filepath = random;
				    params.groupname = "attend";
				    params.url = "true";
				    params.permission = "read";
				    options.headers = headers;
				    options.params = params;
				    options.httpMethod = "POST"; 
			    var ft = new FileTransfer();
			    var SERVER = upload_url+"file/upload"
			    ft.upload(fileURL, encodeURI(SERVER), function(ret){
			        var responseData = (JSON.parse(ret.response)).data
			        var url = responseData[0].url;
			        var staff_idfu = Common.userinfo.staffid;
			        callObj={
			        	"url":url,
			        	"staff_idfu":staff_idfu,
			        	"filepath":params.filepath
			        }
			
			    }, function(err){
			    	jqAlert("上传失败");
			    }, options);
			    summer.hideProgress();
			    return callObj;
			},
			//多图文上传方法
			manyfileupload:function (obj){
				var fileURL = obj.fileURL;
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
				options.mimeType="image/jpeg";
				var headers={'Authority':getAuth()};
				var params = {
						filepath:obj.random,
						groupname:obj.groupname,
						url:obj.url,
						permission:obj.permission
					};
			
				options.headers = headers;
				options.params = params;
				options.httpMethod = "POST"; 
				var ft = new FileTransfer();
				var SERVER = upload_url+"file/upload"
				ft.upload(fileURL, encodeURI(SERVER), function(ret){
					if(obj.num==obj.i){
						obj.callBack(params.filepath);
					}
					
				}, function(err){
					summer.hideProgress();
					jqAlert("失败"+ JSON.stringify(err));
				}, options);
		
			},
			encode4hr:function (str){
				return str;
				//return encodeURIComponent(str);
			},
			decode4hr:function (str){
				return str;
				//return decodeURIComponent(str);
			}
		}												
	}catch(e){
		console.log(e)
	}
})

//获取用户信息
function getAuth() {
	//  ||后边是第一次登录之后信息的临时存储，为方便公用 
	var userinfo = summer.getStorage("userinfo") || summer.getStorage("tempuserinfo");
	if ( !userinfo ){
		return "";
	}
	var u_logints = userinfo.u_logints;
    var u_usercode = userinfo.u_usercode;
    var tenantid = userinfo.tenantid;
    var token = userinfo.token;
    var auth = "u_logints="+u_logints+";u_usercode="+ u_usercode+";token="+token+";tenantid="+tenantid;
    return auth;
}

function ajaxRequestWap(url, method, content, bodyParam, callBack,error) {
    var headers = {};
    if (content != null){
		//cordovaHTTP.setHeader("contentType",content);
		headers["contentType"] = content;
	}
	var auth = getAuth();
	if(auth){
		//cordovaHTTP.setHeader("Authority", auth);
		headers["Authority"] = auth;
	}
	var methods = method.toLowerCase();
	if (typeof error == "function"){
		summer.ajax({
	    	type : methods,
	    	url : mwap_url+url,
	    	param : bodyParam,
	    	header : headers
	    },function(response){
	    	// 先做version这个去掉空格的操作
	    	if (url == "version.json"){
	    		response.data = response.data.ltrim();
	    	}
	    	callBack(JSON.parse(response.data));
	    },function(response){
	    	error(response);
	    })
	}else{
		summer.ajax({
	    	type : methods,
	    	url : mwap_url+url,
	    	param : bodyParam,
	    	header : headers
	    },function(response){
	    	// 先做version这个去掉空格的操作
	    	if (url == "version.json"){
	    		response.data = response.data.ltrim();
	    	}
	    	callBack(JSON.parse(response.data));
	    },function(response){
	    	console.log(response.status);
            jqAlert("状态："+response.status+"\n错误："+response.error);
	    })
	}
	
}

function ajaxRequest(url, method, content, bodyParam, callBack,error) {
	if(environment==8){
		$.ajax({
			type : method,
			url : "../../data/"+url.split(".")[0]+".json",
			data : bodyParam,
			contentType:content,
			dataType:"json",
			success:function(data){
		        callBack(data);
			},
			error:function(data){
				jqAlert("正在努力加载中,请稍等！");
			}
		});
	}else{

		// var common_url = url.indexOf("file/upload")>-1 ? upload_url : api_url;
		if( url == "file/upload" || url == "file/query" || url == "file/delete"){
			common_url = upload_url;
		}else{
			common_url = api_url;
		}
		var headers = {};
	    if (content != null){
			//cordovaHTTP.setHeader("contentType",content);
			headers["contentType"] = content;
		}
	
		var auth = getAuth();
		if(auth){
			//cordovaHTTP.setHeader("Authority", auth);
			headers["Authority"] = auth;
		}
	
		var methods = method.toLowerCase();
		if (typeof error == "function"){
			summer.ajax({
		    	type : methods,
		    	url : common_url+url,
		    	param : bodyParam,
		    	header : headers
		    },function(response){
		    	callBack(JSON.parse(response.data));
		    },function(response){
		    	error(response);
		    })
		}else{
			summer.ajax({
		    	type : methods,
		    	url : common_url+url,
		    	param : bodyParam,
		    	header : headers
		    },function(response){
		    	callBack(JSON.parse(response.data));
		    },function(response){
		    	if(summer.netAvailable()){
		    		//返回值为boolean类型
		    		console.log(response.status);
	            	jqAlert("状态："+response.status+"\n错误："+response.error);
		    	}else{
		    		summer.toast("网络连接不可用，请稍后再试");
	            }
		    })
		}
	}
}
//创建随机数
var createUUID = (function (uuidRegEx, uuidReplacer) {  
    return function () {  
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();  
    };  
})(/[xy]/g, function (c) {  
    var r = Math.random() * 16 | 0,  
        v = c == "x" ? r : (r & 3 | 8);  
    return v.toString(16);  
});  

//判断是否为空
function isEmpty(data) {
	if (data == undefined || data == null || data == "" || data=='NULL' || data==false || data=='false') {
		return true;
	}
	return false;
}
//Base64转换
function Base64() {
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	};
	// public method for decoding
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	// private method for UTF-8 encoding
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
	// private method for UTF-8 decoding
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}
//SHA1加密算法
function SHA1(msg) {
    function rotate_left(n, s) {
        var t4 = ( n << s ) | (n >>> (32 - s));
        return t4;
    };
    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}

//自定义弹窗
function jqAlert(msg,flag){
		if(msg==undefined || msg==""){
			return false;
		}
		if($("#jqAlert").length>0){
			return false;
		}
		$("<div id='jqAlert'><div>"+msg+"</div></div>").appendTo("body");
		if(flag!=undefined){
			$("#jqAlert").prepend("<p class='check icon icon-check'></p>");
			$("#jqAlert .check").css({
				"line-height":"60px",
				"color":"#fff",
				"font-size":"64px",
				"text-align":"center"
			});
			$("#jqAlert").css({"border-radius":"8px"});
		}else{
			$("#jqAlert").css({"border-radius":"5px"});
		}
		$("#jqAlert").css({
			"background-color":"rgba(0,0,0,0.6)",
			"color":"#fff",
			"opacity":0,
			"text-align":"center",
			"font-size":"16px",
			"padding":"10px 20px",
			"max-width":"80%",
			"position":"fixed",
			"z-index":999,
			"left":"50%",
			"top":"50%",
			"-webkit-transform":"translate(-50%,-50%)",
			"transform":"translate(-50%,-50%)",
			"margin-top":"20px"
		}).animate({marginTop:0,opacity:1},'fast');
		setTimeout(function(){
			$("#jqAlert").animate({marginTop:"30px",opacity:0},'fast',function(){
				$(this).remove();
			});
		},1500);
	}
//textarea的placeholder折行显示
;(function(w){
    //var test = document.createElement('input');
    //var support = 'placeholder' in test && !/android/gi.test(window.navigator.userAgent);
	if(typeof $ == "undefined") return;
    $.fn.placeholder = function () {
        return this.each(function () {

            var $this = $(this);
            var holderText = $this.attr('placeholder');
            var holder = $('<div class="x-placeholder">' + holderText + '</div>');

            holder.css({
                position: 'absolute',
                display: 'none',
                zIndex: 999,
                cursor: 'text',
                wordWrap: 'break-word',
                color: '#bbb'
            });

            $this.after(holder)
                .removeAttr('placeholder')
                .parent().css('position', 'relative');

            $this.bind('focus', function () {
                holder.hide();
            }).bind('blur', function () {
                if ($this.val().length) return;

                var offset = $this.offset();
                var top = (parseInt($this.css('paddingTop'), 10) || 0) + (parseInt($this.css('borderTop'), 10) || 0) + (parseInt($this.parent().css('padding-top'), 10) || 0);
                var left = (parseInt($this.css('paddingLeft'), 10) || 0) + (parseInt($this.css('borderLeft'), 10) || 0) + (parseInt($this.parent().css('padding-left'), 10) || 0);
                holder.css({
                    top: top,
                    left: left,
                    width: $this.width()
                }).show(); 
            }).trigger('blur');

            holder.bind('click', function () {
                $this.focus();
            });
        });
    };
})(window);

//判断路径中是否包含该url，如果没有，就加上
function ishttp(url){
	if(url==null)return null;
	return url.substr(0,4)=="http"?url:"http://"+url;
}

//给wap版提供的数据
function getWapData(){
	var userinfo = summer.getStorage("userinfo");
	var my = summer.getStorage("my");
	var obj = {
		u_logints : userinfo.u_logints,
		u_usercode : userinfo.u_usercode,
		u_username : userinfo.username,
		u_usermobile : userinfo.phone,
		u_staffid : userinfo.staffid,//my.id,
		tenantid : userinfo.tenantid,
		token : userinfo.token,
		u_useravator : userinfo.useravator,
		isprincipal : userinfo.isprincipal,//localStorage.isprincipal,
		indocflag : userinfo.indocflag,//localStorage.indocflag,
		rf : 'yapp',
		clientversion : app_version
	}
	var objstr = JSON.stringify(obj);
	var jiaobj = encodeURIComponent(objstr);
	console.log(jiaobj);
	return jiaobj;
}

/**根据名字获取背景颜色
  *
*/
function getColor(name) {
	var color= ['#eead10','#f99a2b','#f38134','#6495ed','#3ab1aa','#0abfb5','#06aae1','#00bfff','#96bc53','#00ced1','#89a8e0'];
	var newName = encodeURI(name).replace(/%/g, "");
	var lastName, hexadecimal, tenBinary;
	//长度大于等于6位，取后六位
    if(newName.length >= 6) {
      lastName = newName.substr(lastName,6);
      hexadecimal = parseInt(lastName,16);
      //能转成数字
      if(hexadecimal) {
        tenBinary = hexadecimal%10;
        return color[tenBinary];
      } else {
        //不能转数字
        return color[10];
      }
    } else {
      return color[10]
    }
}






var cacheManager = {
	duration: G__Cache_Duration,//60秒
	setCache: function(key, data, duration){
		try{
			var _obj = {
				data: data,
				tenantid: G_CurUserInfo.tenantid,
				usercode: G_CurUserInfo.u_usercode,
				level: "",
				datetime: (new Date()).getTime(),
				duration: duration || this.duration
			}
			/*
			var str = "";
			try{
				str = JSON.stringify(_obj);
			}catch(e){
				jqAlert("ERR101:缓存数据JSON.stringify出错了,\n仅支持json数据缓存\n" + e);
				return;
			}*/
			summer.setStorage(key, _obj);
		}catch(e){
			jqAlert("ERR100:setCache出错了\n" + e);
		}
	},
	getCache: function(key){
		try{
			var curT = (new Date()).getTime();
			var old = null;//旧数据
			try{
				old = summer.getStorage(key);
			}catch(e){
				jqAlert("ERR104:缓存数据转json出错了,\n仅支持json数据缓存\n" + e);
				return null;
			}
			if(old == null) return;
			var tid = old.tenantid;
			var ucode = old.usercode;
			if(tid == G_CurUserInfo.tenantid && ucode == G_CurUserInfo.u_usercode){
				var oldT = old.datetime;
				var dur = old.duration;
				if(curT - parseInt(oldT) <= parseInt(dur)){
					return old.data;
				}else{
					summer.rmStorage(key);
					return null;
				}
			}else{
				//缓存数据不是当前租户下当前用户的缓存
				return null;
			}
		}catch(e){
			jqAlert("ERR103:getCache出错了\n" + e);
		}
	}
}






/************创建假数据*************/
function pub_creatData(){
	summer.pageParam={"name":"授权代理人"};
	summer.setStorage('userinfo',{
		"token":"bWEsLTEsZjIyZENIS0o5ZCs0THlQdU0wdVJEZXUzS1ZGWVA5SDVsQVZDbEtaSjhVTjJjSlJqRGFiTnl0UmYxMkRwcEpSWVpIcklRUUt5bm51UG9HdHRBanpWM0E9PQ",
		"u_logints":"1490418016228",
		"u_usercode":"53e59f8e-a127-4fb4-b10f-f94a63d49f99",
		"tenantid":"tdwrj9dp",
		"username":"刘冲",
		"useravator":"",
		"phone":"13199314723",
		"pwd":"1234qwer",
		"indocflag":true,
		"isprincipal":true,
		"app_version":"2.1.0",
		"staffid":"b878c795-e383-4fc5-b272-af047b9a390c"
	});
}