import express from "express";
import cors from "cors"
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "McDonalds Founder",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .findUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => {
      console.log(error);
      if (error.name === "ValidationError") {
        res.status(400).send(error.message);
      } else {
        res.status(500).send();
      }
    });
});

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] == id);

    if (index === -1) {
        return undefined
    }

    return users["users_list"].splice(index,1)[0];
};

app.delete("/users/:id", (req,res) => {
    
    const id = req.params["id"];
    const result = deleteUserById(id);

    if (result === undefined){
        res.status(404).send("Resource not found.");
    }else{
        res.status(204).send()
    }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService
    .getUsers(name, job)
    .then((result) => res.send({ users_list: result }))
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});
