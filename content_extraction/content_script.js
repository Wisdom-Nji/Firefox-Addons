// Outputs from content scripts can be seen in the console log of the tab
// window.addEventListener("contextMenu", (e)=>{ console.log(e) })
// document.body.style.backgroundColor = "black"
window.oncontextmenu = process

function depth_extract( element, max_depth, depth, contentTable ) {
	// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
	const end_node_type = 7

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
		"node_type" : element.nodeType,
		"element" : element
	}

	contentTable.push( content )

	if( Number(element.nodeType) > end_node_type || Number(max_depth) == 0) return contentTable

	max_depth = max_depth == -1 ? max_depth : --max_depth
	contentTable = depth_extract( element.parentNode, max_depth, ++depth, contentTable )
	return contentTable
}

function highlight( element ) {
	// element.style.backgroundColor = "yellow"
	console.log("Highlighting:", element )
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
	
	const active_content_table = depth_extract( active_component, 0 )[0]
	const active_content_compare_table = [active_content_table.child_element_count, active_content_table.classname, active_content_table.node_name, active_content_table.node_type ]
	const content_table = depth_extract( active_component )

	console.log(active_content_table)
	console.log( content_table )

	for( let i in content_table ) {
		var element_compare_table = [content_table[i].child_element_count, content_table[i].classname, content_table[i].node_name, content_table[i].node_type]

		var found = true
		for( let j in element_compare_table ) {
			if( active_content_compare_table.indexOf( element_compare_table[j] ) != element_compare_table.indexOf( element_compare_table[j] )) {
				found = false
				break;
			}
		}

		if( found ) highlight( content_table[i].element )
	}
		
}
