import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ParentPage from './ParentPage';
import moment from 'moment';
import NotFound from './NotFound';
import '../styles/NewsDetails.css';


/**
 * NewsDetails route that display the details of the 
 * specific card based on the news_id and news_title.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function NewsDetails() {

    // extracts the news_id and news_title parameters from the URL
    const { news_id, news_title } = useParams();

    // initializes a state variable called 'details' with null 
    const [details, setDetails] = useState(null);

    // initializes a state variable called 'loading' with true 
    const [loading, setLoading] = useState(true);

    // initializes a state variable called 'error' with false
    const [error, setError] = useState(false);

    // Effect hook to fetch the cards from the API
    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/news-and-insights/?news_id=" + news_id + "&&news_title=" + news_title)
            .then((response) => {
                // throws an error if the server responds with an error status code
                if (!response.ok) {
                    throw new Error('The data cannot be fetched');
                }
                return response.json();
            })
            .then((json) => {
                // checks if the data array in the JSON response is not empty
                if (json.data.length > 0) {
                    setDetails(json.data[0]);
                } else {
                    // throws an error if the data array is empty
                    throw new Error("Card ID not found");
                }
            })
            // if there is an error, display it in the console
            .catch(error => {
                console.error('Error reason:', error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [news_id, news_title]);

    // if there is an error, route the NotFound component
    if (error) {
        return <NotFound />;
    }

    // display the components and the card details if the details have been fetched successfully and the loading state is false
    else if (!loading && details) {
        return (
            <ParentPage>
            <div>
        
                <div className="heroNewsImg">
                    {<img src={details.article_Img_url} alt={details.article_Img_url} />}
                </div>
                <div className="backArrowIcon">
                    <Link to="/resources/news-and-insights" className="linkButton">
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                </div>
                <div className="heroNewsText">
                    {<h1>{details.article_title}</h1>}
                </div>
                <div className="newsDate">
                    {<p>{moment(details.date_published, 'MM-DD-YYYY').format('MMMM D, YYYY')}</p>}
                </div>
                <div className="newsContent">
                    {details.article_content.includes('\\n') || details.article_content.includes('@@') // If the article content includes '\n' or '@'
                        ? details.article_content
                            .replace(/\\n/g, '\n') // Replace '\\n' with '\n'
                            .replace(/@@/g, '"') // Replace '@@' with '"'
                            .split('\n') // Split the article content into paragraphs
                            .map((paragraph, index) => ( // For each paragraph add two line breaks
                                <Fragment key={index}>
                                    {paragraph}
                                    <br />
                                </Fragment>
                            ))
                        : <p>{details.article_content}</p> // Otherwise, just display the article content as a single paragraph
                    }
                </div>
            </div>
            </ParentPage>
            
        );
        
    }
}

export default NewsDetails;
