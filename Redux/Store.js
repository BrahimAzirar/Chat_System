import { legacy_createStore as CreateStore, combineReducers } from "redux";
import UsersChat from "../UserPage/Account/Chat/UsersChat";

const DefaultState = {
    ActiveComments: false, TargetPost: null, ActiveChat: false,
    messages: {component: <UsersChat />}, Search: []
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
    else if (action.type === 'messageWithFriend') {
        return {...state, messages: action.payload};
    }
    else if (action.type === 'BacktoChatMenu') {
        return {...state, messages: {component: <UsersChat />}};
    }
    return state;
};

const SearchReducer = (state = DefaultState, action) => {
    if (action.type === 'Target') {
        return {...state, Search: action.payload};
    }
    return state;
};

const root = combineReducers({ CommentReducer, ChatReducer, SearchReducer });
const store = CreateStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;