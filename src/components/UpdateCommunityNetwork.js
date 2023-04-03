import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import '../styles/UpdateCommunityNetwork.css';

/**
 * UpdateCommunityNetwork component that updates the Resources
 * text and handles the input data to be valid.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function UpdateCommunityNetwork() {

    // Declare state variable to track whether to show confirmation message
    const [showConfirmation, setShowConfirmation] = useState(false);

    // extracts the id and title parameters from the URL
    const { main_id } = useParams();

    // initializes a state variable called 'data' with null 
    const [data, setData] = useState(null);

    // initializes a state variable called 'loading' with true 
    const [loading, setLoading] = useState(true);

    // initializes a state variable called 'error' with false
    const [error, setError] = useState(false);

    // Declare state variables for the 'category_text' data
    const [mainText, setMainText] = useState("");

    // Effect hook to fetch the card from the API
    useEffect(() => {

        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/community&network/")
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
                    setMainText(json.data[0].main_text)
                } else {
                    // throws an error if the data array is empty
                    throw new Error("Data ID not found");
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
    }, [main_id]);

    // Function to update the text
    function updateText() {

        // Create a new FormData object
        const formData = new FormData();

        // Add data to the formData object using the append method
        formData.append('main_text', mainText);

        // Add the card to the API
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/community&network/add", {
            method: 'POST',
            body: formData
        })

        // Delete the previous card from the API
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/community&network/delete/?main_id=" + main_id, {
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

    // Function to check if the field is empty
    function handleUpdate() {

        if (mainText === "") {
            setShowConfirmation(false);
            alert("Please fill out the required field.");
            return;
        } else {
            setShowConfirmation(true);
        }
    }

    // If the user clicks 'yes', it will enter the 'addCard' function
    function handleConfirmation(value) {
        setShowConfirmation(false);
        if (value === 'yes') {
            updateText();
        }
    }

    // Function to replace '\n' with '\\n' (for new line)
    function replaceSymbol(e) {
        const inputValue = e.target.value;
        const replacedValue = inputValue.replace(/\n/g, '\\n'); //Replace '\n' with '\\n'
        setMainText(replacedValue);
    }

    // if there is an error, route the NotFound component
    if (error) {
        return <NotFound />;
    }

    // else display the components and the text if the data have been fetched and updated successfully and the loading state is false
    else if (!loading && data) {
        return (
            <div>
                <div>
                  
                    <div className="updateCommunityNetworkHero">
                        <img alt="UpdateCommunityNetworkHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/updateResourcesTextHero.jpg" />
                    </div>
                    <div className="updateCommunityNetworkTitle">
                        <h1>Update the text on the <span className="updateCommunityNetworkPathTitle">Community & Network</span> page</h1>
                    </div>
                    <div className="updateCommunityNetworkForm">
                        <label>
                            Text content <span className="requiredCommunityNetwork">* Required</span>
                            <textarea name="textContent" rows="10" defaultValue={data.main_text.replace(/\\n/g, '\n').replace(/@@/g, '"')}
                                onChange={replaceSymbol} />
                        </label>
                        <div className="updateCommunityNetworkBtns">
                            <Link to="/community-and-network" className="communitynetworkLink">
                                <button>Back</button>
                            </Link>
                            <button onClick={handleUpdate}>Update Text</button>
                        </div>
                    </div>
                    {showConfirmation && (
                        <div className="updateCommunityNetworkNotification">
                            <p>Are you sure you want to update the text?</p>
                            <div>
                                <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                <button onClick={() => handleConfirmation('no')}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}

export default UpdateCommunityNetwork;
