/*
var downloads = browser.downloads.search({});
downloads.then((downloadItems)=>{
	console.log(downloadItems)
	for(let i in downloadItems ) {
		console.log(downloadItems[i].id)
		console.log(downloadItems[i].url)
		console.log(downloadItems[i].filename)

		console.log("Can Resume:", downloadItems[i].canResume);
		
		browser.downloads.download({url: downloadItems[i].url})
	}
})
*/

function resumeIfResumable( downloadDelta ) {
	console.log("=> Resuming if Resumable");
	if( downloadDelta.state && downloadDelta.state.current === "interrupted" && downloadDelta.canResume ) {
		console.log(Date.now(), " - Resuming download");
		let state = browser.downloads.resume( downloadDelta.id );
		state.then((error)=> {
			if(error) {
				//sleep and continue
				setTimeout(()=> {
					resumeIfResumable( downloadDelta )
				}, 10000);
			}
		})
		console.log("Download Resumed successfully");
	}
	else {
		console.log("Download isn't resumable");
	}
}
browser.downloads.onChanged.addListener(resumeIfResumable);
