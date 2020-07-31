export default function () {
	if (!this.param){console.warn('Parâmetro é obrigatório'); return}
	if (!this.target){console.warn('Target é obrigatório'); return}

	let tpl = null;
	let param = null;
	let value = null;
	let fileSizeMin = null;
	let fileSizeMax = null;
	let quantities = {k: '000', m: '000000', g: '000000000'};
	let quantities_name = {k: 'kilo', m: 'mega', g: 'giga'}; /** Grandezas killo(10^3) mega(10^6) giga(10^9)*/

	/* ## ATTRIBUTE */
	if (this.element.getAttribute('type') !== 'file'){console.warn('O campo deve ser do tipo file'); return;}

	if (this.target === 'min' || this.target === 'max'){
		param = this.param.match(/^(\((102[0-4]|10[01]\d|\d?\d?\d)(mb|kb|gb)\))$/g); /** 10 (kb|mb|gb) */
		if (!param){console.warn('Parâmetro inválido! Ex: ([0-1024](kb|mb|gb))'); return}
	}

	switch (this.target){
		case 'min':
			fileSizeMin = param[0].replace(/\(|\)/g, ''); // Removendo os parênteses
			tpl = fileSizeMin;
			fileSizeMin = fileSizeMin.replace(/b/g, ''); // Removendo os b (bytes)
			Object.keys(quantities).forEach(item => {fileSizeMin = fileSizeMin.replace(item, quantities[item])});

			// ## CHECK
			if (this.element.files && this.element.files.length > 0) {
				for (var i = 0; i < this.element.files.length; i++) {
					let file = this.element.files.item(i);
					let fsize = file.size; // bytes

					if (fsize < fileSizeMin) {
						return messages('min.file', {attribute: 'Attributo', min: tpl});
					}
					return false;
				}
			}
			break;

		case 'max':
			fileSizeMax = param[0].replace(/\(|\)/g, ''); // Removendo os parênteses
			tpl = fileSizeMax;
			fileSizeMax = fileSizeMax.replace(/b/g, ''); // Removendo os b (bytes)
			Object.keys(quantities).forEach(item => {fileSizeMax = fileSizeMax.replace(item, quantities[item])});

			// ## CHECK
			if (this.element.files && this.element.files.length > 0) {
				for (var i = 0; i < this.element.files.length; i++) {
					let file = this.element.files.item(i);
					let fsize = file.size; // bytes

					if (fsize > fileSizeMax) {
						return messages('max.file', {attribute: 'Attributo', max: tpl});
					}
					return false;
				}
			}
			break;

		case 'between':
			param = this.param.match(/^(\((102[0-4]|10[01]\d|\d?\d?\d)(mb|kb|gb)-(102[0-4]|10[01]\d|\d?\d?\d)(mb|kb|gb)\))$/g);
			if (!param){console.warn('Parâmetro inválido! ([0-1024](kb|mb|gb)-[0-1024](kb|mb|gb))'); return}
			param = param[0].replace(/\(|\)/g, ''); // Removendo os parênteses

			// ## TEMPLATE
			tpl = param.split('-');

			param = param.replace(/b/g, ''); // Removendo os b (bytes)
			Object.keys(quantities).forEach(item => {param = param.replace(item, quantities[item])});

			param = param.split('-');
			fileSizeMin = parseInt(param[0]);
			fileSizeMax = parseInt(param[1]);

			if (fileSizeMin > fileSizeMax){console.warn('O valor máximo deve ser maior do que o valor mínimo'); break;}

			// ## CHECK
			if (this.element.files && this.element.files.length > 0) {
				for (var i = 0; i < this.element.files.length; i++) {
					let file = this.element.files.item(i);
					let fsize = file.size; // bytes

					if (fsize < fileSizeMin || fsize > fileSizeMax) {
						return messages('between.file', {attribute: 'Attributo', min: tpl[0], max: tpl[1]});
					}
					return false;
				}
			}
			break;
		default:
			console.warn('Target não encontrado');
	}
}