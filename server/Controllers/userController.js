const register = (req, res) => {
  try {
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

module.exports = register;
