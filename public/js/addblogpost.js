async function newFormHandler(event) {
  
    event.preventDefault();


    const name = document.querySelector('input[name="post-title"]').value;
    //alert(name);
    
    const description= document.querySelector('.post-content').value;
    //alert(description);
  

    const response = await fetch(`/api/addblogpost`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });


    if (response.ok) {
        console.log('success');
      window.location.assign('/myblogs');


      

    } else {
      alert(response.statusText);
    }
  }

  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

