import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error) => {
      if (error) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.' 
        });
      } else {
        next();
      }
    })
  } else {
    res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
}
