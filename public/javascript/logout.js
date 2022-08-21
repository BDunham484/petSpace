//function to handle action when the logout button is clicked
async function logout() {
    //runs fetch request to logout user
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        // alert(response.statusText);
        document.location.replace('/login');
    }
}
//adds event listener to logout button
document.querySelector('#logout').addEventListener('click', logout);