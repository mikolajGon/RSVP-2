document.addEventListener(`DOMContentLoaded`, () =>{

	const form = document.querySelector(`#registrar`);
	const formInput = form.querySelector(`input`);
	const invitedUl = document.querySelector(`#invitedList`);
	const hideNotResponded = document.querySelector(`.main input`);

	function newElement(elementParent, element) {
		const name = document.createElement(element);
		elementParent.appendChild(name)
		return name
	}

	function text(elementParent, element, text) {
		const name = newElement(elementParent, element);
		name.textContent = text;
		return name;
	}

	function type(elementParent, element, type) {
		const name = newElement(elementParent, element);
		name.type = type;
		return name;
	}

	function submitForm() {
		const newLi = newElement(invitedUl, 'li');
		const newSpan = text(newLi, `span`, formInput.value);
		const newInput = type(newLi, `input`, 'text');
		newInput.value = formInput.value;
		newInput.classList.add(`invisible`);
		const label = text(newLi, `label`, `Confirmed`);
		label.setAttribute(`for`, `confirmed`);
		const checkbox = type(label, 'input', `checkbox`);
		checkbox.setAttribute(`name`, `confirmed`);
		const edit = text(newLi, 'button', 'Edit');
		const remove = text(newLi, 'button', `Remove`);
	}


	form.addEventListener(`submit`, (e) => {
		e.preventDefault();
		submitForm();
		formInput.value = ``;
	});

	invitedUl.addEventListener('change', (e) => e.target
			.parentElement
			.parentElement
			.classList.toggle(`responded`));

	invitedUl.addEventListener(`click`, (e) => {
		if (e.target.tagName === 'BUTTON') {
				function edit(className, text) {
						name.classList.toggle(className);
						input.classList.toggle(className);
						button.textContent = text;
				};
				const button = e.target;
				const li = button.parentNode;
				const ul = li.parentNode;
				const name = li.firstElementChild;
				const input = name.nextElementSibling;
				const nameActions = {
					Remove: () => ul.removeChild(li),
					Edit: () => edit(`invisible`, `Save`),
					Save: () => {
							name.textContent = input.value;
							edit(`invisible`, `Edit`);
					}
				};
				nameActions[button.textContent]();
		}
	});

	hideNotResponded.addEventListener(`change`, (e) => {
		const isChecked = e.target.checked;
		const invitedLi = [...invitedUl.children];
		invitedLi.forEach(li => {
			const checkbox = li.querySelector(`label input`);
			if (isChecked) {
				(!checkbox.checked) ?	li.classList.add(`invisible`) : li.classList.remove(`invisible`);
			} else {
				li.classList.remove(`invisible`);
			}
		});
	});

});
