"use strict";

// Dependencies for callable functions.
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
// [END import]

exports.createUser = onCall(async (request) => {
  const email = request.data.email;
  const name = request.data.name;
  const schoolId = request.data.schoolId;
  const schoolDistrictId = request.data.schoolDistrictId;
  const numChildren = request.data.numChildren;

  return new Promise(async (resolve, reject) => {
    await getFirestore()
      .collection("users")
      .add({
        name: name,
        email: email,
        userType: "admin",
        schoolId: schoolId,
        schoolDistrictId: schoolDistrictId,
        numChildren: numChildren,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject({
          text: error.message,
        });
      });
  });
});

exports.createUser = onCall(async (request) => {
  const email = request.data.email;
  const name = request.data.name;
  const schoolId = request.data.schoolId;
  const schoolDistrictId = request.data.schoolDistrictId;
  const numChildren = request.data.numChildren;

  return new Promise(async (resolve, reject) => {
    await getFirestore()
      .collection("users")
      .add({
        name: name,
        email: email,
        userType: "parent",
        schoolId: schoolId,
        schoolDistrictId: schoolDistrictId,
        numChildren: numChildren,
      })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject({
          text: error.message,
        });
      });
  });
});
