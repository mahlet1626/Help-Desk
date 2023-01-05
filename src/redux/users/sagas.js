import { all, takeEvery, put, call, take } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import { requestAdmin, requestDispatcher, getCurrentUser } from '../../helpers/users/users';
import { auth } from "../../firebase";
// import { requestGetTrip, requestPostTrip } from '../../helpers/dispatchers/getTrips';

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

// const COLLECTION_NAME = 'trips'; // change your collection
// const ORDER_BY = 'id';
// const ORDER = 'desc';

function* checkUserPermission(data) {
  const { payload } = data
  console.log(payload)
  try {
    const response = yield call(requestAdmin, payload);
    console.log(response)
    yield put(actions.checkUserPermissionSuccess("Admin"))

  } catch (error) {
    console.log("Not Admin");
    try {
      const response = yield call(requestDispatcher, payload);
      yield put(actions.checkUserPermissionSuccess("Dispatcher"))
      console.log(response)

    } catch (error) {
      console.log("Not Dispatcher");
      yield put(actions.checkUserPermissionError("Not_Allowed"));
    }

    // yield put(actions.checkUserPermissionError(error));
  }
}

function* getLoggedInUserId() {

  try {
    const user = yield call(getCurrentUser);
    console.log(user.uid)
    try {
      const response = yield call(requestAdmin, user.uid);
      console.log(response)
      yield put(actions.checkUserPermissionSuccess("Admin"))

    } catch (error) {
      console.log("Not Admin");
      try {
        const response = yield call(requestDispatcher, user.uid);
        yield put(actions.checkUserPermissionSuccess("Dispatcher"))
        console.log(response)

      } catch (error) {
        console.log("Not Dispatcher");
        yield put(actions.checkUserPermissionError("Not_Allowed"));
      }

      // yield put(actions.checkUserPermissionError(error));
    }
    // const response = yield call(requestAdmin, user.uid);
    // console.log(response)
    // yield put(actions.getUserIdSuccess(user.uid))

  } catch (error) {
    console.log("Not Admin");

    // yield put(actions.getUserIdError("Not_Allowed"));
  }
}

// function* storeIntoFirestore({ payload }) {
//   const { data, actionName } = payload;
//   try {
//     const date = new Date();
//     let form_data = new FormData();
//     form_data.append("trip_startedat", date.toISOString());
//     form_data.append("trip_finishedat", date.toISOString());
//     form_data.append("trip_duration", "");
//     form_data.append("pick_up_address", data.sender_location);
//     form_data.append("drop_off_address", data.receiver_location);
//     form_data.append("pick_up_lon", data.pick_up_lon);
//     form_data.append("pick_up_lat", data.pick_up_lat);
//     form_data.append("drop_off_lon", data.drop_off_lon);
//     form_data.append("drop_off_lat", data.drop_off_lat);
//     form_data.append("distance", 5);
//     form_data.append("trip_status", "REQUESTED");
//     form_data.append("trip_type", "PERSONAL");
//     form_data.append("sender_fullname", data.sender_name);
//     form_data.append("sender_phone_number", data.sender_phone);
//     form_data.append("reciver_fullname", data.receiver_name);
//     form_data.append("reciver_phone_number", data.receiver_phone);
//     form_data.append("cargo_type", data.cargo_type);
//     form_data.append("cargo_description", data.cargo_description);
//     form_data.append("cargo_weight", data.cargo_weight);
//     form_data.append("trip_price", 5);
//     form_data.append("payment_status", "PENDING");
//     form_data.append("package_pricing_id", String(data.pricing_package));//payload.data.pricing_package
//     const response = yield call(requestPostTrip, form_data);
//     console.log(response)
//     yield put({ type: actions.LOAD_FROM_FIRESTORE });
//   }
//   catch (error) {
//     console.log(error);
//     yield put(actions.loadFromFireStore());
//   }
// }

// const readAllFirestoreDocuments = async () =>
//   await database
//     .collection(COLLECTION_NAME)
//     .get()
//     .then(querySnapshot => {
//       const documents = [];
//       try {
//         querySnapshot.forEach(doc => {
//           documents.push(doc.id);
//         });
//       } catch (e) { }
//       return documents;
//     });

// function* resetFireStoreDocuments() {
//   try {
//     const docsKey = yield call(readAllFirestoreDocuments);

//     let batch = createBatch();
//     docsKey.forEach(key => {
//       batch.delete(database.collection(COLLECTION_NAME).doc(key));
//       batch.commit();
//       batch = createBatch();
//     });

//     batch = createBatch();
//     fakeDataList.forEach(trip => {
//       const doc = database.collection(COLLECTION_NAME).doc(createNewRef());
//       batch.set(doc, trip);
//     });
//     batch.commit();

//     yield put({ type: actions.LOAD_FROM_FIRESTORE });
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_USER_PERMISSION, checkUserPermission),
    takeEvery(actions.GET_LOGGEDIN_USER, getLoggedInUserId),
    // takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    // takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
