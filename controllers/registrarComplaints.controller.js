const {firebaseApp} = require('../models/database.model')

async function getComplaints(req,res){
    //requires OperatorID
    const complaintsArray = []
    const registrarComplaints = await firebaseApp.firestore().collection('Registrar').doc(`${req.query.OperatorID}`).collection('Complaints').get()
    registrarComplaints.forEach((doc)=>{
        complaintsArray.push(doc.data())
    }) 
    res.status(200).send(complaintsArray)
}

module.exports = {
    getComplaints
}