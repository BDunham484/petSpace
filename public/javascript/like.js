async function likeClickHandler(element) {

    console.log('like button clicked');

    const id = element.dataset.id;
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