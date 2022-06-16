async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      //console.log("delete js");
    const response = await fetch(`/api/myblogs/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          blog_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("ok");

      if (response.ok) {
        document.location.replace('/myblogs');
      } else {
        alert(response.statusText);
      }

      console.log("end");
    
  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);