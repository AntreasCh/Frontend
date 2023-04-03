import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Category.css';

/**
 * Category component that fetches the data from the 
 * APIs and displays a list of cards and the text.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function Category() {

    // State variable for storing the list of cards
    const [cards, setCards] = useState([]);

    // State variable for storing the text
    const [text, setText] = useState([]);

    // State variable for tracking whether the cards are currently being loaded
    const [loading, setLoading] = useState(true);

    // Effect hook to fetch the cards from the API
    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/")
            .then((response) => response.json())
            .then((json) => {
                setCards(json.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error reason:', error);
                setLoading(false);
            });
    }, []);

    // Effect hook to fetch the data from the API
    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/category-text/")
            .then((response) => response.json())
            .then((json) => {
                setText(json.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error reason:', error);
                setLoading(false);
            });
    }, []);

    // Display the data in HTML elements
    const listOfCategories = cards.map((value) => {
        return (
            <div className="category" key={value.cat_id}>
                <Link to={"/resources/" + value.path_title} className="linkCategory">
                    <div className="imageCategory">
                        <img src={value.cat_Img_url} alt={value.cat_Img_url} />
                    </div>
                    <div className="title">
                        <h4>{value.cat_title}</h4>
                    </div>
                </Link>
            </div>
        );
    });

    // Display the data in HTML elements
    const listOfText = text.map((value) => {
        return (
            <div key={value.cat_text_id}>
                <div className="categoryText">
                    {value.cat_text.includes('\\n') || value.cat_text.includes('@@') // If the article content includes '\n' or '@'
                        ? value.cat_text
                            .replace(/\\n/g, '\n') // Replace '\\n' with '\n'
                            .replace(/@@/g, '"') // Replace '@@' with '"'
                            .split('\n') // Split the article content into paragraphs
                            .map((paragraph, index) => ( // For each paragraph add two line breaks
                                <Fragment key={index}>
                                    {paragraph}
                                    <br />
                                </Fragment>
                            ))
                        : <p>{value.cat_text}</p> // Otherwise, just display the article content as a single paragraph
                    }
                </div>
            </div>
        );
    });

    return (
        <div className="categorySection">
            {/* If the component is still loading, show a loading message */}
            {loading && <p>Loading...</p>}
            <div>{listOfText}</div>
            <div className="categoryCard">{listOfCategories}</div>
        </div>
    );
}

export default Category;