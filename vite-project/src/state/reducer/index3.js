import { recipeState } from "../State/index";


export function manuPriceReducer(state, action){
    switch (action.type) {
            case "changeManuPrice":
                return { ...state, [action.propertyId]: action.value }
        default:
            break;
    }
}