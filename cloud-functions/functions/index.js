"use strict";

// Dependencies for callable functions.
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
 
 // The Firebase Admin SDK to access Firestore.
 const {initializeApp} = require("firebase-admin/app");
 const {getFirestore} = require("firebase-admin/firestore");
 
 initializeApp();
 // [END import]

 exports.createAdminUser = onCall(async (request) => {

    const email = request.data.email;
    const name = request.data.name;

    const writeResult = await getFirestore()
        .collection("messages")
        .add({original: email});
    res.json({result: `User with ID: ${writeResult.id} added.`});
  });

 exports.createUser = onCall(async (request) => {

    const email = request.data.email;
    const name = request.data.name;
    const schoolId = request.data.schoolId;
    const schoolDistrictId = request.data.schoolDistrictId;
    const numChildren = request.data.numChildren;

    const userData = {
        name: name,
        email: email,
        userType: "parent",
        schoolId: schoolId,
        schoolDistrictId: schoolDistrictId,
        numChildren: numChildren,
    };

    const writeResult = await getFirestore()
        .collection("users")
        .add(userData);

    res.json({result: `User with ID: ${writeResult.id} added.`});
  });