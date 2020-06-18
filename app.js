// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
  
  // UI Constructor
  function UI() {}
  
  // Add Book To List
  UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }
//   show alert
UI.prototype.showAlert = function(message, className){

    // create div
    const div = document.createElement('div');

    // add classname

    div.className = `alert ${className}`
    //  because i want it to have a class of alert and the name passed in the function

    div.appendChild(document.createTextNode(message));
    //  get parent

    const container = document.querySelector('.container');
    // get form
    const form =document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3 seconds

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000 );
}
//  delete book
  UI.prototype.deleteBook =function(target) {
      if(target.className === 'delete') {
          target.parentElement.parentElement.remove();
      }
  }
  // Clear Fields
  UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
  
  // Event Listeners
  document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    // Instantiate book
    const book = new Book(title, author, isbn);
  
    // Instantiate UI
    const ui = new UI();
    // validate

    if(title === '' || author === '' || isbn === '') {
         ui.showAlert('please fill in all fields', 'error')
    }else {
   
    // Add book to list
    ui.addBookToList(book);
//    show success
    ui.showAlert('Book Added', 'success');
    // Clear fields
    ui.clearFields();
    }
    e.preventDefault();
  });
//   event listner for delete
document.getElementById('book-list').addEventListener('click ',
 function(e){

// instantiate UI

const ui = new UI();

ui.deleteBook(e.target);

// show message

ui.showAlert('Book removed', 'success');
e.preventDefault();
});