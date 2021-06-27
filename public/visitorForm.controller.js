function setup() {
	noCanvas()
	const video = createCapture(VIDEO)
	video.size(320, 240)

	const button = document.getElementById('submit')
	
	button.addEventListener('click', async () => {
		console.log('clicking')
		const visitorName = document.getElementById('name').value
		const visitorEmail = document.getElementById('email').value
		const visitorComment = document.getElementById('comment').value
		const visitorStatus = document.getElementById('status').value
		video.loadPixels()
		const visitorImage64 = video.canvas.toDataURL()
		// const timeStamp = Date.now()

		let formData = {visitorName, visitorEmail, visitorComment, visitorStatus, visitorImage64}
		
		let options = {
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(formData)
		}
		console.log(options)

		// console.log(formData)
		let response = await fetch('/api/formdata', options)
		let sentData = ''
		if(!response.ok) {
			throw new Error(`HTTP Error! Status : ${response.status}`)
		} else {
			sentData = await response.json()
			console.log('Sent to Node', sentData)
		}
		// fetch('/api/formdata', options)
		// 	.then(response => {
		// 		console.log(response)
		// 	}).catch(error => {
		// 		console.error(error)
		// 	})
	})

	const getData = async () => {
		const response = await fetch('/api/formdata')
		const data = await response.json()
	
		let table = document.getElementById('dataName')
	
		data.forEach(element => {
			console.log(element)
			let row = `<table>
								<tr>
									<td><strong>Visitor's ID: </strong></td>
									<td>${element._id}</strong></td>
								</tr>
								<tr>
									<td><strong>Visitor's Name: </strong></td>
									<td>${element.name}</strong></td>
								</tr>
								<tr>
									<td><strong>Visitor's Status: </strong></td>
									<td>${element.status}</td>
								</tr>
								</table>
								<br>`
			// table.innerHTML += row
		});
	}

	// getData();
	
}