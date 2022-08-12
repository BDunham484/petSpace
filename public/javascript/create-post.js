async function createPostHandler(event) {
    event.preventDefault();

    console.log('new post button clicked')

    const post_image = document.querySelector('#post-image').value.trim();
    const post_text = document.querySelector('#post-text').value.trim();
    const pet_name = document.querySelector('#pet-name').value.trim();
    const pet_type = document.querySelector('#pet-type').value.trim();

    if (post_image && post_text) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                // user_id,
                post_image,
                post_text,
                pet_name,
                pet_type,
                // created_at
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("post received")
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('#create-post').addEventListener('click', createPostHandler);