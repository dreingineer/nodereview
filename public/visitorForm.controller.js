let video;
function setup() {
	// noCanvas()
	background(51)
	let cnv = createCanvas(320, 240)
	video = createCapture(VIDEO)
	video.elt.setAttribute('playsinline', '')
	//hides video
	video.hide()
	video.size(320, 240)
	cnv.position(0, 0, 'fixed')

	const button = document.getElementById('submit')
	
	button.addEventListener('click', async () => {
		// console.log('clicking')
		const visitorName = document.getElementById('name').value
		const visitorEmail = document.getElementById('email').value
		const visitorComment = document.getElementById('comment').value
		const visitorStatus = document.getElementById('status').value
		video.loadPixels()
		const visitorImage64 = video.canvas.toDataURL()
		// const timeStamp = Date.now()

		let formData = {visitorName, visitorEmail, visitorComment, visitorStatus, visitorImage64}

		// let formData = {visitorName, visitorEmail, visitorComment, visitorStatus}
		
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
		let json = await response.json()
		console.log(json)
	})

	const getData = async () => {
		const response = await fetch('/api/formdata')
		const data = await response.json()
	
		let table = document.getElementById('dataName')
	
		data.forEach(element => {
			// console.log(element)
			const dateString = new Date(element.timestamp).toLocaleString()
			let row = `
								<div style="border: 1px solid gray; margin: 15px; padding: 15px;">
								<table>
								<tr>
									<td><strong>Visitor's Picture</strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;<img src="${element.visitorImage64}" alt="visitor's image" style="border: 1px solid gray;"></img></td>
								</tr>
								<tr>
									<td><strong>Visitor's ID: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${element._id}</strong></td>
								</tr>
								<tr>
									<td><strong>Visitor's Name: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${element.visitorName}</strong></td>
								</tr>
								<tr>
									<td><strong>Visitor's Email: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${element.visitorEmail}</td>
								</tr>
								<tr>
									<td><strong>Comment: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${element.visitorComment}</td>
								</tr>
								<tr>
									<td><strong>Visitor's Status: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${element.visitorStatus}</td>
								</tr>
								<tr>
									<td><strong>Date Visited: </strong></td>&emsp;
									<td>&emsp;&emsp;&emsp;${dateString}</td>
								</tr>
								</table>
								</div>
								`
			table.innerHTML += row
		});
	}

	getData();
}

function draw() {
	tint(255, 255, 0)
	image(video, 0 ,0)
}