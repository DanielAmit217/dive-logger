const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    next();
};

module.exports = passUserToView


// res = {
//     send: xxx,
//     render: xxx,
//     locals: {
//         dive: { name: asdf, depth},
//         user: {
//             _id: xxx,
//             username: xxx
//         }
//     }
// }