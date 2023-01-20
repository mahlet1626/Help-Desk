import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import { requestGetUser, requestPostUser, requestUpdateUser, requestDeleteUser, urlToObject } from '../../helpers/users/getUsers';

const {
  database,
  createBatch,
  rsfFirestore,
  createNewRef,
  processFireStoreCollection,
} = FirebaseHelper;


/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = 'users'; // change your collection
const ORDER_BY = 'id';
const ORDER = 'desc';

function* loadFromFirestore() {
  try {
    const response = yield call(requestGetUser);
    console.log(response.data.results)
    const data = [];
    for (let index = 0; index < response.data.results.length; index++) {
      data.push({
        name: response.data.results[index].name,
        email: response.data.results[index].email,
        image: response.data.results[index].image,
        role: response.data.results[index].role,
       

      });
    }
    console.log(data)
    yield put(actions.loadFromFireStoreSuccess(data))
  } catch (error) {
    console.log(error);
    yield put(actions.loadFromFireStoreError(error));
  }
}


function* storeIntoFirestore({ payload }) {
  const { data, actionName } = payload;
  if (actionName == 'insert') {
    try {
      const file = yield call(urlToObject, data.image);
      // const date = new Date();
      let form_data = new FormData();

      form_data.append("name", data.name);
      form_data.append("email", data.email);
      form_data.append("image", file);
      form_data.append("role", data.role);

      const response = yield call(requestPostUser, form_data);
      console.log(response)
      yield put({ type: actions.LOAD_FROM_FIRESTORE });
    }
    catch (error) {
      console.log(error);
      yield put(actions.loadFromFireStore());
    }
  }
  else if (actionName == 'update') {
    try {
      const file = yield call(urlToObject, data.image);
      // const date = new Date();
      let form_data = new FormData();

      form_data.append("name", data.name);
      form_data.append("email", data.email);
      form_data.append("image", file);
      form_data.append("role", data.role);
     

      const response = yield call(requestUpdateUser, form_data, data.id);
      yield put({ type: actions.LOAD_FROM_FIRESTORE });
    }
    catch (error) {
      console.log(error);
      yield put(actions.loadFromFireStore());
    }

  }
  else if (actionName == 'delete') {
    try {

      const response = yield call(requestDeleteUser, data.id);
      yield put({ type: actions.LOAD_FROM_FIRESTORE });
    }
    catch (error) {
      console.log(error);
      yield put(actions.loadFromFireStore());
    }

  }
}

const readAllFirestoreDocuments = async () =>
  await database
    .collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const documents = [];
      try {
        querySnapshot.forEach(doc => {
          documents.push(doc.id);
        });
      } catch (e) { }
      return documents;
    });

function* resetFireStoreDocuments() {
  try {
    const docsKey = yield call(readAllFirestoreDocuments);

    let batch = createBatch();
    docsKey.forEach(key => {
      batch.delete(database.collection(COLLECTION_NAME).doc(key));
      batch.commit();
      batch = createBatch();
    });

    batch = createBatch();
    // fakeDataList.forEach(user => {
    //   const doc = database.collection(COLLECTION_NAME).doc(createNewRef());
    //   batch.set(doc, user);
    // });
    batch.commit();

    yield put({ type: actions.LOAD_FROM_FIRESTORE });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOAD_FROM_FIRESTORE, loadFromFirestore),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
