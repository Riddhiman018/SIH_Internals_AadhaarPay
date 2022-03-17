const {firebaseApp} = require('../models/database.model')

//requiredParams,citizenUID
async function getPreviousTxns(req,res){
    if(!req.query.uid){
        res.status(200).send({
            Message:"UID Missing"
        })
    }
    else{
        const prevTxns = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}Txns`).collection('PrevTxns').get()
        const prevTxnArray = []
        prevTxns.forEach((doc)=>{
            prevTxnArray.push(doc.data())
            console.log(doc.data());
        })
        res.status(200).send(prevTxnArray)
    }
}

module.exports = {
    getPreviousTxns
}