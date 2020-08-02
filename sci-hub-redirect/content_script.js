// Outputs from content scripts can be seen in the console log of the tab
// window.addEventListener("contextMenu", (e)=>{ console.log(e) })
// document.body.style.backgroundColor = "black"
window.oncontextmenu = process


function scihub ( link ) {
	console.log("Should tab this in scihub")
	link = "https://sci-hub.tw/" + link
	window.open( link, '_blank')
}

function process( click_event ) {
	/*
	let component = click_event.originalTarget
	// console.log(component.firstChild)
	console.log(component.className)
	let contents = document.getElementsByClassName(component.className)
	for( let i in contents ) {
		contents[i].innerHTML = "Go fuck yourself!"
	}
	*/

	const active_component = document.activeElement
	var link = ""
	if( active_component.tagName == "A" ) {
		// console.log(active_component)
		link = active_component.href
		document.body.setAttribute("contextmenu", "sci-hub")

		var menuitem = document.createElement("menuitem");
		menuitem.setAttribute("label", "sci-hub");
		// menuitem.setAttribute("onclick", "scihub()");
		menuitem.onclick = function() {
			// console.log("sci-hub clicked")
			console.log("Link", link)
			scihub( link )
		}

		/*
		var menuitem_ = document.createElement("menuitem");
		menuitem_.setAttribute("label", "Facebook");
		menuitem_.setAttribute("onclick", "shareViaFacebook()");
		*/

		var menu = document.createElement("menu");
		menu.setAttribute("label", "Personals");
		menu.appendChild(menuitem);
		// menu.appendChild(menuitem_);

		var menu_ = document.createElement("menu");
		menu_.setAttribute("type", "context");
		menu_.setAttribute("id", "sci-hub");
		menu_.appendChild(menu);
		document.body.appendChild( menu_ )
	}
}
