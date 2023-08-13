import React, { useEffect, useState } from "react";

/* import SearchBar from "./SearchBar"; */
import { SearchBar, Footer, RecipeInfo } from "./";

function MainInfo(props) {
  const {
    onClickSearchBtn,
    recipes,
    prevLink,
    links,
    handlePagination,
    showPrevBtn,
    loading,
  } = props;

  const [favoriteRecipe, setFavoriteRecipe] = useState({isSave: 0, recipe: ''});

  const saveFavorite = (recipe) => {
    const isRepeat = onVerifySavedFavorites(recipe.id);
    
    if (isRepeat) {
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
    localStorage.setItem('favorites', JSON.stringify([...favorites, recipe]));
  };

  const onVerifySavedFavorites = (id) => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

      // Check if there are empty item in the arrary to avoid error
      return favorites.some(favorite => favorite?.id === id );
  };

  const deleteFavorite = (id) => {
      const favorites    = JSON.parse(localStorage.getItem('favorites')) ?? [];
      
      // Check if there are empty item in the arrary to avoid error
      const newFavorites = favorites.filter(favorite => favorite?.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    if (favoriteRecipe.isSave !== 0) {
      if (favoriteRecipe.isSave === true) {
        saveFavorite(favoriteRecipe.recipe);
      } else {
        deleteFavorite(favoriteRecipe?.recipe.id)
      }
    }
  }, [favoriteRecipe]);
  
  return (
    <>
      {loading ?
        <h1>Loading...</h1>
        : 
        <>
          <SearchBar searchBtnClicked={onClickSearchBtn}/>
              
          <div className="recipes-container">
              {recipes.length > 0 &&
              recipes.map((recipe, index) => (
                <div key={index} className="recipe-info-container">
                  <RecipeInfo recipeInfo={recipe} saveDeleteRecipe={setFavoriteRecipe}  />
                </div>
              ))}
          </div>
      
          <Footer
              prev={prevLink.next}
              next={links.next}
              onPagination={handlePagination}
              isPrevBtnVisible={showPrevBtn}
          />
        </>
      }
    </>
  )
}

export default MainInfo