import {initializeApp} from 'firebase/app';
import {getAuth, sendPasswordResetEmail} from '@firebase/auth';
import {getFunctions, httpsCallable} from 'firebase/functions';

export function createUser(
  userId: string,
  name: string,
  email: string,
  schoolId: string,
  schoolDistrictId: string,
  numChildren: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createUserCloudFunction = httpsCallable(functions, 'createUser');

    createUserCloudFunction({
      userId: userId,
      email: email,
      name: name,
      schoolId: schoolId,
      schoolDistrictId: schoolDistrictId,
      numChildren: numChildren,
    })
      .then(async () => {
        console.log('userID: ', userId);
        resolve();
      })
      .catch(error => {
        console.log(error.message);
        reject();
      });
  });
}
