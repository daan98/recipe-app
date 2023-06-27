import React, { useState } from "react";
import "../styles/RecipeInfo.css";
import Swal from "sweetalert2";
import Modal from "./Modal";
import IngredientsList from "./IngredientList";

const RecipeInfo = ({ recipeInfo }) => {
    const { label, calories, image, ingredientLines } = recipeInfo.recipe;
    const [isShowModal, setIsShowModal] = useState(false);
    
    const handleShowMore = (state) => {
        setIsShowModal(state);
        
        if (state) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    };
    
    return(
        <div className="recipe-info-container">
            <h1>{label}</h1>
            <ul>
                {ingredientLines.map((ingredient, index) => index < 4 ? (
                    <li key={index}>{ ingredient } - { index }</li>
                ) : null)}
            </ul>
            { ingredientLines.length > 4 ?
                <button type="button" onClick={() => handleShowMore(true)}>Show more</button>
            :
            null
            }
            <p>calories: <span>{ calories.toFixed(2) }</span></p>

            <div className="image-container">
                <img src={image} alt="recipe image" />
            </div>
            {isShowModal && (
                <Modal 
                    closeBtnText={"Show Less"} 
                    handleShowModal={handleShowMore}
                    isShowModal={isShowModal} 
                    title={"Ingredients List"} 
                    content={
                                <IngredientsList 
                                    ingredients={ingredientLines}
                                />
                            }
                />
            )}
        </div>
    );
};

export default RecipeInfo;