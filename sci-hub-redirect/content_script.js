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

function highlight( element, h_color ) {
	if( typeof h_color == "undefined" ) 
		h_color = element.style.backgroundColor == "yellow" ? "grey" : "yellow"
	element.style.backgroundColor = h_color
	// console.log("Highlighting:", element )
}

function match( matching_this, matching_that ) {
	var matches = []
	for( let i in matching_this ) {
		var found = true
		var element_compare_table = [matching_this[i].child_element_count, matching_this[i].classname, matching_this[i].node_name, matching_this[i].node_type]

		for( let j in element_compare_table ) {
			if( matching_that.indexOf( element_compare_table[j] ) != element_compare_table.indexOf( element_compare_table[j] )) {
				found = false
				break
			}
		}

		if( found ) matches.push( matching_this[i] )
	}

	return matches
}

function scihub ( link ) {
	console.log("Should tab this in scihub")
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

	document.body.setAttribute("contextmenu", "sci-hub")

	var menuitem = document.createElement("menuitem");
	menuitem.setAttribute("label", "sci-hub");
	// menuitem.setAttribute("onclick", "sci-hub()");
	menuitem.onclick = scihub( link )

	/*
	var menuitem_ = document.createElement("menuitem");
	menuitem_.setAttribute("label", "Facebook");
	menuitem_.setAttribute("onclick", "shareViaFacebook()");
	*/

	var menu = document.createElement("menu");
	menu.setAttribute("label", "Personals");
	menu.appendChild(menuitem);
	menu.appendChild(menuitem_);

	var menu_ = document.createElement("menu");
	menu_.setAttribute("type", "context");
	menu_.setAttribute("id", "sci-hub");
	menu_.appendChild(menu);
	
	/*
	const active_content_table = depth_extract( active_component, 0 )[0]
	const content_table = depth_extract( active_component )

	const active_content_compare_table = [active_content_table.child_element_count, active_content_table.classname, active_content_table.node_name, active_content_table.node_type ]

	// console.log(active_content_table)
	// console.log( content_table )

	const matches = match( content_table, active_content_compare_table )
	console.log("matches:", matches)

	for( let i in matches ) highlight( matches[i].element )
	*/
}
