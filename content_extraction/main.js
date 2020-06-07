// Outputs from the background content script can be seen from the debug screen (about:debugging)
function popup() {
	// document.body.addEventListener("onclick", (event)=>{ console.log("Requested...") })
	// window.addEventListener("contextMenu", (event)=>{ console.log("Requested...") })
	/*
	Window.GlobalEventHandlers.onclick = function(click) {
		console.log(click.clientX, click.clientY)
	}
	*/
	//console.log(Window)
	Window.onclick = function( click ) {
		console.log(click.clientX, click.clientY)
	}
}
function navTab( tabId, changeInfo, tab ) {
	// checks if tab has been reloaded or not
	if( changeInfo.status == "complete" || changeInfo.attention == false ) {
		console.log(tab.id)
		console.log(tab.url)
		console.log(tab.title)
		console.log(new Date(tab.lastAccessed))

		if( tab.title == "Server Not Found" ) {
			console.warn("Reloading...");
			browser.tabs.reload(tab.id);
		}
	}
	// else console.log(changeInfo)

	popup()

	console.log()
}

browser.tabs.onUpdated.addListener(navTab)
