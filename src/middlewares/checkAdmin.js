const checkAdmin = (req, res, next) => {

    const { user } = req;
    const role = user?.role;
    if(role === "ADMIN") {
        next();
    } else {
        res.status(401).json({
            status: 401,
            message: "Unauthorized access."
        })
    }
};

module.exports = { checkAdmin }