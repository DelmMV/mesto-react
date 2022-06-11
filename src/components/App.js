import React from "react";
import Header from './Header'
import Footer from './Footer'
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
	const [isEditAvatarPopupOpen, setIsAvatarPopup] = React.useState(false);
	const [isEditProfilePopupOpen, setIsProfilePopup] = React.useState(false);
	const [isAddPlacePopupOpen, setIsPlacePopup] = React.useState(false);
	const [selectedCard, setIsSelectedCard] = React.useState({});
	
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
			<>
				<Header/>
				<Main
						onEditAvatar={handleClickEditAvatar}
						onEditProfile={handleClickEditProfile}
						onAddPlace={handleClickAddPlace}
						handleCardClick={handleCardClick}
				/>
				<Footer/>
				<PopupWithForm
						name="user"
						title="Редактировать профиль"
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						textBtn="Сохранить"
				>
					<input
							className="popup__input popup__input_type_name"
							id="name-input"
							name="name"
							type="text"
							placeholder="Имя"
							minLength="2"
							maxLength="40"
							required
					/>
					<span className="name-input-error popup__input-error"></span>
					<input
							className="popup__input popup__input_type_description"
							id="who-input"
							name="about"
							type="text"
							placeholder="О себе"
							minLength="2"
							maxLength="200"
							required
					/>
					<span className="who-input-error popup__input-error"></span>
				</PopupWithForm>
				<PopupWithForm
						name="place"
						title="Новое Место"
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						textBtn="Создать"
				>
					<input
							className="popup__input popup__input_type_names"
							id="names-input"
							name="names-input"
							type="text"
							placeholder="Названия"
							minLength="2"
							maxLength="30"
							required
					/>
					<span className="names-input-error popup__input-error"></span>
					<input
							className="popup__input popup__input_type_image-url"
							id="image-url"
							name="image-url"
							type="url"
							placeholder="Ссылка на картинку"
							required
					/>
					<span className="who-input-error popup__input-error"></span>
				</PopupWithForm>
				<PopupWithForm
						name="avatar"
						title="Обновить аватар"
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						textBtn="Сохранить"
				>
					<input
							className="popup__input popup__input_type_profile"
							id="profile-input"
							name="avatar"
							type="url"
							placeholder="Ссылка на картинку"
							required
					/>
					<span className="names-input-error popup__input-error"></span>
				</PopupWithForm>
				<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
				/>
			</>
	);
}

export default App;
