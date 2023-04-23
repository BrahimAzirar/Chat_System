import { legacy_createStore as CreateStore, combineReducers } from "redux";

const DefaultState = {
    ActiveComments: false, TargetPost: null, ActiveChat: false
};

const CommentReducer = (state = DefaultState, action) => {
    if (action.type === 'ShowComments') {
        return {...state, ActiveComments: true};
    }
    else if (action.type === 'HideComments') {
        return {...state, ActiveComments: false};
    }
    else if (action.type === 'TragetPost') {
        return {...state, TargetPost: action.payload};
    }
    else if (action.type === 'RemoveTarget') {
        return {...state, TargetPost: null};
    }
    return state;
};

const ChatReducer = (state = DefaultState, action) => {
    if (action.type === 'ShowChat') {
        return {...state, ActiveChat: true};
    }
    else if (action.type === 'HideChat') {
        return {...state, ActiveChat: false};
    }
    return state;
};

const root = combineReducers({ CommentReducer, ChatReducer });
const store = CreateStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;