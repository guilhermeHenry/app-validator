const debounce = require('lodash/debounce');
const check = require('./check.js');
const showUserErro = require('./advert.js');


let validator = function (rules, form = 'form') {

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

module.exports = validator;