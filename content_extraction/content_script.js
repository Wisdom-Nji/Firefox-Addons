// Outputs from content scripts can be seen in the console log of the tab
// window.addEventListener("contextMenu", (e)=>{ console.log(e) })
// document.body.style.backgroundColor = "black"
window.oncontextmenu = process

var depth = -1
function checks( element ) {
	++depth
	console.log("At depth:", depth)
	const child_element_count = element.childElementCount
	const class_name = element.className
	const node_name = element.nodeName
	const node_type = element.nodeType
	console.log("child_element_count:", length)
	console.log("classname:", class_name)
	console.log("node_name:", node_name)
	console.log("node_type:", node_type)
	checks( element.parentNode )
	console.log()
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
	console.log(active_component)
	// childElementCount
	//
	// when matching element is reached, parent is parsed for all other occurences
	// find items with matching attributes, first by length, then by content
	// then check against childElementCount
	// then check against className
	// then check against nodeName
	// then check against nodeType
	// maybe? check same elements against parentNode
	
	checks( active_component )
}
