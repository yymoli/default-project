/**
 * Created by XYC on 2017/6/19.
 */
function getDeviceidAndToken() {
	var deviceId = summer.getDeviceInfo().deviceid;
	var userinfo = summer.getStorage("userinfo");
	var token = userinfo ? userinfo.token : "";
	return {
		"deviceId" : deviceId,
		"token" : token
	}
}
function ajaxRequest(paramObj, successCallback, errorCallback){
	var testPath = "https://wstest.yonyoucloud.com" + paramObj.url;
	//判断网络连接是否可用
	if ($summer.os != 'pc' && !summer.getNetworkInfo().Type) {
		summer.toast({
			msg: '网络连接不可用'
		});
		summer.refreshFooterLoadDone();
		summer.refreshHeaderLoadDone();
		summer.hideProgress();
		return;
	}
	var testPath='';
	/*首页扫描送荣耀做兼容*/
	if(paramObj.requestType=='getHonour'){
		testPath=paramObj.url;
	}else if(paramObj.isFulllUrl){
		testPath=paramObj.url;
	}else {
		 // testPath = "https://ws.yonyoucloud.com" + paramObj.url;
		 testPath = "https://wstest.yonyoucloud.com" + paramObj.url;
	}

	var header = getDeviceidAndToken();
	if(paramObj.contentType){
		header["Content-Type"] = paramObj.contentType;
	}
	summer.ajax({
		type : paramObj.type,
		url : testPath,
		param : paramObj.param,
		// 考虑接口安全，每个请求都需要将这个公告header带过去
		header: header
	},function(response){
		var data = JSON.parse(response.data);
		var tokenerror = summer.getStorage("G-TOKEN-ERROR");
		if (tokenerror) {
			return false;
		}
		if (data.code == "sys.token.error"){
			// 设置token标志
			summer.setStorage("G-TOKEN-ERROR",true);
			// 清除userinfo，直接退出之后，再进入可以直接跳入到登录
			summer.rmStorage('userinfo')
			// 提示框
			summer.toast({
				msg : "token失效,即将跳转登录页"
			});
			//  退出有信
			var params = {
				"method": "YYIM.logout",
				"params": {}
			}
			cordova.exec(null, null, "XService", "callSync", [params]);
			// 跳转到登录页面
			setTimeout(function(){
				summer.openWin({
					id : "login",
					url : "Account/Login.html",
					isKeep : false
				});
			},500);
			return false;
		}
		successCallback(data);
	},function(response){
		if (response.status && response.status != 200) {
			summer.toast({
				msg: '不好意思，服务器开小差了!'
			});
			summer.refreshFooterLoadDone();
			summer.refreshHeaderLoadDone();
			summer.hideProgress();
			return;
		}
		errorCallback(response)
	});
}

//判断是否为空
function isEmpty(data) {
	if (data == undefined || data == null || data == "" || data=='NULL' || data==false || data=='false') {
		return true;
	}
	return false;
}

function createNull (id) {
	var html = '<div class="default-error" style="display: -webkit-box;display: flex; -webkit-box-pack: center;justify-content: center; -webkit-box-align: center;align-items: center; -webkit-box-orient: vertical; -webkit-box-direction: normal;flex-direction: column;width: 100%;height: 100%;position: fixed;margin-top: 0.8rem;">'+
		'<img src="../static/icon/404.png" style="width: 46vw;height: 4.5rem;" alt=""/>'+
		'<h3 style="font-size: 0.36rem;color: #BABABA;">暂无数据</h3>'+
	'</div>';
	var curId = $summer.byId(id);
	$summer.html(curId,html);
}
