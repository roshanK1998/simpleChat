const express = require('express');
const router = express.Router();
const userController = require('../controller/login_controller');
const  chatController=require('../controller/chatController');
const requirementController = require('../controller/requirementController');
const bookingController = require('../controller/bookingController');
// const { clearChat } = require('../controllers/chatController');
const { clearChat } = require('../controller/chatController');

// Route to handle user signup
router.post('/signup', userController.signup);

// Route to handle user login
router.post('/login', userController.login);

//Routes for add info
router.post('/addinfo', requirementController.addinfo);

//Routes for ownerinfo
router.post('/owner', requirementController.owner);

//Routes to get all messages


//Routes for bookings
router.post('/bookings', bookingController.bookings )

//Routes for send message 
//router.post('/send', chatController.sendMessage)

//Routes for clear chat
router.delete('/clearchat', chatController.clearChat);

router.get('/getallmessages',chatController.getMessages)
// route for middlewear
const authenticateUser = require('../middleware');
router.post('/send', authenticateUser, chatController.sendMessage);

module.exports = router;
