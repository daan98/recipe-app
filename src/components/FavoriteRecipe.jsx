import {useState, useEffect} from 'react';

import "../styles/RecipeInfo.css";

function FavoriteRecipe() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [deleteRecipe, setDeleteRecipe]     = useState({})

  const getFavotireRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem('favorites')) ?? [];
    setFavoriteRecipe(recipes);
  };

  const deleteFavorite = (id) => {
    const favorites    = JSON.parse(localStorage.getItem('favorites')) ?? [];
    
    // Check if there are empty item in the arrary to avoid error
    const newFavorites = favorites.filter(favorite => favorite?.id !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    if (Object.keys(deleteRecipe).length === 0) {
      getFavotireRecipe();
    } else {
      deleteFavorite(deleteRecipe?.recipe.id);
      getFavotireRecipe();
    }
  }, [deleteRecipe]);

  return (
    <>
      { favoriteRecipe.length != 0 ?
          <div className='recipes-container'>
            { favoriteRecipe.map(({id, label, ingredientLines, image, calories}, index) => id ? (
              <div key={index} className="recipe-info-container">
                <h1>{label}</h1>
                <ul className="ingredient-list-container">
                    {ingredientLines.map((ingredient, index) => (
                        <li key={index}>{ ingredient }</li>
                    ))}
                </ul>
                
                <div className="buttons-container">
                    <button
                        type="button"
                        onClick={() => {
                          setDeleteRecipe(
                                {
                                    recipe: {
                                        id: label,
                                        label,
                                        calories,
                                        image,
                                        ingredientLines
                                    }
                                }
                            );
                        }}
                    >
                        Eliminar de Favorito
                    </button>
                </div>

                <p>calories: <span>{ calories.toFixed(2) }</span></p>

                <div className="image-container">
                    <img src={image} alt="recipe image" />
                </div>
              </div>
          ) : null)
          }
          </div>
        :
        <h1>There is no favorite recipe saved yet</h1>
       }
    </>
  );
};

export default FavoriteRecipe;