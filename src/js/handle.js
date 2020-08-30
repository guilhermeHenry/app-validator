const regexs = require('./resources/regex.js');
const templates = require('./resources/messages.js');

// ## MODELS
const min = require('./models/min.js');
const max = require('./models/max.js');

const handle = {
	set value(value){this.val = value},
	get value(){return this.val},
	set input(element){this.element = element}
};

handle.errorMessage = null;

// ## MESSAGE
handle.messages = function (index, attrs) {
	let tpl = null;

	if (index.indexOf('.') > -1){
		let p = index.split('.');
		tpl = templates[p[0]][p[1]];
		
	}else if(templates.hasOwnProperty(index)){
		tpl = templates[index];
	}

    if (tpl && attrs){
		Object.keys(attrs).forEach(name => {
			tpl = tpl.replace(`:${name}`, attrs[name]);
		});
	}

	return tpl;
}

handle.min = min.bind(handle);
handle.max = max.bind(handle);

// --
handle.url = function (){return !regexs.url.test(this.value) ? this.messages('url') : false}
handle.email = function () {
	let verify = regexs.email.test(this.value);

	this.errorMessage = !verify ? this.messages('email', {'attribute': 'seu email'}) : null;
	return !verify ? true : false;
}


handle.required = function (){
	let verify = !this.value || this.value === "" || this.value === undefined;
	this.errorMessage = verify ? 'Favor preencher o campo' : null;
	return !verify ? true : false;
}

module.exports = handle;
