import React from "react";
import "../styles/Footer.css";

const Footer = ({ next, prev, onPagination, isPrevBtnVisible }) => {
    /* const showPrevBtn = () => {
        if (Object.keys(prev).length === 0) {
            showPrevBtn(false);
        } else {
            showPrevBtn(true);
        }
    }; */
    
    return(
        <footer>
            {/* {isPrevBtnVisible && (
                <button type="button" onClick={() => onPagination(prev.href, true)}>Previous page</button>
            )} */}
            <button 
                type="button" 
                className="pagination-btn" 
                onClick={() => onPagination(next.href, false)}
            >
                {next?.title}
            </button>
        </footer>
    );
};

export default Footer;