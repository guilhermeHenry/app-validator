const handle = require('./handle.js');

module.exports = function(field, rules, callback = null) {
	let errors = [];
	
	if (!rules){console.warn('Passe as regras por parâmetro!'); return}
	if (!field && typeof field === 'object'){console.warn('Elemento não encontrado!'); return}

	let value = !field.value || field.value === "" || field.value === undefined ? '' : field.value;

	handle.input = field;
	let required = rules.indexOf("required") > -1 ? handle['required']() : null;
	
	if (required){
		errors.push(handle.errorMessage);
	}else if(value){ /** Para validator deve haver conteúdo no campo */
		rules.split('|').forEach(item => {
			if (checkParam(item)){
				errors.push(handle.errorMessage);
			}
		});
	}

	return callback && typeof callback === 'function' ? callback(field, errors) : errors;
}

function checkParam(str) {
	let error = false;
	let tpl = {
		index:  str.match(/^[a-z]+/gi),    /**  email   */
		param: str.match(/:(\w+)/g)  /** :string  */
	};

	let index = tpl.index ? tpl.index[0] : null;
	let param = tpl.param ? tpl.param[0].replace(':', '') : null;

	// ## SYSTEM VALIDATION
	if (!index || index && !handle.hasOwnProperty(index)){console.warn('Indice inexistente ou não encontrado'); return}

	handle.param = param;

	return handle[index]();
}