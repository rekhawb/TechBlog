async function editFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="post-title"]').value;
    const description = document.querySelector('input[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/updateblog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        window.location.assign('/myblogs');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);