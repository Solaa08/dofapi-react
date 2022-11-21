const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const { json } = require('express')

app.use(express.json())
app.use(cors())

let response = null;

const callDofapiMounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://fr.dofus.dofapi.fr/mounts",
      );
    } catch (ex) {
      response = null;
      reject(ex);
    }
    if (response) {
      const json = response.data;
      resolve(json);
    }
  });
}

const callDofapiMountsById = async (id) => {
  try {
    const newResponse = await axios.get(
      `https://fr.dofus.dofapi.fr/mounts/${id}`,
    );
    const data = await newResponse.data;
    return data;
  } catch (err) {
    console.log(err)
    throw err
  }
}

app.use(express.static("build"));

app.get("/api/get", (req, res) => {
  callDofapiMounts().then((json) => {
    res.send(json)
  })
});

app.get("/api/get/:id", (req, res) => {
    const id = req.params.id
    callDofapiMountsById(id).then((json) => {
      res.send(json)
    }).catch((err) => {
      res.status(400).send({message:"err"})
    })
  })

app.listen(3001, () => {
    console.log("hello")
})