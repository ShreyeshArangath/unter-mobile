import { AirbnbRating } from 'react-native-ratings';
import React, {useState} from 'react'
import { Modal, Button, Alert, Text } from 'native-base';
import * as API from '../api/api_Calls'; 

export function UnterRatingModal({tripID, rater, onFinishRating}) {
    // rater is the person calling the function 

    const [rating, setRating] = useState(5);
    const [showModal, setShowModal] = useState(true);

    const ratingCompleted = (newRating) => {
        setRating(newRating)
    }

    const onModalClose = () => {
        if (rater == "driver") {
            API.SetPassengerRating(tripID, rating).then((res) => {
                console.log("rating submitted")
            }).catch((err) => {
                console.error("something went wrong when rating")
            })
        } else {
            API.SetDriverRating(tripID, rating).then((res) => {
                console.log("rating submitted")
            }).catch((err) => {
                console.error("something went wrong when rating")
            })
        }
        onFinishRating();
        setShowModal(false)
    }
      
    return (
        <Modal size={"xl"} isOpen={showModal} onClose={onModalClose} >
            <Modal.Content>
            <Modal.Header> 
                Rate your trip 
            </Modal.Header>
            <Modal.Body>
                <AirbnbRating
                    count={5}
                    onFinishRating={ratingCompleted}
                    reviews={["Terrible", "Meh", "Ok", "Good", "Unbelievable"]}
                    defaultRating={5}
                    size={30}
                    reviewSize={20}
                    selectedColor={"#ffe234"}
                    unSelectedColor={"#000000"}
                    reviewColor={"black"}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button backgroundColor={"#B53838"} onPress={onModalClose}>
                    Done
                </Button>
            </Modal.Footer>
            </Modal.Content>
      </Modal>

    )
}