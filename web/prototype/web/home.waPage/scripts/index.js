
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var logout = {};	// @Button
	var documentEvent = {};	// @document
	var button2 = {};	// @Button
// @endregion// @endlock

// eventHandlers// @lock

	logout.click = function logout_click (event)// @startlock
	{// @endlock
		// Add your code here
		WAF.directory.logout();
		window.location.href = '../login.waPage/index.html';
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Add your code here
		WAF.widgets.username.value(WAF.directory.currentUser()['fullName'] + ' (' + WAF.directory.currentUser()['userName'] + ')');
	};// @lock

	button2.action = function button2_action (event)// @startlock
	{// @endlock
		// Add your code here
		sources.task.user = WAF.directory.currentUser()['ID'];
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("logout", "click", logout.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button2", "action", button2.action, "WAF");
// @endregion
};// @endlock
