// create access to internal data
api = netflix.appContext.state.playerApp.getAPI()
sessionId = api.videoPlayer.getAllPlayerSessionIds()[0]
interactiveData = api.branching.getInteractiveVideoMoments(sessionId)
choichePointMetadata = interactiveData.choicePointNavigatorMetadata.choicePointsMetadata.choicePoints

// create shorthand for playSegment
pS = api.videoPlayer.getVideoPlayerBySessionId(sessionId).playSegment

// crawl trough data:
stops = []
branches = []

Object.keys(interactiveData.momentsBySegment).forEach((segementKey) => {
	moment = interactiveData.momentsBySegment[segementKey].filter((moment) => {
		return moment.type.startsWith('scene:cs_')
	}).pop()
	if (!moment) {
		return
	}

	metadata = choichePointMetadata[moment.id]
	if (metadata) {
		text = `"${moment.id} - ${metadata.description}"`
	} else {
		text = moment.id
	}
	stops.push(`${moment.id}[${text}]`)

	moment.choices.forEach(({id: choiceId, sg, segmentId, text}) => {
		branches.push(`${moment.id}-- "${segmentId || text}" -->${sg || choiceId}`)
	})
})

if (interactiveData.segmentGroups) {
	Object.keys(interactiveData.segmentGroups).forEach((groupKey) => {
		stops.push(`${groupKey}(${groupKey})`)

		interactiveData.segmentGroups[groupKey].forEach((data, i) => {
			if (typeof data === 'string') {
				branches.push(`${groupKey}-.->${data}`)
			} else if (data.segment && data.precondition) {
				branches.push(`${groupKey}-. "${data.precondition}" .->${data.segment}`)
			} else if (data.segement) {
				branches.push(`${groupKey}-.->${data.segement}`)
			} else if (data.segmentGroup) {
				branches.push(`${groupKey}-.->${data.segmentGroup}`)
			} else {
				console.dir(data)
				throw `Unkown structure for entry ${i} in Segment Group ${groupKey}!`
			}
		})
	})
}

// package data for visualization:
mermaidjsData = {
	'code':
		'graph LR\n' + 
		stops.join('\n') + '\n' +
		branches.join('\n') + '\n',
	'mermaid': {'theme':'default'}
}

console.log(mermaidjsData.code)
console.log(
	'Paste the data written above into ' + 
	'https://mermaidjs.github.io/mermaid-live-editor' +
	' to get your visualization.'
)

// The following is not working for now:
//mermaidjsQuery = btoa(JSON.stringify(mermaidjsData))
//window.open('https://mermaidjs.github.io/mermaid-live-editor/#/view/' + mermaidjsQuery, '_blank')
