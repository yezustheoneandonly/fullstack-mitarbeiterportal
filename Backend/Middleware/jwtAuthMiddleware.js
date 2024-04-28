import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) => {
   const token = req.cookies._authToken || req.headers.authorization?.split(' ')[1];
   if (!token) {
      const error = new Error();
      error.detail = 'Token not found';
      error.status = 401;
      return next(error);
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user information to the request object
      next();
   } catch {
      const error = new Error();
      error.detail = 'Invalid token';
      error.status = 401;
      return next(error);
   }
};

export default jwtAuthMiddleware;
