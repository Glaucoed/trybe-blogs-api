const login = (req, res) => {
 const { email, password } = req.body;

 return res.status(200).json({ email, password });
};

module.exports = {
  login,
};