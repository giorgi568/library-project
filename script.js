let myLibrary = [];

function book(title, author, pages, readOrNot) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readOrNot = readOrNot;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${readOrNot}`;
  };
}

function addBookToLibrary(title, author, pages, readOrNot) {
  myLibrary.push(new book(title, author, pages, readOrNot));
}

const bookShelf = document.querySelector('.bookShelf');

function displayBooks(i) {
  const trTag = document.createElement('tr');
  const tdTag1 = document.createElement('td');
  const tdTag2 = document.createElement('td');
  const tdTag3 = document.createElement('td');
  const tdTag4 = document.createElement('td');
  const tdtag5 = document.createElement('td');

  tdtag5.classList.add('tdAction');

  trTag.dataset.id = i;

  bookShelf.appendChild(trTag);

  tdTag1.textContent = `${myLibrary[i].title}`;
  tdTag2.textContent = `${myLibrary[i].author}`;
  tdTag3.textContent = `${myLibrary[i].pages}`;
  tdTag4.textContent = `${myLibrary[i].readOrNot}`;
  tdTag4.dataset.idtd = i;

  const eyeButtonTag = document.createElement('button');
  const eyeImgOpen = document.createElement('img');

  if (myLibrary[i].readOrNot === 'Read') {
    eyeImgOpen.src = 'icons/eye-outline.svg';
    eyeImgOpen.classList = 'open';
  } else {
    eyeImgOpen.src = 'icons/eye-off-outline.svg';
    eyeImgOpen.classList = 'close';
  }

  eyeButtonTag.appendChild(eyeImgOpen);
  eyeButtonTag.classList.add('readStatus');
  eyeButtonTag.dataset.index = i;
  tdtag5.appendChild(eyeButtonTag);

  //make remove button
  const removeBtn = document.createElement('button');
  const removeImg = document.createElement('img');
  removeImg.src = 'icons/close-thick.svg';

  removeBtn.appendChild(removeImg);
  removeBtn.classList.add('readStatus');
  removeBtn.classList.add('remove');
  removeBtn.dataset.index2 = i;
  tdtag5.appendChild(removeBtn);

  trTag.appendChild(tdTag1);
  trTag.appendChild(tdTag2);
  trTag.appendChild(tdTag3);
  trTag.appendChild(tdTag4);
  trTag.appendChild(tdtag5);
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const titleUser = document.querySelector('#title');
  const authorUser = document.querySelector('#author');
  const pagesUser = document.querySelector('#pages');
  const readUser = document.querySelector('#read');
  const notReadUser = document.querySelector('#notRead');

  if (
    titleUser.value != '' &&
    authorUser.value != '' &&
    pagesUser.value != '' &&
    (readUser.checked || notReadUser.checked)
  ) {
    if (readUser.checked) {
      addBookToLibrary(
        titleUser.value,
        authorUser.value,
        pagesUser.value,
        'Read'
      );
    } else {
      addBookToLibrary(
        titleUser.value,
        authorUser.value,
        pagesUser.value,
        "haven't read"
      );
    }

    titleUser.value = '';
    authorUser.value = '';
    pagesUser.value = '';

    displayBooks(myLibrary.length - 1);
  }

  changeReadStatus();
  removeBook();
});

function changeReadStatus() {
  const eyeButton = document.querySelector(
    `[data-index = "${myLibrary.length - 1}"]`
  );
  eyeButton.addEventListener('click', (e) => {
    const dataAtr = document.querySelector(
      `[data-idtd = "${eyeButton.dataset.index}"]`
    );
    if (dataAtr.textContent === 'Read') {
      dataAtr.textContent = "Haven't Read";
      eyeButton.firstChild.src = 'icons/eye-off-outline.svg';
    } else {
      dataAtr.textContent = 'Read';
      eyeButton.firstChild.src = 'icons/eye-outline.svg';
    }
  });
}

function removeBook() {
  const removeBtn = document.querySelector(
    `[data-index2 = "${myLibrary.length - 1}"]`
  );

  removeBtn.addEventListener('click', (e) => {
    const dataAtr = document.querySelector(
      `[data-id = "${removeBtn.dataset.index2}"]`
    );
    dataAtr.remove();
  });
}

const form = document.querySelector('#add-book');
const btnAdd = document.querySelector('#addNewBook');
btnAdd.addEventListener('click', (e) => {
  if (form.classList.value !== 'active') {
    form.classList.add('active');
    btnAdd.textContent = 'Go Back';
  } else {
    form.classList.remove('active');
    btnAdd.textContent = 'Add New Book';
  }
});
