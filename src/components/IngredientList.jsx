import React from "react";

const IngredientsList = ({ ingredients }) => {
    return(
        <div className="list-container">
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ ingredient }</li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientsList;