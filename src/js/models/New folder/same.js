module.exports = function () {
	if (!this.param){console.warn('Parâmetro é obrigatório'); return}

	let param = this.param ? this.param.replace(/\(|\)/g, '') : null; /** 10 */
	let element = document.querySelector(`[name="${param}"]`);
	if (!element){console.warn('Elemento não encontrado'); return}

	let value = element.value;
	if (!value || value === "" || value === undefined){return `O campo ${param} deve ser preenchido primeiro`}

	return this.value != value  ? messages('same') : false;
}