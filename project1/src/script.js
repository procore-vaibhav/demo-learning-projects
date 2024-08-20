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
    button.addEventListener('click', () => editRow(index));
  });

  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => deleteRow(index));
  });
}

function saveToSessionStorage() {
  sessionStorage.setItem('tableData', JSON.stringify(tableData));
}

export function insertModal() {
  let size = tableData.length;
  document.getElementById('insertModal-edit-id').value = size + 1;
  const nameInput = document.getElementById('insertModal-edit-name');
  nameInput.value = 'new item';
  document.getElementById('insertModal').style.display = 'block';

  nameInput.select();
}

function closeInsertModal() {
  document.getElementById('insertModal').style.display = 'none';
}

function insert() {
  const newItem = {
    id: document.getElementById('insertModal-edit-id').value,
    name: document.getElementById('insertModal-edit-name').value,
  };
  tableData.push(newItem);
  saveToSessionStorage();
  renderTable();
  renderList(tableData);
  closeInsertModal();
}

function deleteRow(index) {
  tableData.splice(index, 1);
  saveToSessionStorage();
  renderTable();
  renderList(tableData);
}

function editRow(index) {
  const data = tableData[index];
  document.getElementById('edit-id').value = index + 1;
  const nameInput = document.getElementById('edit-name');
  nameInput.value = data.name;
  document.getElementById('modal').style.display = 'block';

  nameInput.select();
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function saveChanges() {
  const rowIndex = document.getElementById('edit-id').value - 1;
  const name = document.getElementById('edit-name').value;
  tableData[rowIndex].name = name;
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
  document.getElementById('tab1-button').addEventListener('click', function () {
    openTab('tab1');
  });
  document.getElementById('tab2-button').addEventListener('click', function () {
    openTab('tab2');
  });
  document.getElementById('tab3-button').addEventListener('click', function () {
    openTab('tab3');
  });

  // Attach event listeners for the insert modal controls
  document.getElementById('insertModalButton').addEventListener('click', insertModal);
  document.getElementById('saveInsertButton').addEventListener('click', insert);
  document.getElementById('closeInsertModalButton').addEventListener('click', closeInsertModal);

  // Attach event listeners for the edit modal controls
  document.getElementById('saveChangesButton').addEventListener('click', saveChanges);
  document.getElementById('closeModalButton').addEventListener('click', closeModal);
});
