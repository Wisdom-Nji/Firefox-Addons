// Outputs from content scripts can be seen in the console log of the tab
// window.addEventListener("contextMenu", (e)=>{ console.log(e) })
// document.body.style.backgroundColor = "black"
window.oncontextmenu = process

function depth_extract( element, max_depth, depth, contentTable ) {
	if( typeof depth == "undefined") depth = 0
	if( typeof contentTable == "undefined") contentTable = []
	if( typeof max_depth == "undefined" ) max_depth = -1

	/*
	console.log("child_element_count:", child_element_count)
	console.log("classname:", class_name)
	console.log("node_name:", node_name)
	console.log("node_type:", node_type)
	*/
	var content = {
		"child_element_count" : element.childElementCount,
		"classname" : element.className,
		"node_name" : element.nodeName,
		"node_type" : element.nodeType
	}

	contentTable.push( content )
	// console.log("At depth:", depth, contentTable)
	// console.log("depth:", depth)
	// console.log(contentTable)
	// console.log("max_depth:", max_depth)

	if( Number(element.nodeType) > 8 || Number(max_depth) == 0) return contentTable

	max_depth = max_depth == -1 ? max_depth : --max_depth
	contentTable = depth_extract( element.parentNode, max_depth, ++depth, contentTable )
	return contentTable
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
	
	const activeContentTable = depth_extract( active_component, 1 )
	const contentTable = depth_extract( active_component )

	console.log(activeContentTable)
	console.log( contentTable )
}
