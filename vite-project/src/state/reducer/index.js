import { recipeState } from "../State/index";


export function recipeReducer(state, action){
    switch (action.type) {
        case "changePrimitiveType":
            return { ...state, [action.propertyId]: action.value }
  
        case "initLikes":
            return { ...state, likes: action.value }
        case "addLikes":
            const index1 = state.likes.findIndex(el => el?.id === action.value?.id);
            if(index1 === -1){
                state.likes.push(action.value)
            }
            window.localStorage.setItem("likes",JSON.stringify(state.likes));
            return { ...state }
        case "deleteLikes":
            const index2 = state.likes.findIndex(el => el?.id === action.value.id);
            if(index2 !== -1){
                state.likes.splice(index2,1)
            }
            window.localStorage.setItem("likes",JSON.stringify(state.likes));
            return { ...state }
        case "addRequest":
                const req1 = state.requests.findIndex(el => el?.id === action.value?.id);
                if(req1 === -1){
                    state.requests.push(action.value)
                }
                return { ...state }
        // case "addUserInformation":
        //     console.log(action.propertyId.username)
        //     return {...state, [action.propertyId] : action.value}
            // return { ...state , [action.propertyId.username]: action.value.name, [action.propertyId.email]: action.value.email, [action.propertyId.number]: action.value.card, [action.propertyId.password]: action.value.password }
        default:
            break;
    }
}