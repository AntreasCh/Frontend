import React, { useState } from 'react';
import '../styles/DeleteCard.css';

/**
 * DeleteCard component that deletes a specific card from the API.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function DeleteCard({ path, id, length }) {

    // Declare state variable to track whether to show confirmation message
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Function to delete the card
    function deleteCard() {

        // Delete the card to the API
        fetch("http://unn-w20017219.newnumyspace.co.uk/ic3/api/resources/" + path + id, {
            method: 'POST',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('The data cannot be fetched');
                }
                alert('The card has been deleted successfully. Please refresh the screen.');
            })
            .catch((error) => {
                console.error('Error reason:', error);
            });
    }

    // If the user clicks on the 'Delete' button, it shows the notification message
    function handleDelete() {
        setShowConfirmation(true);
    }

    // If the user clicks 'yes', it will enter the 'deleteCard' function
    function handleConfirmation(value) {
        setShowConfirmation(false);
        if (value === 'yes') {
            deleteCard();
        }
    }

    return (
        <div>
            <div className="delete">
                {length === 1 ? (
                    <button disabled className="disabledButton">
                        <i className="fa-sharp fa-solid fa-trash"></i> Delete Card
                    </button>
                ) : (
                    <button onClick={handleDelete} className="deleteButton">
                        <i className="fa-sharp fa-solid fa-trash"></i> Delete Card
                    </button>
                )}
            </div>
            {showConfirmation && (
                <div className="deleteNotification">
                    <p>Are you sure you want to delete this card?</p>
                    <div>
                        <button onClick={() => handleConfirmation('yes')}>Yes</button>
                        <button onClick={() => handleConfirmation('no')}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteCard;
