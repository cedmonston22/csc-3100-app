import express from "express";
import cors from "cors"

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

const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] == name);
};


const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};


const addUser = (user) => {
  user.id = generateId();
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
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

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter((user) => user["name"] === name && user["job"] === job);
};

app.get("/users", (req,res) => {
    const name = req.query.name;
    const job = req.query.job;

    let result;

    if (name !== undefined && job !== undefined) {
        result = findUserByNameAndJob(name, job);
    } else if (name !== undefined) {
        result = findUserByName(name);
    } else {
        result = users["users_list"];
    }

    res.send({ users_list: result });
});