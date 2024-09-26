const pool = require('../config/db');

const addinfo = (infoData)=>{
    const {name, location, vegNonveg, price} = infoData;
    const query = 'INSERT INTO user_requirements (name, location, vegNonveg, price) VALUES(?, ?, ?, ?)';

    return new Promise((resolve, reject)=>{
        pool.query(query,[name, location, vegNonveg, price], (err, result)=>{
            if(err){
                return reject(err)
            }
            resolve(result);
        })
    })
}

const owner = (infoOwner)=>{
    const {owner_name, Owner_contact} = infoOwner;
    const query = 'INSERT INTO owner_details (owner_name, Owner_contact) VALUES (?, ?)';

    return new Promise((resolve, reject)=>{
        pool.query(query,[owner_name, Owner_contact], (err, result)=>{
            if(err){
                return reject(err)
            }
            resolve(result);
        })
    })
}

module.exports = {
    addinfo,
    owner
}