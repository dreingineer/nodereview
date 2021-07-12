const sendEmail = document.getElementById('highfive')

sendEmail.addEventListener('click', async (e) => {
	e.preventDefault();

	const name = document.getElementById('name').value
	const email = document.getElementById('email').value
	const subject = document.getElementById('subject').value
	const emailbody = document.getElementById('message').value

	let contactForm = {
		name, email, subject, emailbody
	}
	
	// using axios to post to node rest api
	let url = '/api/send-email'
	let response = await axios.post(url, contactForm)
	let status = await response.data
	console.log(status)
	
	alert('Email Sent')

	//clear the input and text fields
	document.getElementById('name').value = null
	document.getElementById('email').value = null
	document.getElementById('subject').value = null
	document.getElementById('message').value = null

	return
})