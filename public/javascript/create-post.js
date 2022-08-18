async function createPostHandler(event) {
    event.preventDefault();
    console.log('new post button clicked')

    const post_image = document.getElementById('post-image');
    const post_text = document.querySelector('#post-text').value.trim();
    const pet_name = document.querySelector('#pet-name').value.trim();
    const pet_type = document.querySelector('#pet-type').value.trim();

    const formData = new FormData();
    formData.append('post_image', post_image.files[0]);

    if (post_image && pet_name && pet_type) {
        await fetch('/api/posts/newPost', {
            method: 'post',
            body: formData,
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                let id = data.id;
                return fetch(`/api/posts/newPost/${id}`, {
                    method: 'put',
                    body: JSON.stringify({
                        post_text,
                        pet_name,
                        pet_type
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
            })
            .then(res => {
                console.log(res)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    };
}


document.querySelector('#create-post').addEventListener('submit', createPostHandler);