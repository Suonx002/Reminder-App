// Define Vars
const form = document.querySelector('#reminder-form');
const reminderInput = document.querySelector('#reminder-input');
const addBtn = document.querySelector('.add-reminder');
const filter = document.querySelector('.filter');
const reminderList = document.querySelector('.reminder-collection');
const clearBtn = document.querySelector('.clear-reminder');

// load event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event for getting reminder list
  document.addEventListener('DOMContentLoaded', getReminder);
  // add reminder
  form.addEventListener('submit', addReminder);
  // remove reminder
  reminderList.addEventListener('click', removeReminder);
  //filter reminder
  filter.addEventListener('keyup', filterReminder);
  // clear reminder
  clearBtn.addEventListener('click', clearReminder);
}

function addReminder(e) {
  e.preventDefault();

  if (reminderInput.value === '') {
    alert('Please fill out the reminder!');
  } else {
    // create li element
    const li = document.createElement('li');
    li.className = 'reminder-item';
    li.appendChild(document.createTextNode(reminderInput.value));
    // create link
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';
    li.appendChild(link);
    reminderList.appendChild(li);

    storeInLocalStorage(reminderInput.value);
    // Clear Input
    reminderInput.value = '';
  }
}
// Remove a list
function removeReminder(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeReminderFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// filter a list
function filterReminder(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);
  const lis = document.querySelectorAll('.reminder-item');
  lis.forEach(list => {
    const item = list.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      list.style.display = 'flex';
    } else {
      list.style.display = 'none';
    }
  });
}

// Clear reminder
function clearReminder() {
  while (reminderList.firstChild) {
    reminderList.removeChild(reminderList.firstChild);
  }
}

// Local Storage
function storeInLocalStorage(list) {
  let lists;
  if (localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }
  lists.push(list);
  localStorage.setItem('lists', JSON.stringify(lists));
}

function getReminder() {
  let lists;
  if (localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.forEach(list => {
    // create li element
    const li = document.createElement('li');
    li.className = 'reminder-item';
    li.appendChild(document.createTextNode(list));
    // create link
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fas fa-minus-circle"></i>';
    li.appendChild(link);
    reminderList.appendChild(li);
  });
}

function removeReminderFromLocalStorage(list) {
  let lists;
  if (localStorage.getItem('lists') === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem('lists'));
  }

  lists.forEach((item, index) => {
    if (list.textContent === item) {
      lists.splice(index, 1);
    }
  });

  localStorage.setItem('lists', JSON.stringify(lists));
}
