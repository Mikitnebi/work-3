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

                case 'acceptRequst':
                    const requestId = action.value.id;
                    const updatedRequests = state.requests.map(request =>
                      request.id === requestId ? { ...request, status: false } : request
                    );
              
                    return { ...state, requests: updatedRequests };
                    case 'rejectRequest':
                        const requestId1 = action.value.id;
                        const updatedRequests1 = state.requests.map(request =>
                          request.id === requestId1 ? { ...request, position: false } : request
                        );
                  
                        return { ...state, requests: updatedRequests1 };
                        case 'chooseTable':
                        const requestId2 = action.value.id;
                        const updatedRequests2 = state.requests.map(request =>
                          request.id === requestId2 ? { ...request, tableNumber: action.value.number } : request
                        );
                  
                        return { ...state, requests: updatedRequests2 };
        // case "addUserInformation":
        //     console.log(action.propertyId.username)
        //     return {...state, [action.propertyId] : action.value}
            // return { ...state , [action.propertyId.username]: action.value.name, [action.propertyId.email]: action.value.email, [action.propertyId.number]: action.value.card, [action.propertyId.password]: action.value.password }
        default:
            break;
    }
}