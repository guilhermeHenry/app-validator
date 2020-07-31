export default function () {
	let type  = this.element.getAttribute('type');
	let value = this.element.value;
	let max   = this.param;

	switch(type){
		case 'password':
			if (value.length > max){
				this.errorMessage = this.messages('max.string', {attribute: 'atributo', max: max});
				return true;
			}
			break;
	}

	return false;
}
