import React from "react";
import Header from './Header'
import Footer from './Footer'
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function App() {
	const [isEditAvatarPopupOpen, setIsAvatarPopup] = React.useState(false);
	const [isEditProfilePopupOpen, setIsProfilePopup] = React.useState(false);
	const [isAddPlacePopupOpen, setIsPlacePopup] = React.useState(false);
	const [selectedCard, setIsSelectedCard] = React.useState({});
	
	const [currentUser, setCurrentUser] = React.useState({});
	const [initialCards, setCards] = React.useState([]);
	
	React.useEffect(() => {
		api.getInitialUser().then((userData) => {
			setCurrentUser(userData)
		}).catch((err) => console.log(err));
		api.getInitialCards().then((cardsArray) => {
			setCards(cardsArray.slice(0, 12))
		}).catch((err) => console.log(err));
	}, [])
	
	
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		}).catch((err) => console.log(err));
	}
	
	function handleCardDelete(card) {
		
		api.removeCard(card._id).then(() => {
			setCards((item) => item.filter((c) => c._id !== card._id));
		}).catch((err) => console.log(err));
	}
	
	function handleUpdateUser(items) {
		api
				.setUserInfo(items)
				.then((res) => {
					setCurrentUser(res);
					closeAllPopups();
				})
				.catch((error) => {
					console.log(error);
				})
	}
	
	function handleUpdateAvatar(data) {
		api.updateAvatar(data).then((res) => {
			setCurrentUser(res)
		}).catch((error) => {
			console.log(error);
		});
		closeAllPopups();
	}
	
	function handleAddPlaceSubmit(data) {
		api.addCard(data.name, data.link).then((res) => {
			setCards([res, ...initialCards])
		}).catch((error) => {
			console.log(error);
		});
		closeAllPopups();
	}
	
	
	function handleClickEditProfile() {
		setIsProfilePopup(true);
	}
	
	function handleClickAddPlace() {
		setIsPlacePopup(true);
	}
	
	function handleCardClick(card) {
		setIsSelectedCard(card);
	}
	
	function handleClickEditAvatar() {
		setIsAvatarPopup(true);
	}
	
	function closeAllPopups() {
		setIsProfilePopup(false);
		setIsPlacePopup(false);
		setIsAvatarPopup(false);
		setIsSelectedCard({});
	}
	
	return (
			<CurrentUserContext.Provider value={currentUser}>
				<Header/>
				<Main
						cards={initialCards}
						onEditAvatar={handleClickEditAvatar}
						onEditProfile={handleClickEditProfile}
						onAddPlace={handleClickAddPlace}
						handleCardClick={handleCardClick}
						handleCardLike={handleCardLike}
						handleCardDelete={handleCardDelete}
				/>
				<Footer/>
				<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
				/>
				<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
				/>
				<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
				/>
				<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
				/>
			</CurrentUserContext.Provider>
	);
}

export default App;
