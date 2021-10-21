function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById('name').value;
	Client.checkForName(formText);	
	
	console.log('::: Form Submitted :::');
	const dataPostToServer = { formText };
	const localServer = 'http://localhost:5000/data';
	Client.postDataToServer(dataPostToServer, localServer)
		.then(() => Client.getDataFromServer(localServer))
		.then((data) => {
			const listElement = document.getElementById('results-list');

			listElement.innerHTML = `
				<li>Content: ${formText}</li>
				<li>Status: ${data.status.msg}</li>
				<li>Agreement: ${data.agreement}</li>
				<li>Subjectivity: ${data.subjectivity}</li>
				<li>Confidence score: ${data.confidence}</li>
				<li>Irony: ${data.irony}</li>
			`;
		})
		.then(() => (document.getElementById('name').value = ''))
		.catch((error) => alert(error));
}

export { handleSubmit };
