import { recipeState } from "../State/index";


export function manuNameReducer(state, action){
    switch (action.type) {
            case "changeManuName":
                return { ...state, [action.propertyId]: action.value }
        default:
            break;
    }
}