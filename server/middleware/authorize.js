const authorize = (roles = []) => {
  // roles can be a single role string or an array of roles
  return (req, res, next) => {
    // If roles is a string, convert it to an array
    if (typeof roles === "string") {
      roles = [roles];
    }

    // Check if the user is authenticated and has the required role
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message:
            "Access denied. You are not authorized to access the requested resources.",
        });
    }

    next(); // User has the required role, continue to the next middleware
  };
};

module.exports = authorize;
