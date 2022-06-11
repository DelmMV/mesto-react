import imgTrash from "../images/trash.svg"
import React from "react";

function Card(card) {
	function handleClick() {
		card.onCardClick({name: card.name, link: card.link})
	}

	return (
			<li className="card" key={card._id}>
				<img alt="кнопка закрыть" className="card__delete-btn" src={imgTrash}/>
				<img alt={card.name} className="card__image" src={card.link} onClick={handleClick}/>
				<div className="card__description">
					<h2 className="card__title">{card.name}</h2>
					<div className="card__like-box">
						<button className="card__like-btn" type="button"></button>
						<p className="cards__like-count">{card.likes}</p>
					</div>
				</div>
			</li>
	)
}

export default Card