const registrar = document.querySelector(`#registrar`);
const addInviteeInput = registrar.querySelector(`#add_invitee_input`);
const invitedUl = document.querySelector(`#invitedList`);
const hideNotRespondedCheckbox = document.querySelector(`.main input`);
const emptyInviteeTile = document.querySelector('#empty_invitee').firstElementChild;

// added one user add beggining for testing purpose
const Czarek = new Invitee(0, 'Czarek', true);

let invitees = [Czarek];
let nextId = invitees.length;

/* -----------------
 Object Functions
------------------ */

function addNewInvitee() {
	const newInvitee = new Invitee(nextId, addInviteeInput.value);
	invitees = [...invitees, newInvitee];
	addInviteeInput.value = ``;
	nextId++
}

function indexOfId(id) {
	const index = invitees.findIndex(invitee => invitee.id === id);
	return index;
}

function editOrRemoveInvitee(button) {
	const buttonName = button.textContent.toLowerCase();
	const inviteeId = parseInt(button.dataset[buttonName]);
	const inviteeIndex = indexOfId(inviteeId);
	const invitee = invitedUl.querySelector(`#invitee-${inviteeId}`);
	const buttonActions = {
		remove: () => {
			invitees = [
				...invitees.slice(0,inviteeIndex),
				...invitees.slice(inviteeIndex + 1)
			];
			renderAllInvitees();
		},
		edit: () => {
			invitee.querySelector('[data-name]').classList.add('invisible');
			invitee.querySelector('[data-input]').classList.remove('invisible');
			button.textContent = `Save`;
		},
		save: () => {
			const newName = invitee.querySelector('[data-input]').value;
			invitees[inviteeIndex].changeName(newName);
			renderAllInvitees();
		}
	};
	buttonActions[buttonName]();
}

/* -----------------
 Rendering Function
------------------ */

function renderAllInvitees() {
	while (invitedUl.firstChild) {
		invitedUl.removeChild(invitedUl.firstChild);
	}
	const isChecked = hideNotRespondedCheckbox.checked;
	let inviteesToDisplay;
	if (isChecked) {
		inviteesToDisplay = invitees.filter(invitee => invitee.confirmed);
	} else{
		inviteesToDisplay = invitees;
	}
	const docFrag = document.createDocumentFragment();
	inviteesToDisplay.forEach(invitee => {
		const inviteeTile = emptyInviteeTile.cloneNode(true);
		inviteeTile.setAttribute('id', `invitee-${invitee.id}`);
		inviteeTile.querySelector('[data-name]').textContent = invitee.name;
		inviteeTile.querySelector('[data-input]').value = invitee.name;
		inviteeTile.querySelector('[data-input]').dataset.input = invitee.id;
		inviteeTile.querySelector('[data-edit]').dataset.edit = invitee.id;
		inviteeTile.querySelector('[data-save]').dataset.save = invitee.id;
		inviteeTile.querySelector('[data-remove]').dataset.remove = invitee.id;
		inviteeTile.querySelector('[data-confirmed]').dataset.confirmed = invitee.id;
		inviteeTile.querySelector('[name="confirmed"]').checked = invitee.confirmed;
		if (invitee.confirmed) inviteeTile.classList.add('responded');
		docFrag.appendChild(inviteeTile);
	});
	invitedUl.appendChild(docFrag);
}

/* -----------------
		Listeners
------------------ */

document.addEventListener('DOMContentLoaded', renderAllInvitees);

registrar.addEventListener(`submit`, (e) => {
	e.preventDefault();
	if (addInviteeInput.value.length < 3) alert('Invitee name must be at least 3 characters');
	else {
		addNewInvitee();
		renderAllInvitees();
		addInviteeInput.value = '';
	};
});

invitedUl.addEventListener('change', (e) => {
	if (e.target.name === "confirmed") {
		const inviteeId = parseInt(e.target.dataset.confirmed);
		const inviteeIndex = indexOfId(inviteeId);
		invitees[inviteeIndex].changeConfirmedStatus();
		renderAllInvitees();
	}
});

invitedUl.addEventListener(`click`, (e) => {
	if (e.target.tagName === 'BUTTON') {
		editOrRemoveInvitee(e.target);
	}
});

hideNotRespondedCheckbox.addEventListener(`change`, renderAllInvitees);
