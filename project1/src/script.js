//  /* eslint-disable no-unused-vars */

import renderList from './list-script.js';
let tableData = [];

//-------------------------------------- Table related functionalities---------------------------

function initializeTable() {
  const storedData = sessionStorage.getItem('tableData');
  if (storedData) {
    tableData = JSON.parse(storedData);
    renderTable();
    renderList(tableData);
  }
}

function renderTable() {
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  tableData.forEach((row, index) => {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerHTML = index + 1;
    newRow.insertCell(1).innerHTML = row.name;
    newRow.insertCell(2).innerHTML =
      '<div><button class="update-btn">Update</button><button class="delete-btn">Delete</button></div>';
  });

  // Attach event listeners for update and delete buttons
  const updateButtons = document.querySelectorAll('.update-btn');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  updateButtons.forEach((button, index) => {
    button.addEventListener('click', () => openModal('edit', index));
  });

  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => deleteRow(index));
  });
}

function saveToSessionStorage() {
  sessionStorage.setItem('tableData', JSON.stringify(tableData));
}

function deleteRow(index) {
  tableData.splice(index, 1);
  saveToSessionStorage();
  renderTable();
  renderList(tableData);
}

// Function to open the modal
function openModal(action, index = null) {
  const nameInput = document.getElementById('edit-name');
  const submitBtn = document.getElementById('submit-btn');

  document.getElementById('modal-action').value = action;
  if (action === 'edit') {
    document.getElementById('edit-id').value = index + 1;
    nameInput.value = tableData[index].name;
    submitBtn.textContent = 'Save Changes';
  } else if (action === 'insert') {
    document.getElementById('edit-id').value = tableData.length + 1;
    nameInput.value = 'new Item';
    submitBtn.textContent = 'Insert Row';
  }

  setTimeout(() => {
    nameInput.select();
  }, 0);
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Function to save changes or insert a new row
function saveChanges() {
  const action = document.getElementById('modal-action').value;
  const name = document.getElementById('edit-name').value;

  if (action === 'edit') {
    const rowIndex = document.getElementById('edit-id').value - 1;
    tableData[rowIndex].name = name;
  } else if (action === 'insert') {
    tableData.push({ name });
  }

  saveToSessionStorage();
  renderTable();
  renderList(tableData);
  closeModal();
}

function openTab(tabName) {
  let tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove('active');
  }
  tablinks = document.getElementsByClassName('tab-link');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Initialize the table and attach event listeners for modal controls after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeTable();

  // Attach event listners for the openTab buttons
  document.getElementById('tab1-button').addEventListener('click', () => openTab('tab1'));
  document.getElementById('tab2-button').addEventListener('click', () => openTab('tab2'));
  document.getElementById('tab3-button').addEventListener('click', () => openTab('tab3'));

  // Add event listener for modal close button
  document.querySelector('.close').addEventListener('click', closeModal);

  // Add event listener for form submission
  document.getElementById('submit-btn').addEventListener('click', saveChanges);

  // Add event listener for the insert button
  document.getElementById('insert-btn').addEventListener('click', () => openModal('insert'));
});
