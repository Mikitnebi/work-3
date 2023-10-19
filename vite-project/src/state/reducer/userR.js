import { userState } from "../State/userS";


export function userReducer(state, action){
    switch (action.type) {
        case "changeUserInformation":
            return { ...state, [action.propertyId]: action.value }
        // case "changeEmail":
        //     return { ...state, [action.propertyId]: action.value }
        // case "changeNumber":
        //     return { ...state, [action.propertyId]: action.value }
        // case "changePassword":
        //     return { ...state, [action.propertyId]: action.value }    
        default:
            break;
    }
}