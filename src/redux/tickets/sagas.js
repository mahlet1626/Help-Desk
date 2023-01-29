import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import { requestGetTicket, requestPostTicket, requestUpdateTicket, requestDeleteTicket } from '../../helpers/tickets/getTickets';

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

const COLLECTION_NAME = 'tickets'; // change your collection
const ORDER_BY = 'id';
const ORDER = 'desc';

function* loadFromFirestore() {
  try {
    const response = yield call(requestGetTicket);
    // console.log(response.data.results)
    // console.log(response)
    console.log(response.data)
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      data.push({
        id:response.data[index]._id,
        issue_title: response.data[index].issue_title,
        project: response.data[index].project,
        issue_priority: response.data[index].issue_priority,
        assigned_to: response.data[index].assigned_to,
        issue_status: response.data[index].issue_status,
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
    
      // const date = new Date();
      let form_data = new FormData();
      console.log(data)
      form_data.append("issue_title", data.issue_title);
      form_data.append("project", data.project);
      form_data.append("issue_priority", data.issue_priority);
      form_data.append("assigned_to", data.assigned_to);
      form_data.append("issue_status", data.issue_status);

      const response = yield call(requestPostTicket, form_data);
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
    
      // const date = new Date();
      let form_data = new FormData();

      form_data.append("issue_title", data.issue_title);
      form_data.append("project", data.project);
      form_data.append("issue_priority", data.issue_priority);
      form_data.append("assigned_to", data.assigned_to);
      form_data.append("issue_status", data.issue_status);
     
      console.log(data.id)
      
      const response = yield call(requestUpdateTicket, form_data, data.id);
      
      yield put({ type: actions.LOAD_FROM_FIRESTORE });
    }
    catch (error) {
      console.log(error);
      yield put(actions.loadFromFireStore());
    }

  }
  else if (actionName == 'delete') {
    try {
      console.log(data.id)
      const response = yield call(requestDeleteTicket, data.id);
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
