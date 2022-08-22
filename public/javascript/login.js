//function to handle action when the add comment button is clicked
async function loginFormHandler(event) {
    event.preventDefault();
    //captures and assign user input to variables
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //if user-input criteria is met run fetch request to log user in via fetch request
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}
//adds event listener to login button
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);