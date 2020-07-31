export default function () {
	let type = this.element.getAttribute('type');
	let value = this.element.value;
	let min = parseInt(this.param);

	switch(type){
		case 'password':
			if (value.length < min){
				this.errorMessage = this.messages('min.string', {attribute: 'atributo', min: min});
				return true;
			}
			break;
	}

	return false;
}




































