# Dog Research Web App
# React + TypeScript + Vite

## Overview
Welcome. This single page web app was made to help prospective dog owners research and keep notes on breeds they are interested in purchasing.

## Frontend:
Tech used: HTML, CSS, TypeScript, and React Vite.

## Backend:
The backend is stored in a separate repository [here](https://github.com/PatrickDonohoe/flask-dog).
Tech used: Python and Flask.

## How to run the application:
After cloning the repository, enter:
```
cd vite-dog
npm i
npm run dev
```
## Data Flow and Functionality:
Users can navigate from the homepage to the *Search* page to begin researching dog breeds. When the user selects a breed, the id for the breed is retrieved and ready for submission. After the user clicks the submit button, an API call is made to retrieve the breed information and picture. The data in the returned JSON object is passed as props to the *TWResultsTile* component.
The user can the add notes about the breed and choose to save it as a favorite or choose another breed. If the breed is saved as a favorite; the user ID, dog ID, and the user's notes are all saved in the database.
The user can also navigate to the *Favorites* page to look at their previously selected favorite breeds. Upon loading the page, an API call is made to the database to retrieve the favorited breeds for that user. The information is passed as props to the *FavoritesTile* component via a mapped list. The user can then edit their comments or delete the breed from their favorites list.
