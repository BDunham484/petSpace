//function to handle action when the add comment button is clicked
async function commentFormHandler(event) {
    event.preventDefault();
    //assigns user-input text from textarea to a variable
    const comment_text = document.querySelector('textarea[id="comment-body"]').value.trim();
    //grabs post id from url
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    //if there is user-input run fetch request
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
//add event listener to add comment button
document.querySelector('.comment-btn').addEventListener('click', commentFormHandler);