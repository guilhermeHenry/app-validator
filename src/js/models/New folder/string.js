export default function () {
	if (!this.param){console.warn('Parâmetro é obrigatório'); return}
	if (!this.target){console.warn('Target é obrigatório'); return}

	let size = null;
	let param = null;
	let value = null;

	if (this.target === 'min' || this.target === 'max'){
		param = this.param.match(/^\(\d{1,3}\)$/); /** (10) */
		value = param ? param[0].replace(/\(|\)/g, '') : null; /** 10 */
		size  = parseInt(value);
	}else{
		param = this.param.match(/\(\d{1,5}-\d{1,5}\)/);
	}

	switch(this.target){
		case 'min':
			return this.val.length < size  ? this.messages('min.string', {attribute: 'atributo', min: size}) : false;
			break;
		case 'max':
			return this.val.length > size  ? this.messages('max.string', {attribute: 'atributo', max: size}) : false;
			break;
		case 'between':
			if (!param){console.warn('Parâmetro inválido! Ex: Between:string(999-999)'); return}
			value = param ? param[0].replace(/\(|\)/g, '') : null;
			let between =  value.split('-');
			let min = parseInt(between[0]);
			let max = parseInt(between[1]);
			if (min >= max){console.warn('Max deve ser maior do que min'); break;}
			return this.val.length > max || this.val.length < min ? this.messages('between.string', {attribute: 'atributo', min: min, max: max}) : false;
			break;
		default:
			console.warn('Target não encontrado');
	}
}