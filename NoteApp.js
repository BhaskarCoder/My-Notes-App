    let addButton = document.getElementById('addBtn');
    showNotes();
    addButton.addEventListener('click', event => {
      let textArea = document.getElementById('textArea');
      let titleArea = document.getElementById('addTitle');

      let storedNote = localStorage.getItem('Note');

      if (storedNote == null) {
        noteList = [];
      } else {
        noteList = JSON.parse(storedNote);
      }
      let myNoteObj = {
        title: titleArea.value,
        text: textArea.value
      };
      noteList.push(myNoteObj);
      localStorage.setItem('Note', JSON.stringify(noteList));
      console.log(storedNote);
      showNotes();
      textArea.value = "";
      titleArea.value = "";
    })

    function showNotes() {
      let storedNote = localStorage.getItem('Note');

      if (storedNote == null) {
        noteList = [];
      } else {
        noteList = JSON.parse(storedNote);
      }
      let html = "";
      noteList.forEach(function(element, index) {
        html += `
        <div class="card" style="width: 23rem; margin:10px;">
          <div class="cardClass card-body" style="background-color:#DCD037">
            <h5 id="${index}" class="card-title">${index+1}. ${element.title}</h5>
            <p id='para' class="card-text">${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger" style='margin-right:10px;margin-top:5px'>Delete Note</button>
            <button id="${index}" onclick="editNote(this.id)" class="btn btn-dark" style='margin-top:5px'>Edit Note</button>
          </div>
        </div>`;

      })


      let noteCard = document.getElementById('noteCard');
      if (noteList.length == 0) {
        noteCard.innerHTML = `<div style="margin-left:10px;border-bottom:5px ridge white;padding:3px"><b>(｡>ㅅ<｡)💦Sorry…,</b> Nothing has been added to show. Write your note in the above section ಥ‿ಥ.</div>`;
      } else {
        noteCard.innerHTML = html;
      }
    }

    //start
    noteList.forEach(elem => {
      let val = localStorage.getItem('noteItem');
      let myPara = document.getElementById('para');
      if (val == null) {
        myPara.innerHTML = elem;
      } else {
        myPara.innerHTML = val;
      }
    })
    //end



    function deleteNote(indexes) {
      console.log('Deleting')
      let storedNote = localStorage.getItem('Note');

      if (storedNote == null) {
        noteList = [];
      } else {
        noteList = JSON.parse(storedNote);
      }
      noteList.splice(indexes, 1);
      localStorage.setItem('Note', JSON.stringify(noteList));
      showNotes();
    }

    let searchText = document.getElementById('searchTxt');
    searchText.addEventListener('input', function() {
      searchVal = searchText.value.toLowerCase();
      //console.log(searchVal+' typed');
      let allCards = document.getElementsByClassName('cardClass');
      Array.from(allCards).forEach(function(elem) {
        let cardText = elem.getElementsByTagName('p')[0].innerText;
        if (cardText.toLowerCase().includes(searchVal)) {
          elem.style.display = "block";
        } else {
          elem.style.display = "none";
        }

      })

      searchBtn = document.getElementById('searchBtn');
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
      })
    })


    function editNote(index) {

      let Textarea = document.getElementsByClassName('textsArea');
      if (Textarea.length == 0) {
        let btnPara = document.getElementById(index);
        let cardPara = btnPara.parentElement;
        let paragraph = cardPara.children[1];
        let Html = paragraph.innerText;
        paragraph.innerHTML = `<textarea class="form-control" id="textsArea" style='background-color:#DCD037;border:2px solid #DCD037' rows="3">${Html}</textarea>`;
      }

      window.onload = function() {
        Textarea.addEventListener('blur', function() {
          paragraph.innerHTML = Textarea.value;
          localStorage.setItem('noteItem', Textarea.value);
        });
      }
    }
