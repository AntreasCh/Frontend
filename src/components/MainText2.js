import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import '../styles/MainText.css';

/**
 * MainText component that fetches the data from 
 * the API and displays a text.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function MainText() {

    // State variable for storing the text
    const [text, setText] = useState([]);

    // State variable for tracking whether the cards are currently being loaded
    const [loading, setLoading] = useState(true);

    // Effect hook to fetch the data from the API
    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/community&network/")
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
    const listOfText = text.map((value) => {
        return (
            <div key={value.main_id}>
                <div className="mainText">
                    {value.main_text.includes('\\n') || value.main_text.includes('@@') // If the article content includes '\n' or '@'
                        ? value.main_text
                            .replace(/\\n/g, '\n') // Replace '\\n' with '\n'
                            .replace(/@@/g, '"') // Replace '@@' with '"'
                            .split('\n') // Split the article content into paragraphs
                            .map((paragraph, index) => ( // For each paragraph add two line breaks
                                <Fragment key={index}>
                                    {paragraph}
                                    <br />
                                </Fragment>
                            ))
                        : <p>{value.main_text}</p> // Otherwise, just display the article content as a single paragraph
                    }
                </div>
            </div>
        );
    });

    return (
        <div className="mainTextSection">
            {/* If the component is still loading, show a loading message */}
            {loading && <p>Loading...</p>}
            <div>{listOfText}</div>
        </div>
    );
}

export default MainText;