import check from './check.js';
import debounce from './debounce.js';
import showUserErro from './advert.js';
import handle from './handle.js';

let validator = function (rules, form = 'form') {

    let element_password = document.querySelector('[name="password"]');
    check(element_password, 'required|min:4|max:8', showUserErro);

	this.fields = new Array;
	this.form  = typeof form === "object" ? form : document.forms[form];

    if (!this.form){console.log('Formulário não encontrado'); return;}

	Object.keys(rules).forEach((name) => {
    	this.fields.push({
			name: name,
			rules: rules[name] ? rules[name] : null,
	        element: this.form[name],
	        value: null,
	        checked: null
		});
    });

    if (this.fields.length === 0){console.warn('Nenhum campo encontrado!'); return}
	// this.init();
}

validator.prototype.init = function() {
    this.form.addEventListener('submit', event => {
        event.preventDefault();
        this.failed = false;

        this.fields.forEach(field => {
            const {element, rules} = field;
            const result = check(element, rules);
            if (result.length > 0){this.failed = true}
            showUserErro(element, result);
        });

        if (this.failed){
            event.preventDefault();
        }
    });
}

export default validator;









