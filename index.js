const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
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

app.get('/', (request, response) => {
    // response.send(`Server is running at prot ${port}`);
    const fileDir = __dirname + "/index.html";
    response.sendFile(fileDir);
})

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
app.get("/api/user/:id", (req, res) => {
    const reqUserId = parseInt(req.params.id);
    if (isNaN(reqUserId)) { return res.status(201).send("Not a valid user ID") }
    const reqUser = userList.find((user) => user.id === reqUserId)
    if (reqUser) { return res.send(reqUser) }
    res.send("No use with this ID");
});