const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/loginRoutes'); 
const cors=require("cors")
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({

origin: '*',
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization']



}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes); // Use the user routes for API

// Serve the main page or other static files if needed
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'view', 'signup.html'));
    res.sendFile(path.join(__dirname, 'view', 'chatLOOOO.html')); // Adjust path as necessary
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
