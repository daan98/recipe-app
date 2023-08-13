import React from "react";

const IngredientsList = ({ ingredients }) => {
    return(
        <div className="list-container">
            <ul style={{flexDirection: "column"}}>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ ingredient }</li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientsList;