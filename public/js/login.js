


const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
   // alert(email);
    const password = document.querySelector('#password-login').value.trim();
    //alert(password);
  
    if (email && password) {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
       
       // window.location.assign('/api/calevent');
        window.location.assign('/');
   
      } else {
        alert('Failed to log in');
      }
    }
  };



document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);