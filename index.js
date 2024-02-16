const express = require("express");
const { LocalStorage } = require("node-localstorage");
const app = express();

app.use(express.json());

const localStorage = new LocalStorage("./start");

app.post("/", (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.username || !newUser.email) {
    res
      .status(400)
      .json({ error: "Invalid user data" });
    return;
  }

  let users = localStorage.getItem("users");
  users = users ? JSON.parse(users) : [];

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  res.json({ message: "User Registered Successfully" });
});

app.listen(2001, () => {
  console.log("Server running Successfully");
});