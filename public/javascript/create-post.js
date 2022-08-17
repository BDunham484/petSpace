async function createPostHandler(event) {
    event.preventDefault();

    console.log('new post button clicked')

    // const post_image = document.querySelector('input[type="file"]').value.trim();
    const post_image = document.getElementById('post-image');
    // const post_text = document.querySelector('#post-text').value.trim();
    // const pet_name = document.querySelector('#pet-name').value.trim();
    // const pet_type = document.querySelector('#pet-type').value.trim();

    const formData = new FormData();
    
    // console.log(post_image.files[0]);

    // formData.append('post_image', post_image.files[0]);
    // console.log(formData);

    let test = post_image.files[0];
    console.log(test)
    // if (post_image && pet_name && pet_type) {
    if (post_image) {
        const response = await fetch('/api/posts', {
            method: 'post',
            // body: JSON.stringify({
            //     test,
            //     // formData,
            //     // post_text,
            //     // pet_name,
            //     // pet_type,
            // }),
            body: test,
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.ok) {
            console.log("post received")
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('#create-post').addEventListener('submit', createPostHandler);