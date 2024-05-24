const register = async (req, res) => {
  try {
    console.log(req.body);
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

module.exports = { register, login };
