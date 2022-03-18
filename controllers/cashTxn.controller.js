const {firebaseApp} = require('../models/database.model')


function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}


async function cashTxnController(req,res){
    //requires citizen_uid,booking_id,
    const Citizen = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}Txns`).collection('UpcomingTxns').doc(`${req.query.booking_id}`).get()
        var response_t = {}
        if(Citizen.data().Service === 'Biometrics'){
            response_t = {
                Service:'Biometrics',
                AmountToBePaid:'70',
                UniqueCode:generateRandomNumber(),
                Operator_ID:Citizen.data().OperatorID
            }
            const updateTxnMethodCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}Txns`).collection('UpcomingTxns').doc(`${req.query.booking_id}`).update({
                isCashTxn:true,
                CashTxnValue: response_t.AmountToBePaid
            })
            const updateTxnDetailsOperator_1 = await firebaseApp.firestore().collection('Operator').doc(`${response_t.Operator_ID}Txns`).collection('PendingTxns').doc(`${req.query.booking_id}`).update({
                AmountToBePaid:response_t.AmountToBePaid,
                CashTxnID:response_t.UniqueCode
            })
        }
        else{
            response_t = {
                Service:'Demographics',
                AmountToBePaid:'100',
                UniqueCode:generateRandomNumber(),
                Operator_ID:Citizen.data().OperatorID
            }
            const updateTxnMethodCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}Txns`).collection('UpcomingTxns').doc(`${req.query.booking_id}`).update({
                isCashTxn:true,
                CashTxnValue: response_t.AmountToBePaid
            })
            const updateTxnDetailsOperator_1 = await firebaseApp.firestore().collection('Operator').doc(`${response_t.Operator_ID}Txns`).collection('PendingTxns').doc(`${req.query.booking_id}`).update({
                AmountToBePaid:response_t.AmountToBePaid,
                CashTxnID:response_t.UniqueCode
            })
        }
        res.status(200).send(response_t)
}
//Here operator verifies UniqueCashTxn Code and validates the txn from his end. After that happens
//Users updates are finally fwded to the UIDAI 
// Upcomimg Txn goes to Previous Txn
async function OperatorCashTxnAmountView(req,res){
    //required params, booking_id,uniqueCashTxnID,Operator_ID
    const PendingTxnDetails = await firebaseApp.firestore().collection('Operator').doc(`${req.query.Operator_ID}Txns`).collection('PendingTxns').doc(`${req.query.booking_id}`).get()
    const data = PendingTxnDetails.data()
    console.log(data)
    if(req.query.uniqueCashTxnID==data.CashTxnID){
        //update Operator
        const OperatorUpdate = await firebaseApp.firestore().collection('Operator').doc(`${req.query.Operator_ID}Txns`).collection('PendingTxns').doc(`${req.query.booking_id}`).update({
            TxnStatus:"Done"
        })
        //update Citizen
        const citizen_uid = data.CustomerUID
        const customer_booking_id = req.query.booking_id
        const citizenUpdate = await firebaseApp.firestore().collection('Citizen').doc(`${citizen_uid}Txns`).collection('UpcomingTxns').doc(`${customer_booking_id}`).update({
            TxnStatus:"Done"
        })
        //Move txn to prevTxn
        const updatedCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${citizen_uid}Txns`).collection('UpcomingTxns').doc(`${customer_booking_id}`).get()
        const updatedCitizenData = updatedCitizen.data()
        const moveTxnToPrevTxn = await firebaseApp.firestore().collection('Citizen').doc(`${citizen_uid}Txns`).collection('PrevTxns').doc(`${customer_booking_id}`).set({
            updatedCitizenData
        })
        //delete from UpcomingTxns of citizen
        const completedUpcomingBooking =await firebaseApp.firestore().collection('Citizen').doc(`${citizen_uid}Txns`).collection('UpcomingTxns').doc(`${customer_booking_id}`).delete()
        //Operator: move to ArchivedTxns
        res.status(200).send({
            Message:"Updation Completed"
        })
    }
    else{
        res.status(200).send({
            Message:"Wrong CashTxnID"
        })
    } 
}

module.exports = {
    cashTxnController,
    OperatorCashTxnAmountView
}