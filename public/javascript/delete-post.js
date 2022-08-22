//function that runs when delete button is clicked in edit-post.handlevars
//it deletes a specific post based on it's unique id via post-routes.js
async function deleteFormHandler(event) {
    event.preventDefault();
    //grabs post id from url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    //runs fetch request to delete post at id
    const response = await fetch(`/api/posts/${id}`, {

        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}
//adds event listener to 'delte post button'
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);