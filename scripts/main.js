var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var ARROW_BUTTONS = '[data-image-button="button"]';

var HIDDEN_DETAIL_CLASS ='hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27; 

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}  

function showDetails(){ 'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function setDetails(imageUrl, titleText) {  'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {  'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {  'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {  'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {  'use strict';
    thumb.addEventListener('click', function(event) { 
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {  'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function addKeyHandler(){
    'use strict';
    document.body.addEventListener('keyup', function(event){
        event.preventDefault();
        console.log(event.keyCode);
        if(event.keyCode == ESC_KEY){
            hideDetails();
        }
    });
}

function arrowButtons() {
    'use strict';
    var getTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    var button = document.querySelectorAll(ARROW_BUTTONS);
    var buttonArr = [].slice.call(button);
    var leftButton = buttonArr[0];
    var rightButton = buttonArr[1];
    var thumbnailArr = getThumbnailsArray();
    var currImage;
    var currTitle;

    leftButton.addEventListener('click', function(event){
        event.preventDefault();

        for(var i = 0; i < thumbnailArr.length; i++){
            if(thumbnailArr[i].getAttribute("data-image-title") == getTitle.textContent){
                if(i == 0){
                    currImage = imageFromThumb(thumbnailArr.slice(-1));
                    currTitle = titleFromThumb(thumbnailArr.slice(-1));
                    setDetails(currImage, currTitle);
                    break;
                }
                else{
                    currImage = imageFromThumb(thumbnailArr[i-1]);
                    currTitle = titleFromThumb(thumbnailArr[i-1]);
                    setDetails(currImage, currTitle);
                }
            }
        }
    });

    rightButton.addEventListener('click', function(event){
        event.preventDefault();

        for(var i = 0; i < thumbnailArr.length; i++){
            if(thumbnailArr[i].getAttribute("data-image-title") == getTitle.textContent){
                if (i == thumbnailArr.length - 1){
                    currImage = imageFromThumb(thumbnailArr[0]);
                    currTitle = titleFromThumb(thumbnailArr[0]);
                    setDetails(currImage, currTitle);
                }
                else{
                    currImage = imageFromThumb(thumbnailArr[i+1]);
                    currTitle = titleFromThumb(thumbnailArr[i+1]);
                    setDetails(currImage, currTitle);
                    break;
                }
            }
        }
    });

}



function initializeEvents() {  'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyHandler();
    arrowButtons();
}

initializeEvents();
