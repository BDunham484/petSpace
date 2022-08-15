async function likeClickHandler() {
    // event.preventDefault();
    console.log('like button clicked');
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];

    const id = document.querySelector('textarea[id="hidden_id"]').value.trim();
    console.log(id);
    const response = await fetch('/api/posts/like', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        console.log('like response okay');
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.like-btn').addEventListener('click', likeClickHandler);