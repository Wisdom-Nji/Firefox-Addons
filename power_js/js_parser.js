const sample_html = "<html><head></head><body><p>p1</p><div><p>p2</p></div></body></html>"
const single_tag = "<p>"
const single_tag_false = "<p"
const single_element = `<img src=".." >`


function is_element( element ) {
	// structure 
}

function element_count( html ) {
}

function parser( html ) {
	console.log("parsing...")
	// structure
	// [0] == < and [n] == >
	// remove all trailing chars at the start and end
	if( html[0] != '<' )  return ""
	if( html[html.length -1] != '>' ) return ""
	
	// should search for closing tab after this in the input space
	let variables = html.split(/[<>]/)
	console.log("variables:", variables)

	let tag_space = variables[1]
	console.log("tag_space:", tag_space)

	let split_tag = tag_space.split(' ')
	// attributes should not have space between the =
	console.log("split_tag:", split_tag)
	let tag = split_tag[0]
	console.log("tag:", tag)
	let atr_space = split_tag[1]
	console.log("attributes:", atr_space)
	let split_atr = atr_space.split("=")
	// split_atr should be extracted in a loop because could be > 1 attribute
	console.log("split_atr:", split_atr)
	let attr = split_atr[0]
	let attr_values = split_atr[1]
	
	// this is where the conditionals come in. a map of all the elements and their attributes would be needed here
	let values = {
		tag : tag,
		attr : [[attr, attr_values]]
	}

	return values
}


console.log( parser( single_element ))
// console.log( is_element( single_element ));
