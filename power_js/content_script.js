// console.log(document.body.children)

const ch_body = document.body.children
// recursive_extract( ch_body )
const node_iterator = document.createNodeIterator( document.body, NodeFilter.SHOW_ALL )
for( let node in node_iterator.nextNode()) 
	console.log( node )

function element_info( element ) {
	const id = element.id
	const type = element.nodeType
	const node_name = element.nodeName
	const number_children = element.childElementCount

	// console.log(element)
	console.log("element_id:", id)
	console.log("type:", type)
	console.log("node_name:", node_name)
	console.log("# children:", number_children)
}

function recursive_extract( element ) {
	for( let i in element ) {
		let child = element[i]
		if( is_element( child ) == false) continue
		console.log(`Working=>[${child.nodeName}]`)
		element_info( child )

		if( child.childElementCount > 0) 
			recursive_extract( child.children )
		console.log(`Done=>[${child.nodeName}]`)
	}
	console.log()
}

function is_element( element ) {
	return !(typeof element.nodeName == "undefined")
}
