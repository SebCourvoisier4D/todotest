
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var submit = {};	// @Button
// @endregion// @endlock

// eventHandlers// @lock

	submit.click = function submit_click (event)// @startlock
	{// @endlock
		// Add your code here
		WAF.directory.login( $('#username').val(), $('#password').val() );
		if (WAF.directory.currentUser()) {
		    window.location.href = '../home.waPage/index.html';
		} else {
		    alert('invalid credentials');
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("submit", "click", submit.click, "WAF");
// @endregion
};// @endlock
