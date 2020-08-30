module.exports = function(input, msg = null) {
	let ul = null;
	let li = null;
	let nameID = 'msg-message-' + input.getAttribute('name');
	let target = document.getElementById(nameID); /** ul */

	if (target){
		ul = target;
	}else{
		ul = document.createElement('ul');
		ul.id = nameID; /** Somente para getElement */
		ul.classList.add('warning');
	}

	// ## CLEAR
	let child = ul.children;
	if (child){for(var x = 0; x < child.length; x++){child.item(x).remove()}}

	// ## ADD MESSAGE
	if (!msg){return;}
	if (msg.length > 0){
		msg.forEach((text) => {
			li = document.createElement('li');
			li.innerHTML = text;
			ul.append(li);
		});
		input.parentNode.insertBefore(ul, input.nextSibling);
	}
}