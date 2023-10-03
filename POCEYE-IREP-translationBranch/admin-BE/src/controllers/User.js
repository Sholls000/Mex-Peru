import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const usersList = await User.findAll({
      attributes: ["id", "email", "activated", "region", "type"],
    });
    if (usersList) {
      res.status(200).send(usersList);
    } else if (!usersList) {
      res.status(500).send("issues with the backend");
    }
  } catch (err) {
    console.log("error loading users: ", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//update by e-mail address or Poc-ID
export const updateByEmail = async (req, res) => {
  console.log("body", req.body)
  const resetObject = {
    activated: req.body.activated,
  };
  try {
    const pocId = req.body.id;
    User.update(resetObject, { where: { id: pocId } }).then(() => {
      res.status(201).send({ status: "success", message: "reset successful", });
    });

  } catch (err) {
    console.log("reset unsuccessful: ", err);
    res.status(400).send({
      message:
        err.message || "Some error occurred while reseting user credentials.",
    });
  }
};
