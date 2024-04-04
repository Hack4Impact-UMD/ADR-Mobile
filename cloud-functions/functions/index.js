"use strict";

// Dependencies for callable functions.
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
// [END import]

exports.createAdminUser = onCall(async (request) => {
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
        userType: "ADRAdmin",
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
        userType: "Parent",
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

exports.createADRStaffUser = onCall(async (request) => {
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
        userType: "ADRStaff",
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

exports.createSchoolStaffUser = onCall(async (request) => {
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
        userType: "SchoolStaff",
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
