//function to handle action whent the like cutton is clicked
async function likeClickHandler(element) {

    console.log('like button clicked');
    //assigne id sent by data-set to variable
    const id = element.dataset.id;

    //sends put request to like a post via fetch request
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
        // alert(response.statusText);
        alert("You've already like this post.")
    }
}
//adds event listener to 'like button'
document.querySelector('.like-btn').addEventListener('click', likeClickHandler);