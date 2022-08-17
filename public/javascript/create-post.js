async function createPostHandler(event) {
    event.preventDefault();

    console.log('new post button clicked')

    const post_image = document.getElementById('post-image');
    const post_text = document.querySelector('#post-text').value.trim();
    const pet_name = document.querySelector('#pet-name').value.trim();
    const pet_type = document.querySelector('#pet-type').value.trim();

    const id = (Math.random());
    // console.log('iiiiiiiiiiiiiiiiiiiiidddddddddddddddd' + id);

    const formData = new FormData();
    formData.append('post_image', post_image.files[0]);

    // if (post_image && pet_name && pet_type) {

    //     const response = await fetch('/api/posts', {
    //         method: 'post',
    //         body: formData,
    //     });

    //     if (response.ok) {
    //         console.log("image received")
    //         window.location.reload();
    //     } else {
    //         alert(response.statusText);
    //     }
    // }

    const config1 = {
        method: 'post',
        body: formData
    }

    const config2 = {
        method: 'put',
        body: JSON.stringify({
            post_text,
            pet_name,
            pet_type
        }),
        headers: { 'Content-Type': 'application/json' }
    }

    const requests = [fetch(`/api/posts/newPost/${id}`, config1), fetch(`/api/posts/newPost/${id}`, config2)];

    // const [response1, response2] = await Promise.all(requests)
    const response = await Promise.all(requests)
    .then(results => {
        console.log(results);
    })




    if (response.ok) {
        console.log('holy shit!');
        window.location.reload();
    } else {
        alert(response.statusText);
    }







    // const incoming = await fetch('/api/posts', {
    //     method: 'post',
    //     body: JSON.stringify({
    //         post_text,
    //         pet_name,
    //         pet_type
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    // if (incoming.ok) {
    //     console.log("post received")
    //     // window.location.reload();
    // } else {
    //     alert(incoming.statusText);
    // }

}


document.querySelector('#create-post').addEventListener('submit', createPostHandler);