(function () {
	'use strict';

	var draggedEl,
		onDragStart, 
		onDrag,
		onDragEnd,
		grabPointX,
		grabPointY,
		createNote,
		addNoteBtnEl,
		deleteNote,
		deleteNoteBtnEl;

	onDragStart = function(ev) {
		var boundClientRect;
		if(ev.target.className.indexOf('bar') === -1) {
			return;
		}

		draggedEl = this;

		boundClientRect = draggedEl.getBoundingClientRect();

		grabPointY = boundClientRect.top - ev.clientY;
		grabPointX = boundClientRect.left - ev.clientX;
	};

	onDrag = function(ev) {
		if (!draggedEl) {
			return;
		}

		var posX = ev.clientX + grabPointX,
			posY = ev.clientY + grabPointY;

		if (posX < 0){
			posX = 0;
		}
		if (posY < 0){
			posY = 0;
		}

		draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
	};

	onDragEnd = function(){
		draggedEl = null;
		grabPointX = null;
		grabPointY = null;
	}

	createNote = function(){
		// I stedet for at lave mine "bokse" i HTML laver jeg dem her og tilføjer dem ind i de
		//	respekterende Elementer.
		var stickerEl = document.createElement('div'),
			barEl = document.createElement('div'),
			color = document.createElement('button'),
			colorIcon = document.createElement('i'),
			deleteBtn = document.createElement('button'),
			deleteBtnIcon = document.createElement('i'),
			moveIcon = document.createElement('i'),
			colorEl = document.createElement('input'),
			textareaEl = document.createElement('textarea');

		//Hvilke område der kan printes en ny seddel på siden!
		var transformCSSValue = "translateX(" + Math.random() * 800 + "px) translateY(" + Math.random() * 400 + "px)";

		stickerEl.style.transform = transformCSSValue; 

		//Giver dem en class
		barEl.classList.add('bar');
		stickerEl.classList.add('sticker');
		color.classList.add('color');
		deleteBtn.classList.add('deleteBtn');
		deleteBtnIcon.classList.add('ion-android-delete');
		colorIcon.classList.add('ion-android-color-palette');
		stickerEl.id = "rect";

		colorEl.classList.add('jscolor');
		colorEl.onchange = function(){update(this.jscolor)};
		colorEl.value = "cc66ff";

		//moveIcon.classList.add('ion-arrow-move');		//Dette er iconnet til at flytte

		// tilføj til:
		stickerEl.append(barEl);
		stickerEl.append(color);
		stickerEl.append(deleteBtn);
		stickerEl.append(colorEl);
		stickerEl.appendChild(textareaEl); 
		color.append(colorIcon);
		deleteBtn.append(deleteBtnIcon);
		barEl.append(moveIcon);

		stickerEl.addEventListener('mousedown', onDragStart, false);

		document.body.appendChild(stickerEl);
		
	};

	
	createNote();

	addNoteBtnEl = document.querySelector('.addNoteBtn');
	addNoteBtnEl.addEventListener('click', createNote, false);

	/*deleteNoteBtnEl = document.querySelector('.deleteBtn');
	deleteNoteBtnEl.addEventListener('click', deleteNote, false);*/

	document.addEventListener('mousemove', onDrag, false);
	document.addEventListener('mouseup', onDragEnd, false);
	//deleteNote.addEventListener('click', deleteNote, false);
	
})();

