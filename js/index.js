// DOM elements
const ticketList = document.querySelector('.ticket');
// declare if login/logout
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

//take user as parameter
const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
    });
    
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';

    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup tickets
const setupTickets = (data) => {

  if (data.length) {
    let html = '';
    //forEach is to iterate
    data.forEach(doc => {
      const ticket = doc.data();
      // console.log(ticket);
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${ticket.title} </div>
          <div class="collapsible-body white"> ${ticket.description} </div>
        </li>
      `;
      html += li;
    });
    ticketList.innerHTML = html
  } else {
    ticketList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
};


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
//   M is for materialize
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});