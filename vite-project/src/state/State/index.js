import { v4 as uuidv4 } from 'uuid';

export const recipeState = {
    inputQuery: "",
    query: "",
    recipes: [],
    recipeId: "",
    title: "",
    img: "/",
    ingredients: [],
    publisher: "",
    likes: [],
    requests: [
        {tableNumber:'',position:true , id:uuidv4(),name:'lika toradze',person:5,aditional:'სასურველია მაგიდა ფანჯარასთან და კიდევ რაღაც რაღაცეები',data:new Date(),img:'../portrait-of-random-person-on-leafy-background-8xtpcwzjlw7vbi63.jpg',status:true,tableTags:["#მყუდრო",'#რომნტიული']},
        {tableNumber:'',position:true , id:uuidv4(),name:'bela nozadze',person:7,aditional:'სასურველია მყუდრო მაგიდა',data:new Date(),img:'../portrait-of-random-person-on-leafy-background-8xtpcwzjlw7vbi63.jpg',status:true,tableTags:["#მყუდრო",'#რომნტიული']},
        {tableNumber:'',position:true , id:uuidv4(),name:'eka margvelashvili',person:2,aditional:'სასურველია მაგიდა ღია ცის ქვეშ',data:new Date(),img:'../portrait-of-random-person-on-leafy-background-8xtpcwzjlw7vbi63.jpg',status:true,tableTags:["#მყუდრო",'#რომნტიული']},

    ],
}