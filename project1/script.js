/* eslint-disable no-unused-vars */
let tableData = [];

//-------------------------------------- Table related functionalities---------------------------

function initializeTable() {
  const storedData = sessionStorage.getItem('tableData');
  if (storedData) {
    tableData = JSON.parse(storedData);
    renderTable();
    renderList();
  }
}

function renderTable() {
  const tableBody = document
    .getElementById('data-table')
    .getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  tableData.forEach((row, index) => {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).innerHTML = index + 1;
    newRow.insertCell(1).innerHTML = row.name;
    newRow.insertCell(2).innerHTML =
      '<div><button onclick="editRow(this)">Update</button><button onclick="deleteRow(this)">Delete</button></div>';
  });
}

function saveToSessionStorage() {
  sessionStorage.setItem('tableData', JSON.stringify(tableData));
}

function insertModal() {
  let size = tableData.length;
  document.getElementById('insertModal-edit-id').value = size + 1;
  document.getElementById('insertModal-edit-name').value = 'new item';
  document.getElementById('insertModal').style.display = 'block';
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
  renderList();
  closeInsertModal();
}

function deleteRow(btn) {
  const row = btn.closest('tr');
  const rowIndex = Array.from(row.parentNode.children).indexOf(row);
  tableData.splice(rowIndex, 1);
  saveToSessionStorage();
  renderTable();
  renderList();
}

function editRow(btn) {
  const row = btn.closest('tr');
  const rowIndex = Array.from(row.parentNode.children).indexOf(row);
  const data = tableData[rowIndex];
  document.getElementById('edit-id').value = rowIndex + 1;
  document.getElementById('edit-name').value = data.name;
  document.getElementById('modal').style.display = 'block';
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
  renderList();
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

// ------------------------------------------------ List related functionalities------------------

// Function to render the list out of table array
function renderList() {
  const listElement = document.getElementById('item-list');
  listElement.innerHTML = '';

  tableData.forEach((row, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}.   ${row.name}`;
    listElement.appendChild(listItem);
  });
}

initializeTable();
