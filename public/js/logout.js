

const logout = async () => {
    // Make a POST request to destroy the session on the back end
    //alert("logout page called");
   
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/');
    } else {
      document.location.replace('/');
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  