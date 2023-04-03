import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParentPage from './ParentPage';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import '../styles/UpdateCard.css';

/**
 * UpdateCard component that updates a card into one of 
 * the three categories and handles the input data to be valid.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */

function UpdateCard({ path_title }) {

    // Declare state variable to track whether to show confirmation message
    const [showConfirmation, setShowConfirmation] = useState(false);

    // extracts the id and title parameters from the URL
    const { id, title } = useParams();

    // initializes a state variable called 'data' with null 
    const [data, setData] = useState(null);

    // initializes a state variable called 'loading' with true 
    const [loading, setLoading] = useState(true);

    // initializes a state variable called 'error' with false
    const [error, setError] = useState(false);

    // Declare state variables for the 'news','relevant' and 'industry' data
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsImgURL, setNewsImgURL] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [articleImgURL, setArticleImgURL] = useState();
    const [relevantTitle, setRelevantTitle] = useState("");
    const [relevantContent, setRelevantContent] = useState("");
    const [relevantImgURL, setRelevantImgURL] = useState("");
    const [articleURL, setArticleURL] = useState("");
    const [industryTitle, setIndustryTitle] = useState("");
    const [industryImgURL, setIndustryImgURL] = useState("");

    // Effect hook to fetch the card from the API
    useEffect(() => {
        if (path_title === "news-and-insights") {
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/news-and-insights/?news_id=" + id + "&&news_title=" + title)
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

                        // Set the state of the 'data' variable to the first item in the 'data' array from the JSON response
                        setData(json.data[0]);

                        // Set the state of various variables based on the data retrieved
                        setNewsTitle(json.data[0].news_title)
                        setNewsContent(json.data[0].news_content)
                        setNewsImgURL(json.data[0].news_Img_url)
                        setArticleTitle(json.data[0].article_title)
                        setArticleContent(json.data[0].article_content)
                        setArticleImgURL(json.data[0].article_Img_url)
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
        }

        else if (path_title === "relevant-news-stories") {
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/relevant-news-stories/?relevant_id=" + id + "&&relevant_title=" + title)
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

                        // Set the state of the 'data' variable to the first item in the 'data' array from the JSON response
                        setData(json.data[0]);

                        // Set the state of various variables based on the data retrieved
                        setRelevantTitle(json.data[0].relevant_title)
                        setRelevantContent(json.data[0].relevant_content)
                        setRelevantImgURL(json.data[0].relevant_Img_url)
                        setArticleURL(json.data[0].article_url)
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
        }

        else if (path_title === "industry-reports") {
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/industry-reports/?industry_id=" + id + "&&industry_title=" + title)
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

                        // Set the state of the 'data' variable to the first item in the 'data' array from the JSON response
                        setData(json.data[0]);

                        // Set the state of various variables based on the data retrieved
                        setIndustryTitle(json.data[0].industry_title)
                        setIndustryImgURL(json.data[0].industry_Img_url)
                        setArticleURL(json.data[0].article_url)
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
        }
    }, [path_title, id, title]);

    // Function to update the card
    function updateCard() {

        if (path_title === "news-and-insights") {

            // Create a new FormData object
            const formData = new FormData();

            // Add data to the formData object using the append method
            formData.append('news_title', newsTitle);
            formData.append('news_content', newsContent);
            formData.append('news_Img_url', newsImgURL);
            formData.append('article_title', articleTitle);
            formData.append('article_content', articleContent);
            formData.append('article_Img_url', articleImgURL);
            formData.append('date_published', new Date().toLocaleDateString('en-US'));

            // Add the card to the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/add", {
                method: 'POST',
                body: formData
            })

            // Delete the previous card from the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/delete/?news_id=" + id, {
                method: 'POST',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('The data cannot be updated');
                    }
                    alert('The card has been updated successfully. Please go back to see the new card.');
                })
                .catch((error) => {
                    console.error('Error reason:', error);
                });
        }

        else if (path_title === "relevant-news-stories") {

            // Create a new FormData object
            const formData = new FormData();

            // Add data to the formData object using the append method
            formData.append('relevant_title', relevantTitle);
            formData.append('relevant_content', relevantContent);
            formData.append('relevant_Img_url', relevantImgURL);
            formData.append('article_url', articleURL);
            formData.append('date_published', new Date().toLocaleDateString('en-US'));

            // Add the card to the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/add", {
                method: 'POST',
                body: formData
            })

            // Delete the previous card from the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/delete/?relevant_id=" + id, {
                method: 'POST',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('The data cannot be updated');
                    }
                    alert('The card has been updated successfully. Please go back to see the new card.');
                })
                .catch((error) => {
                    console.error('Error reason:', error);
                });
        }

        else if (path_title === "industry-reports") {

            // Create a new FormData object
            const formData = new FormData();

            // Add data to the formData object using the append method
            formData.append('industry_title', industryTitle);
            formData.append('industry_Img_url', industryImgURL);
            formData.append('article_url', articleURL);

            // Add the card to the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/add", {
                method: 'POST',
                body: formData
            })

            // Delete the previous card from the API
            fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path_title + "/delete/?industry_id=" + id, {
                method: 'POST',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('The data cannot be updated');
                    }
                    alert('The card has been updated successfully. Please go back to see the new card.');
                })
                .catch((error) => {
                    console.error('Error reason:', error);
                });
        }
    }

    // Function to check if there are empty fields
    function handleUpdate() {

        if (path_title === "news-and-insights") {
            if (newsTitle === "" || newsContent === "" || newsImgURL === "" ||
                articleTitle === "" || articleContent === "" || articleImgURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
        else if (path_title === "relevant-news-stories") {
            if (relevantTitle === "" || relevantContent === "" || relevantImgURL === "" ||
                articleURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
        else if (path_title === "industry-reports") {
            if (industryTitle === "" || industryImgURL === "" || articleURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
    }

    // If the user clicks 'yes', it will enter the 'addCard' function
    function handleConfirmation(value) {
        setShowConfirmation(false);
        if (value === 'yes') {
            updateCard();
        }
    }

    // Function to check the number of the characters
    function maxNewsTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setNewsTitle(inputValue);
        }
    }

    // Function to check the number of the characters
    function maxNewsContentChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 140) {
            setNewsContent(inputValue);
        }
    }

    // Function to check the number of the characters
    function maxArticleTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 110) {
            setArticleTitle(inputValue);
        }
    }

    // Function to replace '\n' with '\\n' (for new line)
    function replaceSymbol(e) {
        const inputValue = e.target.value;
        const replacedValue = inputValue.replace(/\n/g, '\\n'); //Replace '\n' with '\\n'
        setArticleContent(replacedValue);
    }

    // Function to check the number of the characters 
    function maxRelevantTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setRelevantTitle(inputValue);
        }
    }

    // Function to check the number of the characters 
    function maxRelevantContentChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 140) {
            setRelevantContent(inputValue);
        }
    }

    // Function to check the number of the characters 
    function maxIndustryTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setIndustryTitle(inputValue);
        }
    }

    // if there is an error, route the NotFound component
    if (error) {
        return <NotFound />;
    }

    // else display the components and the card data if the data have been fetched and updated successfully and the loading state is false
    else if (!loading && data) {
        return (
            <ParentPage>
            <div>
                {path_title === "news-and-insights" &&
                    <div>
                      
                        <div className="updateHero">
                            <img alt="UpdateCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/updateCardHero.jpg" />
                        </div>
                        <div className="updateTitle">
                            <h1>Update card on the <span className="updatePathTitle">News and Insights</span> page</h1>
                        </div>
                        <div className="updateForm">
                            <label>
                                Card Title <span className="required">* Required (No more than 65 characters)</span>
                                <input type="text" defaultValue={data.news_title}
                                    onChange={(e) => maxNewsTitleChar(e)} maxLength={65} />
                            </label>
                            <label>
                                Card Content <span className="required">* Required (No more than 140 characters)</span>
                                <textarea name="cardContent" rows="2" defaultValue={data.news_content}
                                    onChange={(e) => maxNewsContentChar(e)} maxLength={140} />
                            </label>
                            <label>
                                URL Address of Card Image <span className="required">* Required (Please update a valid image URL address)</span>
                                <input type="text" defaultValue={data.news_Img_url}
                                    onChange={(e) => setNewsImgURL(e.target.value)} />
                            </label>
                            <label>
                                Article Title <span className="required">* Required (No more than 110 characters)</span>
                                <input type="text" defaultValue={data.article_title}
                                    onChange={(e) => maxArticleTitleChar(e)} maxLength={110} />
                            </label>
                            <label>
                                Article Content <span className="required">* Required</span>
                                <textarea name="articleContent" rows="10" defaultValue={data.article_content.replace(/\\n/g, '\n').replace(/@@/g, '"')}
                                    onChange={replaceSymbol} />
                            </label>
                            <label>
                                URL Address of Article Image<span className="required">* Required (Please update a valid image URL address)</span>
                                <input type="text" defaultValue={data.article_Img_url}
                                    onChange={(e) => setArticleImgURL(e.target.value)} />
                            </label>
                            <div className="updateBtns">
                                <Link to="/resources/news-and-insights" className="link">
                                    <button>Back</button>
                                </Link>
                                <button onClick={handleUpdate}>Update Card</button>
                            </div>
                        </div>
                        {showConfirmation && (
                            <div className="updateNotification">
                                <p>Are you sure you want to update the card?</p>
                                <div>
                                    <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                    <button onClick={() => handleConfirmation('no')}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {path_title === "relevant-news-stories" &&
                    <div>
                   
                        <div className="updateHero">
                            <img alt="UpdateCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/updateCardHero.jpg" />
                        </div>
                        <div className="updateTitle">
                            <h1>Update card on the <span className="updatePathTitle">Relevant News Stories</span> page</h1>
                        </div>
                        <div className="updateForm">
                            <label>
                                Card Title <span className="required">* Required (No more than 65 characters)</span>
                                <input type="text" defaultValue={data.relevant_title}
                                    onChange={(e) => maxRelevantTitleChar(e)} maxLength={65} />
                            </label>
                            <label>
                                Card Content <span className="required">* Required (No more than 140 characters)</span>
                                <textarea name="cardContent" rows="2" defaultValue={data.relevant_content}
                                    onChange={(e) => maxRelevantContentChar(e)} maxLength={140} />
                            </label>
                            <label>
                                URL Address of Card Image <span className="required">* Required (Please update a valid image URL address)</span>
                                <input type="text" defaultValue={data.relevant_Img_url}
                                    onChange={(e) => setRelevantImgURL(e.target.value)} />
                            </label>
                            <label>
                                URL Address of article <span className="required">* Required (Please update a valid article URL address)</span>
                                <input type="text" defaultValue={data.article_url}
                                    onChange={(e) => setArticleURL(e.target.value)} />
                            </label>
                            <div className="updateBtns">
                                <Link to="/resources/relevant-news-stories" className="link">
                                    <button>Back</button>
                                </Link>
                                <button onClick={handleUpdate}>Update Card</button>
                            </div>
                        </div>
                        {showConfirmation && (
                            <div className="updateNotification">
                                <p>Are you sure you want to update the card?</p>
                                <div>
                                    <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                    <button onClick={() => handleConfirmation('no')}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                }
                {path_title === "industry-reports" &&
                    <div>
                        
                        <div className="updateHero">
                            <img alt="UpdateCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/updateCardHero.jpg" />
                        </div>
                        <div className="updateTitle">
                            <h1>Update card on the <span className="updatePathTitle">Industry Reports</span> page</h1>
                        </div>
                        <div className="updateForm">
                            <label>
                                Card Title <span className="required">* Required (No more than 65 characters)</span>
                                <input type="text" defaultValue={data.industry_title}
                                    onChange={(e) => maxIndustryTitleChar(e)} maxLength={65} />
                            </label>
                            <label>
                                URL Address of Card Image <span className="required">* Required (Please update a valid image URL address)</span>
                                <input type="text" defaultValue={data.industry_Img_url}
                                    onChange={(e) => setIndustryImgURL(e.target.value)} />
                            </label>
                            <label>
                                URL Address of partner's script <span className="required">* Required (Please update a valid URL address)</span>
                                <input type="text" defaultValue={data.article_url}
                                    onChange={(e) => setArticleURL(e.target.value)} />
                            </label>
                            <div className="updateBtns">
                                <Link to="/resources/industry-reports" className="link">
                                    <button>Back</button>
                                </Link>
                                <button onClick={handleUpdate}>Update Card</button>
                            </div>
                        </div>
                        {showConfirmation && (
                            <div className="updateNotification">
                                <p>Are you sure you want to update the card?</p>
                                <div>
                                    <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                    <button onClick={() => handleConfirmation('no')}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
            </ParentPage>
        );
    }

}

export default UpdateCard;
