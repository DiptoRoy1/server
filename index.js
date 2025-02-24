const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.listen(port, () => { console.log(`Server is running at port ${port}`) });
const userList = [
    { id: 1, username: "Dipto", displayname: "Dipto" },
    { id: 2, username: "Mihir", displayname: "Mihir" },
    { id: 3, username: "Jibon", displayname: "Jibon" },
    { id: 4, username: "Mithun", displayname: "Mithun" },
    { id: 5, username: "Durjoy", displayname: "Durjoy" },
    { id: 6, username: "Choyon", displayname: "Choyon" },
    { id: 7, username: "Narayon", displayname: "Narayon" },
    { id: 8, username: "Antor", displayname: "Antor" },
    { id: 9, username: "Safa", displayname: "Safa" }
]

// http mathods with exmple

// GET method >>>>>>>>>>>>>>>>>>>>>>>>>

app.get('/', (request, response) => {
    // response.send(`Server is running at prot ${port}`);
    const fileDir = __dirname + "/index.html";
    response.sendFile(fileDir);
})

// Request query - GET method
app.get("/api/user", (req, res) => {
    const { filter, value } = req.query;
    if (!filter && !value) { return res.send(userList); }
    if (filter && value) {
        const filteredList = userList.filter(user =>
            user[filter.toLocaleLowerCase()].toString().toLowerCase().includes(value.toLowerCase())
        )
        if (filteredList.length === 0) { return res.send("No user with the filter value") }
        return res.send(filteredList);
    }
    return res.send(userList);
});

// Request params - Get methods
app.get("/api/user/:id", (req, res) => {
    const reqUserId = parseInt(req.params.id);
    if (isNaN(reqUserId)) { return res.status(201).send("Not a valid user ID") }
    const reqUser = userList.find((user) => user.id === reqUserId)
    if (reqUser) { return res.send(reqUser) }
    res.send("No use with this ID");
});

// Post request >>>>>>>>>>>>>>>>>>>>>>>>
app.post("/api/user", (req, res) => {
    const { body } = req;
    const newUser = { id: userList[userList.length - 1].id + 1, ...body }
    userList.push(newUser);
    res.send(userList);
});

// Put request >>>>>>>>>>>>>>>>>>>>>>>>
app.put("/api/user/:id", (req, res) => {
    const { body, params: { id } } = req;
    const reqID = parseInt(id);
    if (isNaN(reqID)) { return res.status(404).send("Not a valid ID") }
    const reqIdIndex = userList.findIndex((user) => user.id === reqID)
    if (reqIdIndex === -1) { return res.status(404).send("No user with this ID") }
    userList[reqIdIndex] = { id: reqID, ...body };
    return res.send(userList);
})

// PATCH request >>>>>>>>>>>>>>>>>>>>>
app.patch("/api/user/:id", (req, res) => {
    const { body, params: { id } } = req;
    const reqID = parseInt(id);
    if (isNaN(reqID)) { return res.status(404).send("Not a valid ID") }
    const reqIdIndex = userList.findIndex((user) => user.id === reqID)
    if (reqIdIndex === -1) { return res.status(404).send("No user with this ID") }
    userList[reqIdIndex] = { ...userList[reqIdIndex], ...body };
    return res.send(userList);
})

// DELET request >>>>>>>>>>>>>>>>>>>>>
app.delete("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const reqID = parseInt(id);
    if (isNaN(reqID)) { return res.status(404).send("Not a valid ID") }
    const reqIdIndex = userList.findIndex((user) => user.id === reqID)
    if (reqIdIndex === -1) { return res.status(404).send("No user with this ID") }
    return res.status(201).send(userList.splice(reqIdIndex, 1));
})
