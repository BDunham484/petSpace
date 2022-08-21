//function to redirect to login if not logged in
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};
//export function
module.exports = withAuth;