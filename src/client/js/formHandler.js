function sentimented(data) {
	let dataOutput;

	switch (data) {
		case 'P+':
			dataOutput = 'strong positive';
			break;
		case 'P':
			dataOutput = 'positive';
			break;
		case 'NEU':
			dataOutput = 'neutral';
			break;
		case 'N':
			dataOutput = 'negative';
			break;
		case 'N+':
			dataOutput = 'strong negative';
			break;
		case 'NONE':
			dataOutput = 'without polarity';
			break;
		default:
			dataOutput = 'no emotion';
	}

	return dataOutput;
}

function subjectivity(data) {
	if (data === 'OBJECTIVE') {
		return 'the text does not have any subjectivity marks.';
	} else {
		return 'the text has subjective marks.';
	}
}

function agreement(data) {
	if (data === 'AGREEMENT') {
		return 'the different elements have the same polarity.';
	} else {
		return "there is disagreement between the different elements' polarity.";
	}
}

function irony(data) {
	if (data === 'NONIRONIC') {
		return 'the text does not have any irony marks.';
	} else {
		return 'the text has irony marks.';
	}
}

function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById('name').value;
	Client.checkForName(formText);

	// validate when user don't type in
	if (formText.trim() === '') {
		return;
	}

	console.log('::: Form Submitted :::');
	const dataPostToServer = { formText };
	const localServer = 'http://localhost:5000/data';
	Client.postDataToServer(dataPostToServer, localServer)
		.then(() => Client.getDataFromServer(localServer))
		.then((data) => {
			const listElement = document.getElementById('results-list');

			listElement.innerHTML = `
				<li>Status: ${data.status.msg}</li>
				<li>Content: ${formText}</li>
				<li>Sentimented: ${sentimented(data.score_tag)}</li>
				<li>Agreement: ${agreement(data.agreement)}</li>
				<li>Subjectivity: ${subjectivity(data.subjectivity)}</li>
				<li>Irony: ${irony(data.irony)}</li>
			`;
		})
		.then(() => (document.getElementById('name').value = ''))
		.catch((error) => alert(error));
}

export { handleSubmit };
