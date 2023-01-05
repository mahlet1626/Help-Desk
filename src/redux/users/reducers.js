import actions from './actions';

const initState = {
  isLoading: true,
  errorMessage: false,
  userPermission: "",
  userId: "",
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_USER_PERMISSION:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.GET_USER_PERMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userPermission: payload.data,
        errorMessage: false,
      };
    case actions.GET_USER_PERMISSION_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Not_Allowed",
      };

    case actions.GET_LOGGEDIN_USER:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.GET_LOGGEDIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: payload.data,
        errorMessage: false,
      };
    case actions.GET_LOGGEDIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Not_Allowed",
      };
    default:
      return state;
  }
}
