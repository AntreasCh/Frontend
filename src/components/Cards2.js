import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from './ResourcesHero';
import moment from 'moment';
import '../styles/Cards.css';

/**
 * Cards component that displays a list of cards with news articles. It 
 * includes functionality to search and sort the cards, as well as 
 * pagination to show a limited number of cards per page.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function Cards({ path_title, title }) {

    // State variable for storing the list of cards
    const [cards, setCards] = useState([]);

    // State variable for tracking whether the cards are currently being loaded
    const [loading, setLoading] = useState(true);

    // State variable for tracking the current page number of the card list
    const [page, setPage] = useState(1);

    // State variable for storing the search query for filtering cards by title, content and date published
    const [searchCard, setSearchCard] = useState('');

    // State variable for storing the current sort order of the card list (newest or oldest)
    const [sortBy1, setsortBy1] = useState('newest');

    // State variable for storing the current sort order of the card list (ascending or descending)
    const [sortBy2, setsortBy2] = useState('ascending');

    // Effect hook to fetch the cards from the API
    useEffect(() => {
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title)
            .then((response) => response.json())
            .then((json) => {
                setCards(json.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error reason:', error);
                setLoading(false);
            });
    }, [path_title]);

    let searchCards = [];

    if (path_title === "news-and-insights") {

        // Function to filter the cards based on the search query
        searchCards = (value) =>
            value.news_title.toLowerCase().includes(searchCard.toLowerCase()) ||
            value.news_content.toLowerCase().includes(searchCard.toLowerCase()) ||
            moment(value.date_published, 'MM-DD-YYYY').toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase().includes(searchCard.toLowerCase());
    }
    else if (path_title === "relevant-news-stories") {

        // Function to filter the cards based on the search query
        searchCards = (value) =>
            value.relevant_title.toLowerCase().includes(searchCard.toLowerCase()) ||
            value.relevant_content.toLowerCase().includes(searchCard.toLowerCase()) ||
            moment(value.date_published, 'MM-DD-YYYY').toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase().includes(searchCard.toLowerCase());
    }
    else if (path_title === "industry-reports") {

        // Function to filter the cards based on the search query
        searchCards = (value) =>
            value.industry_title.toLowerCase().includes(searchCard.toLowerCase());
    }

    // Filter the cards based on the search query
    const filteredCards = cards.filter(searchCards);

    // Sort the cards by date published (newest or oldest)
    if (sortBy1 === 'newest') {
        filteredCards.sort((a, b) => moment(b.date_published, 'MM-DD-YYYY') - moment(a.date_published, 'MM-DD-YYYY'));
    }
    else if (sortBy1 === 'oldest') {
        filteredCards.sort((a, b) => moment(a.date_published, 'MM-DD-YYYY') - moment(b.date_published, 'MM-DD-YYYY'));
    }

    // Sort the cards by industry_title (ascending or descending)
    if (sortBy2 === 'ascending') {
        filteredCards.sort((a, b) =>
            (a.industry_title && b.industry_title) ? a.industry_title.localeCompare(b.industry_title) : 0
        );
    }
    else if (sortBy2 === 'descending') {
        filteredCards.sort((a, b) =>
            (b.industry_title && a.industry_title) ? b.industry_title.localeCompare(a.industry_title) : 0
        );
    }

    // Event handlers to update the search query and sorting method when the user interacts with the corresponding UI elements
    const onChangeSearch = (event) => {
        setSearchCard(event.target.value);
    };

    const onChangesortBy1 = (event) => {
        setsortBy1(event.target.value);
    };

    const onChangesortBy2 = (event) => {
        setsortBy2(event.target.value);
    };

    // Calculate the start and end index of the cards to be displayed on the current page
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;

    let listOfCards = [];

    if (path_title === "news-and-insights") {

        // Map the filtered and sorted cards to HTML elements representing each card
        listOfCards = filteredCards.slice(startIndex, endIndex).map((value) => {
            return (
                <div className="card1" key={value.news_id}>
                    <Link to={"/resources/news-and-insights/" + value.news_id + "/" + value.news_title} className="linkCard">
                        <div className="imageCard">
                            <img src={value.news_Img_url} alt={value.news_Img_url} />
                        </div>
                        <div>
                            <p><span className="date">{moment(value.date_published, 'MM-DD-YYYY').format('MMMM D, YYYY')}</span></p>
                        </div>
                        <div className="tagsPosition1">
                            <h4>{value.news_title}</h4>
                            <p>{value.news_content}</p>
                        </div>
                    </Link>
                </div>
            );
        });
    }

    else if (path_title === "relevant-news-stories") {

        // Map the filtered and sorted cards to HTML elements representing each card
        listOfCards = filteredCards.slice(startIndex, endIndex).map((value) => {
            return (
                <div className="card1" key={value.relevant_id}>
                    <Link to={value.article_url} className="linkCard">
                        <div className="imageCard">
                            <img src={value.relevant_Img_url} alt={value.relevant_Img_url} />
                        </div>
                        <div>
                            <p><span className="date">{moment(value.date_published, 'MM-DD-YYYY').format('MMMM D, YYYY')}</span></p>
                        </div>
                        <div className="tagsPosition1">
                            <h4>{value.relevant_title}</h4>
                            <p>{value.relevant_content}</p>
                        </div>
                    </Link>
                </div>
            );
        });
    }

    else if (path_title === "industry-reports") {

        // Map the filtered and sorted cards to HTML elements representing each card
        listOfCards = filteredCards.slice(startIndex, endIndex).map((value) => {
            return (
                <div className="card2" key={value.industry_id}>
                    <Link to={value.article_url} className="linkCard">
                        <div className="imageCard">
                            <img src={value.industry_Img_url} alt={value.industry_Img_url} />
                        </div>
                        <div className="tagsPosition2">
                            <h4>{value.industry_title}</h4>
                        </div>
                    </Link>
                </div>
            );
        });
    }

    // Function to handle clicking on the "NEXT" button
    const showNext = () => {
        setPage(page + 1);
    };

    // Function to handle clicking on the "PREVIOUS" button
    const showPrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Function to add the appropriate placeholder
    const searchSection = ((title === "News and Insights" || title === "Relevant News Stories") && (
        <label>Search <input type="text" value={searchCard} onChange={onChangeSearch} placeholder="Search News by Title, Description or Date..." className="search1" /></label>
    )) || (title === "Industry Reports" && (
        <label>Search <input type="text" value={searchCard} onChange={onChangeSearch} placeholder="Search Reports by Title..." className="search2" /></label>
    ));

    // Function to add the appropriate label and option values
    const sortSection = ((title === "News and Insights" || title === "Relevant News Stories") && (
        <div className="position1">
            <label>Sort by <select className="sort1" onChange={onChangesortBy1}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            </label>
        </div>
    )) || (title === "Industry Reports" && (
        <div className="position1">
            <label>Sort Title by <select className="sort2" onChange={onChangesortBy2}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
            </label>
        </div>
    ));

    return (
        <div>
            <Hero />
            <div className="cardsSection">
                <h1>{title}</h1>
                {searchSection}
                {sortSection}
                {loading && <p>Loading...</p>}
                <div className="newsCard">{listOfCards}</div>
                <div className="buttons">
                    {!loading && <button onClick={showPrevious} disabled={page === 1}>PREVIOUS</button>}
                    {!loading && <button onClick={showNext} disabled={endIndex >= filteredCards.length}>NEXT</button>}
                </div>
            </div>
        </div>
    );
}

export default Cards;