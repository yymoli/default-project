function preAction() {

	var infoValue = summerBridge.getLocalStorage("userinfo");
	var welcomeValue = summerBridge.getLocalStorage("welcome");
	if (!welcomeValue) {
		return {
			id: "welcome",
			url: "Welcome/Welcome.html",
			isKeep: false,
			pageParam: {
				keep: true
			}
		}
	}
	if(!infoValue){
		return {
			id: "login",
			url: "Account/Login.html",
			isKeep: false
		}
	}else {
		return {
			id:'root',
			url:'Index/Index.html',
			isKeep:false,
		}
	}
}
preAction();
