// this will be a container for full screen popups. 

import React from 'react';

import styles from './FullScreenPopup.module.css';

import $ from 'jquery';



// import the close button from material-ui
import CloseIcon from '@mui/icons-material/Close';



function FullScreenPopup(props) {
    
        const { popupContent } = props;

        // when this renders, prevent scrolling on the body
        // document.body.style.overflow = "hidden";

          // function to handle clicks on the full-screen popup
    function handleClicksToClose(event) {
        // check if the target element is the full-screen-popup or one of its children with the popup class
        if (event.target.classList.contains('full-screen-popup') && !event.target.closest('.popup')) {
            props.closePopup();
        }
    }
    
        return (
            <>
            <div className={styles["full-screen-popup"]} onClick={handleClicksToClose}>
                <div className={styles.popup}>
                    <div className={styles['popup-container']}>
                    <div className={styles["popup-header"]}>
                        {/* on the left, any nav options (if present) */}
                        <div className={styles["popup-header-options"]}>
                            {props.headerOptions}
                        </div>
                        {/* on the right, a close button */}
                        <div className={styles["popup-header-close"]}>
                            <CloseIcon 
                            // resize the close button
                            sx={{
                                fontSize: 30
                            }}

                            onClick={
                                () => {
                                    props.closePopup();
                                }
                            }
                            />
                        </div>
                    </div>
                    <div className={styles["popup-content"]}>
                        {popupContent}
                    </div>
                    </div>
                    

                </div>
    
            </div>

        
            </>
    
        );
    
    }   

export default FullScreenPopup;