import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeInfo from "./components/RecipeInfo";
import Footer from "./components/Footer";

const App = () => {
    
    const apiKey                        = import.meta.env.VITE_APP_API_KEY;
    const appId                         = import.meta.env.VITE_APP_APP_ID;
    const [recipes, setRecipes]         = useState([]);
    const [links, setLinks]             = useState({});
    const [prevLink, setPrevLink]       = useState({});
    const [showPrevBtn, setShowPrevBtn] = useState(false);
    
    const getData = async (searchTerm) => {
        await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${apiKey}&type=public&q=${searchTerm ? searchTerm : 'apple'}&imageSize=REGULAR`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setRecipes(data.hits);
            setLinks(data._links);
        });
    };

    const onClickSearchBtn = (term) => {
        if (term.trim()) {
            getData(term);
        }
    };

    const getPaginationData = async (url) => {
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('handlePagination data: ', data);
            setRecipes(data.hits);
            setLinks(data._links);
        });
    };

    const handlePagination = async (url, prevClicked) => {
        if (prevClicked) {
            getPaginationData(url);
            setPrevLink({});
            setShowPrevBtn(false);
        } else {
            setPrevLink(links);
            setShowPrevBtn(true);
            getPaginationData(url);
        }

        scrollToTop();
    };

    const scrollToTop = () => {
        // Safari
        document.body.scrollTop = 0;
        // Other browsers
        document.documentElement.scrollTop = 0;
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

            <Footer
                prev={prevLink.next}
                next={links.next}
                onPagination={handlePagination}
                isPrevBtnVisible={showPrevBtn}
            />
        </div>
    );
};

export default App;