const GET_ALL_FROGS = "frogs/GET_ALL_FROGS";
const GET_FROG = "frogs/GET_FROG";
const CREATE_FROG = "frogs/CREATE_FROG";
const UPDATE_FROG = "frogs/UPDATE_FROG";
const DELETE_FROG = "frogs/DELETE_FROG";
const GET_USER_FROGS = "frogs/GET_USER_FROGS";

export const getAllFrogs = (frogs) => ({
  type: GET_ALL_FROGS,
  frogs,
});

export const getFrog = (frog) => ({
  type: GET_FROG,
  frog,
});

export const createFrog = (frog) => ({
  type: CREATE_FROG,
  frog,
});

export const updateFrog = (frog) => ({
  type: UPDATE_FROG,
  frog,
});

export const deleteFrog = (id) => ({
  type: DELETE_FROG,
  id
});

export const getUserFrogs = (frogs) => ({
  type: GET_USER_FROGS,
  frogs
});

export const getAllFrogsThunk = () => async (dispatch) => {
  const response = await fetch("/api/frogs/");
  if (response.ok) {
    const frogs = await response.json();
    dispatch(getAllFrogs(frogs));
  }
}

export const getUsersFrogsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/frogs`);
  if (response.ok) {
    const frogs = await response.json();
    dispatch(getUserFrogs(frogs));
  }
}

export const getFrogThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/frogs/${id}`);
  if (response.ok) {
    const frog = await response.json();
    dispatch(getFrog(frog));
  }
  return response;
}

export const createFrogThunk = formData => async (dispatch) => {
  const response = await fetch("/api/frogs/new", {
    method: 'POST',
    body: formData})
  
  const responseData = await response.json();

  if (response.ok) {
    dispatch(createFrog(responseData));
  }
  return responseData;
}

export const updateFrogThunk = (formData, id) => async (dispatch) => {
  const response = await fetch(`/api/frogs/${id}`, {
    method: 'PATCH',
    body: formData})
  
  const responseData = await response.json();

  if (response.ok) {
    dispatch(updateFrog(responseData));
  }
  return responseData;
}

export const deleteFrogThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/frogs/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteFrog(id));
  }
  return response;
}



const initialState = {};
const frogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FROGS:
      const normalized = {};
      action.frogs.forEach(p => normalized[p.id] = p);
      return normalized;
    case GET_FROG:
      return {...state, [action.frog.id]: action.frog};
    case GET_USER_FROGS: {
      const normalized = {};
      action.frogs.forEach(f => normalized[f.id] = f);
      return {...state, ...normalized};
    }
    case CREATE_FROG:
      return { ...state, [action.frog.id]: action.frog };
    case UPDATE_FROG:
      return { ...state, [action.frog.id]: action.frog };
    case DELETE_FROG:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

export default frogReducer;
