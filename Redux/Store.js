import { legacy_createStore as CreateStore, combineReducers } from "redux";
import UsersChat from "../UserPage/Account/Chat/UsersChat";

const DefaultState = {
    ActiveComments: false, TargetPost: null, ActiveChat: false,
    messages: {component: <UsersChat />}, Search: [], searchResult: []
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
        return {...state, Search: action.payload, searchResult: action.payload};
    }
    else if (action.type === 'SearchFriend') {
        const result = state.Search.filter(ele => `${ele.FirstName} ${ele.LastName}`.includes(action.payload));
        return {...state, searchResult: result};
    }
    else if (action.type === 'DefaultValue') {
        return {...state, searchResult: state.Search};
    }
    else if (action.type === 'UpdateFriends') {
        const result = state.Search.filter(ele => ele.id !== action.payload);
        return {...state, searchResult: result};
    }
    else if (action.type === 'AddPost') {
        return {
            ...state, Search: [...state.Search, action.payload],
            searchResult: [...state.Search, action.payload]
        };
    }
    else if (action.type === 'SearchPost') {
        const result = state.Search.filter(ele => ele.PostActicle.includes(action.payload));
        return {...state, searchResult: result};
    }
    return state;
};

const root = combineReducers({ CommentReducer, ChatReducer, SearchReducer });
const store = CreateStore(root, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;