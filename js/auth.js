// listen for auth status changes
auth.onAuthStateChanged(user => {
  // console.log(user);
    if (user) {
      // console.log('user logged in: ', user);
      // get data of tickets, onSnapshor is to real time update the data 
      db.collection('ticket').onSnapshot(snapshot => {
        // console.log(snapshot.docs);
        setupTickets(snapshot.docs);
        setupUI(user);
      }, err => {
        console.log(err.message);
      });
    } else {
      setupUI();
      setupTickets([]);
      // console.log('user logged out');
    }
});

// create new ticket
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('ticket').add({
    // title: createForm['title'].value,
    title: createForm.title.value,
    description: createForm.description.value,
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    // prevent from refresh so didnt lost the data
    e.preventDefault();

    //   get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console.log(email, password);

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        return db.collection('users').doc(cred.user.uid).set({
          bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
//   auth.signOut().then(() => {
//     console.log('user signed out');
//   })
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
