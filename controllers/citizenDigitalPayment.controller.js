const {firebaseApp} = require('../models/database.model')
const Stripe = require('stripe')

const stripePublishableKey = "pk_test_51KeOpASH36ERpDK3O9T1tAmGHoAxfkL1in8gwcwvgtccRPChUOjuKj6wey020XQj098XfMiFAeyihI9ro7tHc8oR00MASzHu0u"
const stripeSecretKey = "sk_test_51KcrhYSEKHQrMKMm2bOFNrYsp2T2kSc2vjWxwzPpauyRjuPQNGkTlRwFbtEDEl8yq4gwQ1ugIjCyOuocninynbNY00echxqI3i"
//
const stripeClient = Stripe(stripeSecretKey)

async function digitalCheckout(req,res){
    //We need the amount to be paid by the citizen
    // for this we need service opted.
    //Lets get it from operator
    //Operator_1Txns->booking_id->Service
    //take uid also
    const getTxnDetails = await firebaseApp.firestore().collection('Operator').doc(`${req.query.Operator_ID}Txns`).collection('PendingTxns').doc(`${req.query.booking_id}`).get()
    const amount_to_be_paid = getTxnDetails.data().AmountToBePaid
    const service = getTxnDetails.data().Service
    const session = await stripeClient.checkout.sessions.create({       
        mode:'payment',
        line_items:[
            {
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:`Update Service Payment (${service})`,
                    },
                    unit_amount:amount_to_be_paid*100,
                },
                quantity: 1
            }
        ],
        success_url:`https://sihpaymentapis.herokuapp.com/success?booking_id=${req.query.booking_id}&uid=${req.query.uid}&operator_id=${req.query.Operator_ID}`,
        cancel_url:'https://www.bing.com/?toWww=1&redig=5721A53EFDEA4A188A40C0AAFC26F9B0'
    })
    console.log(session.url)
    res.redirect(301,session.url)
}

async function updateDigitalPayment(req,res){
    const booking_id = req.query.booking_id
    const uid = req.query.uid
    const operator_id = req.query.Operator_ID
    const updateCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${uid}Txns`).collection('UpcomingTxns').doc(`${booking_id}`).update({
        TxnStatus:"Done"
    })
    //Now move this txn to PrevTxn of citizen
    const updatedCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${uid}Txns`).collection('UpcomingTxns').doc(`${booking_id}`).get()
    const updatedCitizenData = updatedCitizen.data()
    const moveToPrevTxn = await firebaseApp.firestore().collection('Citizen').doc(`${uid}Txns`).collection('PrevTxns').doc(`${booking_id}`).set({
        updatedCitizenData
    })
    console.log(moveToPrevTxn)
    const deleteUpdatedCitizen = await firebaseApp.firestore().collection('Citizen').doc(`${uid}Txns`).collection('UpcomingTxns').doc(`${booking_id}`).delete()
    //Move this to ResolvedTxn of Operator
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Success</title>
    </head>
    <body>
    <h3>Payment Done Thanks for coming</h3>
    <script>
</script>
    </body>
    </html>`)
}

module.exports = {
    digitalCheckout,
    updateDigitalPayment
}
