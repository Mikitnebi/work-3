import { recipeState } from "../State/index";


export function restaurantReducer(state, action){
    switch (action.type) {
        case "changePrimitiveType":
            return { ...state, [action.propertyId]: action.value }
  
        
        default:
            break;
    }
    console.log(state)
    console.log(action)

}