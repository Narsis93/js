"use strict"
let $ = document;

const showButton = $.querySelector('.show');
const button = $.querySelector('.Button');
const modalParent = $.querySelector('.modal-parent');
const closeButton = $.querySelector('.X');
const sectionElem = $.querySelector('section');
const userNameInput = $.querySelector('.username');
const passwordInput = $.querySelector('.password');
const feedbackModal = $.querySelector('.feedback-modal');
const mainNav = $.getElementById('mainNav');
const logoImg = $.querySelector('img');

// Function to show the modal
function showModal() {
    modalParent.style.display = 'block';
    
}

// Function to hide the modal
function hideModal() {
    modalParent.style.display = 'none';
   
}

// Function to hide the modal with the close button
function hideModalWithX() {
    hideModal();
}

// Function to hide modal with the escape key
function hideModalWithEsc(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
}

// showButton.addEventListener('click' , showModal );
//  closeButton.addEventListener('click', hideModal);
$.body.addEventListener('keyup', hideModalWithEsc);

// Function to validate data
function dataValidation() {
    let userNameValue = userNameInput.value;
    let passwordValue = passwordInput.value;

    if (userNameValue.length < 8 || passwordValue.length < 8) {
        feedbackModal.style.background = 'rgb(223, 28, 28)';
        feedbackModal.innerHTML = 'PLZ INPUT YOUR INFO CORRECTLY';
    } else {
        userNameInput.value = '';
        passwordInput.value = '';
        feedbackModal.style.background = 'green';
        feedbackModal.innerHTML = 'LOGIN SUCCESS';
    }

    feedbackModal.style.display = 'inline';

    setTimeout(function () {
        feedbackModal.style.display = 'none';
    }, 3000);
}

// Add event listeners

//   button.addEventListener('click', dataValidation);

// Scroll event listener
$.addEventListener('scroll', function () {
    if ($.documentElement.scrollTop > 0) {
        
        mainNav.classList.add('bg-black', 'txt-white');
    } else {
             mainNav.classList.remove('bg-black', 'txt-white');
    }
});

const addNameButton = $.querySelector('.add-btn');
const nameInputElem = $.querySelector('#title');
const numberInputElem = $.querySelector('#author');
const yearInputElem = $.querySelector('#year');
const namesContainer = $.querySelector('#book-list');

let names = [];

addNameButton.addEventListener('click', function (event) {
    event.preventDefault();

    let nameInputValue = nameInputElem.value;
    let numberInputValue = numberInputElem.value;
    let yearInputValue = yearInputElem.value;

    if (nameInputValue === '' || numberInputValue === '' || yearInputValue === '') {
        alert('PLZ FILL ALL THE FIELDS');
    } else {
        let newNameObject = {
            id: names.length + 1,
            name: nameInputValue,
            number: numberInputValue,
            year: yearInputValue
        };

        names.push(newNameObject);
        setIntoLocalStorage(names);
    }
    console.log('true');
});

console.log('yes');
function setIntoLocalStorage(allNamesArray) {
    localStorage.setItem('names', JSON.stringify(allNamesArray))
    makeEmptyInputs()
    namesGenerator(allNamesArray)
}

function makeEmptyInputs() {
    nameInputElem.value = '';
    numberInputElem.value = '';
    yearInputElem.value = '';
}
console.log('no');
function namesGenerator(allNamesArray) {
    namesContainer.innerHTML = '';

    allNamesArray.forEach(function (name) {
       const newBookTrElem = document.createElement('tr')

        let newBookTitleTh = document.createElement('th')
        newBookTitleTh.innerHTML = name.name

        let newBookAuthorTh = document.createElement('th')
        newBookAuthorTh.innerHTML = name.number

        let newBookYearTh = document.createElement('th')
        newBookYearTh.innerHTML = name.year

        newBookTrElem.append(newBookTitleTh, newBookAuthorTh, newBookYearTh)

        namesContainer.append(newBookTrElem)

    })

}
    console.log('vay');


function getNamesFromLocalStorage() {
    let localStorageNames = localStorage.getItem('names');

    if (localStorageNames) {
        names = JSON.parse(localStorageNames);
        namesGenerator(names);
    }
}



window.addEventListener('load', getNamesFromLocalStorage);
