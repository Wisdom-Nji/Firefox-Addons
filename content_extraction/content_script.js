// Outputs from content scripts can be seen in the console log of the tab
// window.addEventListener("contextMenu", (e)=>{ console.log(e) })
// document.body.style.backgroundColor = "black"
window.oncontextmenu = process


function process( click_event ) {
	let component = click_event.originalTarget
	// console.log(component.firstChild)
	console.log(component.className)
	let contents = document.getElementsByClassName(component.className)
	for( let i in contents ) {
		contents[i].innerHTML = "Go fuck yourself!"
	}
}
