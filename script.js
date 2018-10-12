(function() {
	"use strict";

	jscolor.installByClassName("jscolor");

	let draggedEl;
	let pointX;
	let pointY;
	let totalNotes = 0;

	let onDragStart = function(ev) {
		var boundClientRect;
		if (ev.target.className.indexOf("bar") === -1) {
			return;
		}

		draggedEl = this;

		boundClientRect = draggedEl.getBoundingClientRect();

		pointY = boundClientRect.top - ev.clientY;
		pointX = boundClientRect.left - ev.clientX;
	};

	let onDrag = function(ev) {
		if (!draggedEl) {
			return;
		}

		var posX = ev.clientX + pointX,
			posY = ev.clientY + pointY;

		if (posX < 0) {
			posX = 0;
		}
		if (posY < 0) {
			posY = 0;
		}

		draggedEl.style.transform =
			"translateX(" + posX + "px) translateY(" + posY + "px)";
	};

	let onDragEnd = function() {
		draggedEl = null;
		pointX = null;
		pointY = null;
	};

	let onDeleteNote = function(e) {
		document
			.getElementById("whiteboardContainer")
			.removeChild(this.parentNode);
	};

	let createNote = function() {
		// Just getting some random coordinates, so every notes dont get stacked
		var transformCSSValue =
			"translateX(" +
			Math.random() * 800 +
			"px) translateY(" +
			Math.random() * 400 +
			"px)";

		// creating a unique Note Id
		let stickerId = "rect" + totalNotes++;

		// Creating the Note container
		let $div = $("<div>", {
			id: stickerId,
			class: "sticker",
			style: `transform:${transformCSSValue}`
		});

		// Giving the Note container some button and input fields content
		$($div).append(`
			<div class="bar"></div>
			<button class="color ion-android-color-palette"></button>
			<button class="deleteBtn ion-android-delete"></button>
			<input id="inputId${totalNotes}" autocomplete="off" class="jscolor">
			<textarea></textarea>
			`);

		// Setting our Note container to the html div
		$("#whiteboardContainer").append($div);

		// Finding the setting the Sticker input
		let colorBtnInput = $("#" + stickerId + " input");
		colorBtnInput.val("FFEFA0");

		// creating a new jscolor object, because else it will not be able to create new note
		// and set the colors of them
		let picker = new jscolor(
			document.getElementById("inputId" + totalNotes)
		);
		// When we change the value on the color changer
		$("#" + stickerId + " input").change(function() {
			// Then we want to change the color of the input textare field
			$("#" + stickerId).css(
				"background-color",
				"#" + colorBtnInput.val()
			);
		});
		// When we are holding down the moving part
		$("#" + stickerId).mousedown(onDragStart);
		// When we click the delete button
		$("#" + stickerId + " .deleteBtn").click(onDeleteNote);

		// Just a on click to hide or display the color picker
		$("#" + stickerId + " .color").click(function() {
			if ($("#" + stickerId + " input").css("display") === "none") {
				$("#" + stickerId + " input").css("display", "block");
			} else {
				$("#" + stickerId + " input").css("display", "none");
			}
		});
	};

	// Creating the first Note
	createNote();

	// Creating a new Note
	$(".addNoteBtn").click(createNote);

	// When we are moving our mouse. And giving the element we are moving new x and y pos
	$(document).mousemove(onDrag);
	// spotting the dragging of the element and clearing it
	$(document).mouseup(onDragEnd);
})();
