//function to handle action when signup button is clicked
async function signupFormHandler(event) {
    event.preventDefault();
    //grabs and assigns user-input to variables
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //if user-input criteria is met runs fetch request to create new user
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.ok) {
            document.location.replace('/');
        } else {
            // alert(response.statusText);
            document.location.replace('/login');
            alert('Already an account with this email address')
        }
    }
}
//adds event listener to signup button
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);