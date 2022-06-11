import {api} from '../utils/Api'
import {useEffect, useState} from "react";
import Card from './Card'

function Main(props) {
	const [userAvatar, setUserAvatar] = useState("");
	const [userName, setUserName] = useState("");
	const [userDescription, setUserDescription] = useState("");
	const [cards, setCards] = useState([]);
	
	
	useEffect(() => {
		Promise.all([api.getInitialUser(), api.getInitialCards()])
				.then(([userData, cardsArray]) => {
					setUserAvatar(userData.avatar);
					setUserName(userData.name);
					setUserDescription(userData.about);
					setCards(
							cardsArray.map((card) => ({
								name: card.name,
								link: card.link,
								likes: card.likes.length,
								_id: card._id,
							}))
					);
				})
				.catch((err) => console.log(err));
	}, []);
	
	
	return (
			<main className="content">
				<section className="profile">
					<button className="profile__avatar-edit" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={userAvatar} alt={userName}/>
					</button>
					<div className="profile__info">
						<h1 className="profile__title">{userName}</h1>
						<button className="profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
						<h3 className="profile__subtitle">{userDescription}</h3>
					</div>
					<button className="profile__btn-add" type="button" onClick={props.onAddPlace}></button>
				</section>
				<section className="cards">
					<ul className="cards__list"></ul>
				</section>
				<section className="cards">
					<ul className="cards__list">
						{
							cards.map((card) => (
									<Card
											{...card}
											key={card._id}
											onCardClick={props.handleCardClick}
									/>
							))
						}
					</ul>
				</section>
			</main>
	)
}

export default Main