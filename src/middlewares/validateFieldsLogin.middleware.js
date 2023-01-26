const validateFieldsLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) { 
    return res.status(200).json({ message: 'Some required fields are missing' }); 
}
  
  next();
};

module.exports = validateFieldsLogin;