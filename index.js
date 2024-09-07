const express = require ('express');
const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');


const app = express();
app.use(express.json())

// mongoose.connect('mongodb+srv://user1:admin@cluster.g2ob4.mongodb.net/crud');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
// });

// const userModel = mongoose.model("new", userSchema);

// const new1 = new userModel ({
//     name: "Rahul",
//     email: "rahul@gmail.com",
// });

// new1.save();

users =[
    {
        "name": "John",
        "email": "john@example.com",
        "password": "password123",
    },
]

app.get('/users', (req,res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password:hashPass}
            users.push(newUser)
        res.status(201).json(newUser)
        
    } catch (error) {
        res.status(500).json(newUser)
    }
})

app.post('/users/login', async (req,res) => {
    const user = users.find(user => user.name = req.body.name)
    if(user == null) {
        return res.status(400).json('can not find user')
    }
    try{
   if (await bcrypt.compare(req.body.password, user.password)){
    res.json('success')
   }else {
    res.json('Failed')
   }
    } catch {
        res.status(500).json()
    }
})


app.listen(1200, (req,res) => {
    console.log('Server is running on port 1200');
})