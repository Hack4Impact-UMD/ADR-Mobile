import {initializeApp} from 'firebase/app';
import {getAuth, sendPasswordResetEmail} from '@firebase/auth';
import {getFunctions, httpsCallable} from 'firebase/functions';

export function createUser(
  userId: string,
  name: string,
  email: string,
  schoolDistrictId: string,
  numChildren: string,
  creationDate: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createUserCloudFunction = httpsCallable(functions, 'createUser');

    createUserCloudFunction({
      userId: userId,
      email: email,
      name: name,
      schoolDistrictId: schoolDistrictId,
      numChildren: numChildren,
      creationDate: creationDate,
      userType: 'parent',
    })
      .then(async () => {
        resolve();
      })
      .catch(error => {
        console.log(error.message);
        reject();
      });
  });
}
