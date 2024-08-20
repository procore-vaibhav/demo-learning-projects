// Function to render the list out of table array
function renderList(tableData) {
  const listElement = document.getElementById('item-list');
  listElement.innerHTML = '';

  tableData.forEach((row, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}.   ${row.name}`;
    listElement.appendChild(listItem);
  });
}

export default renderList;
