const express = require('express')
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const sgmail = require('@sendgrid/mail')
const {firebaseApp} = require('../models/database.model')

const accountSid = "AC0d6146395bb5cf4840da991128a12475"
const authToken = "37c4ad7152dca6ee2997c36c979bfc4a"
const sendGridKey = "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"

async function alertAuthorities(req,res){
    //req params must contain operator_id and uid of client
    const Citizen = await firebaseApp.firestore().collection('Citizen').doc(`${req.query.uid}`).get()
    const PhNo = Citizen.data().PhNo
    var transporter = nodemailer.createTransport({
        service:'gmail',
        port:587,  
        auth:{
            user:'yorb999@gmail.com',
            pass:'Hello123!@#'
        }
    });
    var maillist = [
        'shubro18@gmail.com',
        'malharsoham@gmail.com'
    ]
    var mailOptions = {
        from:'yorb999@gmail.com',
        to:maillist, 
        subject:'OVERCHARGING REPORTED',
        text:`Reporter: ${req.query.uid} against Operator with OperatorID : ${req.query.OperatorID}`
    }
    const updateRegistrar = await firebaseApp.firestore().collection('Registrar').doc(`${req.query.OperatorID}`).collection('Complaints').doc(`CashComplaint${req.query.uid}`).set({
        CauseOfComplaint: "Overcharging",
        UID:req.query.uid,
        PhNo:PhNo
    })
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.status(200).send({
                Message:"Problem in Email Sending"
            })
        }
        else{
            res.status(200).send({
                Message:`Overcharging Alert Sent to Registrar(shubro18@gmail.com) and copy sent to Citizen (malharsoham@gmail.com)`
            })
        }
    })
}

module.exports = {
    alertAuthorities
}
