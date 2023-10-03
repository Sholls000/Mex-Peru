import Poc from "../models/pocs.js"

export const getAllPocs = async (req, res) => {
  try {
    // const usersList = await User.findAndCountAll({order: [['id', 'DESC']]});
    const pocList = await Poc.findAll({
      attributes: [
        "id",
        "email",
        "region",
        "pocId",
        "district",
        "longitude",
        "latitude",
        "outlet",
      ],
    });
    if (pocList) {
      res.status(200).send(pocList);
    } else if (!pocList) {
      res.status(500).send("issues with the backend");
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};
//update by e-mail address
export const changeCoordinates = async (req, res) => {
  const updateObject = {
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  };
  try {
    Poc.update(updateObject, {
      where: {
        pocId: req.body.pocId,
      },
    }).then(() => {
      res.status(201).send({ status: "success", message: "update successful" });
    });
  } catch (err) {
    res.status(400).send({
      message: err.message || "Incorrect Poc Id.",
    });
  }
};

export const findPoc = async (req, res) => {
  //   const pocId = req.params;
  try {
    const retrievedPoc = await Poc.findOne({
      where: {
        pocId: (req.params.id),
    },
  })
  // .then((data) => {
  //   res.status(201).send({ status: "success", message: "search successful",  result: data });
  // });
    if (retrievedPoc){
        res.status(201).send({
          status: "success",
          message: "search successful",
          result: retrievedPoc,
        });
      }else if (!retrievedPoc){
          res.send("Incorrect Poc Id")
        }
    
  } catch (err) {
    res.status(500).send({
      message: err.message || "Internal Server error.",
    });
  }
};

