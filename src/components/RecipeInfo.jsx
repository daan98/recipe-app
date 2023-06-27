import React from "react";
import "../styles/RecipeInfo.css";

const RecipeInfo = ({ recipeInfo }) => {
    const { label, calories, image, ingredientLines } = recipeInfo.recipe;
    
    return(
        <div className="recipe-info-container">
            <h1>{label}</h1>
            <ul>
                {ingredientLines.map((ingredient, index) => index < 4 ? (
                    <li>{ ingredient }</li>
                ) : null)}
            </ul>
            { ingredientLines.length > 4 ?
                <button type="button">Show more</button>
            :
            null
            }
            <p>calories: <span>{ calories }</span></p>

            <div className="image-container">
                <img src={image} alt="recipe image" />
            </div>
        </div>
    );
};

export default RecipeInfo;