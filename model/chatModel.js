const pool = require('../config/db');
// const { clearChat } = require('../controller/chatController');


const addMessage = (userId, chat) => {

    console.log(chat,userId)
    const currentTime = new Date().toISOString(); // Get current time in ISO format
    const query = 'INSERT INTO user_dash (name, chat, time) VALUES (?, ?, ?)';
    const query2 = 'SELECT name FROM users WHERE id =?';

    return new Promise((resolve, reject) => {
        // First, get the username based on user ID
        pool.query(query2,[userId] ,(err, results) => {
            if (err) {
                console.log(err);
                return reject(err); // Reject if there's an error
            }
            if (results.length > 0) {
                const username = results[0].name; // Extract the username

                // Now insert the message with the username
                pool.query(query, [username, chat, currentTime], (err, result) => {
                    if (err) {
                        return reject(err); // Reject the promise if there's an error
                    }
                    resolve(result); // Resolve the promise with the result if successful
                });
            } else {
                reject(new Error('User not found')); // Reject if no user found
            }
        });
    });
};



const getAllMessages=()=>
{
    const query = "SELECT * FROM user_dash ORDER BY id DESC LIMIT 5"; 
    return new Promise((resolve, reject) => {
        pool.query(query,(err, result) => {
            if (err) {
                return reject(err); // Reject the promise if there's an error
            }
            resolve(result); // Resolve the promise with the result if successful
        });
    });


};

const clearChat = () => {
    const query = 'DELETE FROM user_dash';
    return new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err) {
                return reject(err); // Reject the promise if there's an error
            }
            resolve(result); // Resolve the promise with the result if successful
        });
    });
};


module.exports = {
    addMessage,
    getAllMessages,
    clearChat
};
