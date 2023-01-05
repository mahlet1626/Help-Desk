const actions = {
  GET_USER_PERMISSION: 'GET_USER_PERMISSION',
  GET_USER_PERMISSION_SUCCESS: 'GET_USER_PERMISSION_SUCCESS',
  GET_USER_PERMISSION_ERROR: 'GET_USER_PERMISSION_ERROR',
  GET_LOGGEDIN_USER: 'GET_LOGGEDIN_USER',
  GET_LOGGEDIN_USER_SUCCESS: 'GET_LOGGEDIN_USER_SUCCESS',
  GET_LOGGEDIN_USER_ERROR: 'GET_LOGGEDIN_USER_ERROR',

  checkUserPermission: (id) => {
    return {
      type: actions.GET_USER_PERMISSION,
      payload: id
    }
  },
  checkUserPermissionSuccess: data => ({
    type: actions.GET_USER_PERMISSION_SUCCESS,
    payload: { data },
  }),
  checkUserPermissionError: error => ({
    type: actions.GET_USER_PERMISSION_ERROR,
    payload: { error },
  }),

  getLoggedInUserId: () => {
    return {
      type: actions.GET_LOGGEDIN_USER
    }
  },
  getUserIdSuccess: data => ({
    type: actions.GET_LOGGEDIN_USER_SUCCESS,
    payload: { data },
  }),
  getUserIdError: error => ({
    type: actions.GET_LOGGEDIN_USER_ERROR,
    payload: { error },
  }),

};
export default actions;
