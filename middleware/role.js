function allowRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Sin rol asignado" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado por rol" });
        }

        next();
    };
}

module.exports = allowRoles;
