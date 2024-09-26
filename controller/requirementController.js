const {response}  = require('express');
const user_requirements = require('../model/requirementModel');
const owner_details = require('../model/requirementModel');

const addinfo = async (req, res) => {
    const infoData = req.body;

    // Validate input
    if (!infoData.name || !infoData.location || !infoData.vegNonveg || !infoData.price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Call the addinfo function from the model to insert data into the database
    user_requirements.addinfo(infoData)
        .then(result => { 
            res.status(201).json({
                message: 'Tiffin service information added successfully',
                data: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error adding tiffin service information',
                error: error.message,       
            });
        });
};

const owner = async(req, res)=>{
    const infoOwner = req.body;

    if(!infoOwner.owner_name || !infoOwner.Owner_contact){
        return res.status(400).json ({message: 'All fields are required'});      
    }
                                                                                          
    owner_details.owner(infoOwner)
        .then(result => {
        res.status(201).json({
            message: 'Here Are The Owners details',
            data: result,
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Something Went Wrong',
            error: error.message,
        });
    });
}

module.exports = { 
    addinfo,
    owner
 };
