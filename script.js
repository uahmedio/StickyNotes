;(function() {
    "use strict"

    jscolor.installByClassName("jscolor")

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        pointX,
        onDeleteNote,
        pointY,
        createNote,
        addNoteBtnEl,
        totalNotes = 0

    onDragStart = function(ev) {
        var boundClientRect
        if (ev.target.className.indexOf("bar") === -1) {
            return
        }

        draggedEl = this

        boundClientRect = draggedEl.getBoundingClientRect()

        pointY = boundClientRect.top - ev.clientY
        pointX = boundClientRect.left - ev.clientX
    }

    onDrag = function(ev) {
        if (!draggedEl) {
            return
        }

        var posX = ev.clientX + pointX,
            posY = ev.clientY + pointY

        if (posX < 0) {
            posX = 0
        }
        if (posY < 0) {
            posY = 0
        }

        draggedEl.style.transform =
            "translateX(" + posX + "px) translateY(" + posY + "px)"
    }

    onDragEnd = function() {
        draggedEl = null
        pointX = null
        pointY = null
    }

    onDeleteNote = function(e) {
        // document.body.removeChild(this.parentNode);
        document
            .getElementById("whiteboardContainer")
            .removeChild(this.parentNode)
    }

    createNote = function() {
        // I stedet for at lave mine "bokse" i HTML laver jeg dem her og tilføjer dem ind i de
        //	respekterende Elementer.
        var stickerEl = document.createElement("div"),
            barEl = document.createElement("div"),
            color = document.createElement("button"),
            colorIcon = document.createElement("i"),
            deleteBtn = document.createElement("button"),
            deleteBtnIcon = document.createElement("i"),
            moveIcon = document.createElement("i"),
            colorEl = document.createElement("input"),
            textareaEl = document.createElement("textarea")

        //Hvilke område der kan printes en ny seddel på siden!
        var transformCSSValue =
            "translateX(" +
            Math.random() * 800 +
            "px) translateY(" +
            Math.random() * 400 +
            "px)"

        stickerEl.style.transform = transformCSSValue

        //Giver dem en class
        barEl.classList.add("bar")
        stickerEl.classList.add("sticker")
        color.classList.add("color")
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.value = "Remove Element"

        deleteBtnIcon.classList.add("ion-android-delete")
        colorIcon.classList.add("ion-android-color-palette")
        stickerEl.id = "rect" + totalNotes++

        colorEl.classList.add("jscolor")
        colorEl.value = "FFEFA0"
        var picker = new jscolor(colorEl)
        colorEl.onchange = function() {
            update(colorEl.value)
        }

        //moveIcon.classList.add('ion-arrow-move');		//Dette er iconnet til at flytte

        // tilføj til:
        stickerEl.append(barEl)
        stickerEl.append(color)
        stickerEl.append(deleteBtn)
        stickerEl.append(colorEl)
        stickerEl.appendChild(textareaEl)
        color.append(colorIcon)
        deleteBtn.append(deleteBtnIcon)
        barEl.append(moveIcon)

        stickerEl.addEventListener("mousedown", onDragStart, false)
        deleteBtn.addEventListener("click", onDeleteNote, false)

        // document.body.appendChild(stickerEl);
        document.getElementById("whiteboardContainer").appendChild(stickerEl)
    }

    createNote()

    addNoteBtnEl = document.querySelector(".addNoteBtn")
    addNoteBtnEl.addEventListener("click", createNote, false)

    document.addEventListener("mousemove", onDrag, false)
    document.addEventListener("mouseup", onDragEnd, false)

    function update(jscolor) {
        var colorCall = document.querySelectorAll(".jscolor-active")
        var NotesCall = Array.prototype.filter.call(colorCall, function(
            colorCall
        ) {
            return (colorCall.parentNode.style.backgroundColor = "#" + jscolor)
        })
    }
})()
