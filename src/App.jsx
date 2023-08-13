import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { MainInfo, NotFound, FavoriteRecipe, Header } from "./components";

const App = () => {
    
    const apiKey                        = import.meta.env.VITE_APP_API_KEY;
    const appId                         = import.meta.env.VITE_APP_APP_ID;
    const [recipes, setRecipes]         = useState([]);
    const [links, setLinks]             = useState({});
    const [prevLink, setPrevLink]       = useState({});
    const [showPrevBtn, setShowPrevBtn] = useState(false);
    const [loading, setLoading]         = useState(false);
    const pagesLink                     = [
        {
            path: "/",
            text: "Main"
        },
        {
            path: "favorites",
            text: "Favorites"
        },
    ];
    
    const getData = async (searchTerm) => {
        setLoading(true);
        await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${apiKey}&type=public&q=${searchTerm ? searchTerm : 'apple'}&imageSize=REGULAR`)
        .then((response) => response.json())
        .then((data) => {
            setRecipes(data.hits);
            setLinks(data._links);
            setLoading(false)
        });
    };

    const onClickSearchBtn = (term) => {
        if (term.trim()) {
            getData(term);
        }
    };

    const getPaginationData = async (url) => {
        setLoading(true);
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            setRecipes(data.hits);
            setLinks(data._links);
            setLoading(false);
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
            <Header pagesLink={pagesLink} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainInfo
                            onClickSearchBtn={onClickSearchBtn}
                            recipes={recipes}
                            prevLink={prevLink}
                            links={links}
                            handlePagination={handlePagination}
                            showPrevBtn={showPrevBtn}
                            loading={loading}
                        />
                    }
                />
                <Route path="favorites" element={<FavoriteRecipe />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;