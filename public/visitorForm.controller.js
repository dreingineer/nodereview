let video;
function setup() {
	const button = document.getElementById('submit')
	
	button.addEventListener('click', async () => {
		// console.log('clicking')
		alert('Comment Posted!');
		
		const visitorName = document.getElementById('modalName').value
		const visitorEmail = document.getElementById('modalEmail').value
		const visitorStatus = document.getElementById('modalStatus').value
		const visitorComment = document.getElementById('modalMessage').value
		// video.loadPixels()
		// const visitorImage64 = video.canvas.toDataURL()
		// const timeStamp = Date.now()

		let formData = {visitorName, visitorEmail, visitorComment, visitorStatus}
		
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

	button.addEventListener('click', async () => {
		// modal.style.display = 'none'
		await setTimeout(closeModal(), 3000)
	})

	const getData = async () => {
		const response = await fetch('/api/formdata', {credentials: 'include'})
		const data = await response.json()
		// console.log(data);
		let table = document.getElementById('dataName')
	
		data.forEach(element => {
			// console.log(element)
			const dateString = new Date(element.timestamp).toLocaleString()
			let row = `
								<div class="tabledata" style="border: 1px solid gray; margin: 15px; padding: 15px;">
								<table>
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

	let modal = document.getElementById('pageModal')
	let openModal = document.getElementById('commentBtn')
	let span = document.getElementsByClassName('close')[0]

	openModal.addEventListener('click', async () => {
		modal.style.display = 'block'
	})

	span.addEventListener('click', async () => {
		modal.style.display = 'none'
	})

	let closeModal = async () => {
		modal.style.display = 'none'
	}

	//when user clicks on the window
	window.onclick = async (event) => {
		if(event.target == modal) {
			modal.style.display = 'none'
		}
	}
}
