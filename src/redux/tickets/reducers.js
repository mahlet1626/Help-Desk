import actions from './actions';

const initState = {
  isLoading: true,
  errorMessage: false,
  tickets: {},
  modalActive: false,
  ticket: {
    key: null,
    id: new Date().getTime(),
    title: '',
    slug: '',
    excerpt: '',
    status: 'draft', // publish
    description: '',
    created_at: new Date().getTime(),
    deleted_at: null, // soft delete
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tickets: payload.data,
        errorMessage: false,
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        ticket: payload.data == null ? initState.ticket : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        ticket: payload.data,
      };
    default:
      return state;
  }
}
