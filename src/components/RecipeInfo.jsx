import React, { useEffect, useState} from "react";

import { IngredientsList, Modal } from "./";
import "../styles/RecipeInfo.css";

const RecipeInfo = ({ recipeInfo, saveDeleteRecipe }) => {
    const { label, calories, image, ingredientLines } = recipeInfo.recipe;
    
    const [isShowModal, setIsShowModal]     = useState(false);
    const [isRecipeSaved, setIsRecipeSaved] = useState(false);
    
    const handleShowMore = (state) => {
        setIsShowModal(state);
        
        if (state) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    };

    useEffect(() => {
        const favorites   = JSON.parse(localStorage.getItem('favorites')) ?? [];
        const recipeSaved = favorites.some(favorites => favorites?.id === label);

        if (recipeSaved) {
            setIsRecipeSaved(true);
        }
    }, []);
    
    return(
        <>
            <h1>{label}</h1>
            <ul className="ingredient-list-container">
                {ingredientLines.map((ingredient, index) => index < 4 ? (
                    <li key={index}>{ ingredient }</li>
                ) : null)}
            </ul>
            
            <div className="buttons-container">
                { ingredientLines.length > 4 ?
                    <button type="button" onClick={() => handleShowMore(true)}>Show more</button>
                :
                null
                }
                <button
                    type="button"
                    onClick={() => {
                        saveDeleteRecipe(
                            {
                                isSave: !isRecipeSaved,
                                recipe: {
                                    id: label,
                                    label,
                                    calories,
                                    image,
                                    ingredientLines
                                }
                            }
                        );
                        setIsRecipeSaved(!isRecipeSaved);
                    }}
                >
                    {!isRecipeSaved ? 'Add to Favorite' : 'Delete from Favorite'}
                </button>
            </div>

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
        </>
    );
};

export default RecipeInfo;