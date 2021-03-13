const axios = require("axios");

const loginRouter = require("express").Router();
const FormData = require("form-data");

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const user = (await axios.post(
      "http://dev.rapptrlabs.com/Tests/scripts/user-login.php",
      formData,
      { headers: formData.getHeaders() }
    )).data;
    if (user) {
      res.status(200).send({
        status: true,
      });
    } else {
      res.status(200).send({
        status: false,
      });
    }
  } catch (e) {
    res.status(500).send({
        status:false
    });
  }
});

module.exports = {
  url: "login",
  router: loginRouter,
};
