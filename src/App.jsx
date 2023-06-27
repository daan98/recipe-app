import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeInfo from "./components/RecipeInfo";

const App = () => {
    
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const appId = import.meta.env.VITE_APP_APP_ID;
    const [recipes, setRecipes] = useState([]);
    
    const getData = async (searchTerm) => {
        await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${apiKey}&type=public&q=${searchTerm ? searchTerm : 'apple'}&imageSize=REGULAR`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setRecipes(data.hits);
        });
    };

    const onClickSearchBtn = (term) => {
        console.log(term);
        if (term.trim()) {
            getData(term);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return(
        <div>
            <SearchBar searchBtnClicked={onClickSearchBtn}/>
            
            <div className="recipes-container">
                {recipes.length > 0 &&
                recipes.map((recipe, index) => (
                    <RecipeInfo recipeInfo={recipe} key={index}/>
                ))}
            </div>
        </div>
    );
};

export default App;