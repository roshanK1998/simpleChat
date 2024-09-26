const chatModel = require('../model/chatModel');

// Send a message
const sendMessage = async (req, res) => {
    const { chat } = req.body;
    const name = req.userId; // Get the userId from the middleware
   
    if (!name || !chat) {
        return res.status(400).json({ message: 'Name and message are required' });
    }
    
try {
        // Await the addMessage function
        await chatModel.addMessage(name, chat); 

        // If addMessage is successful, send a success response
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        // Handle any errors from addMessage

        console.log(err)
        res.status(500).json({ message: 'Failed to send message' });
    }
};
const getMessages = async (req, res) => {
    try {
        const messages = await chatModel.getAllMessages();
        //requ.userid id,getname 
        res.status(200).json({ messages });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve messages', error: err.message });
    }
};

// Clear chat function
const clearChat = async (req, res) => {
    try {
        // Call the model to clear the chat
        const result = await chatModel.clearChat();

        // If the deletion is successful, send a success response
        res.status(200).json({ message: 'Chat cleared successfully' });
    } catch (error) {
        // Handle any errors that occur in the model
        console.error('Error clearing chat:', error.message); // Log the error for debugging purposes
        res.status(500).json({ message: 'Failed to clear chat', error: error.message });
    }
};
module.exports = {
    sendMessage, 
    getMessages,
    clearChat
};
