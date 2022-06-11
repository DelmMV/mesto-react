import React from "react";

function PopupWithForm(props) {
	return (
			<section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
				<div className="popup__container">
					<button className="popup__btn-close popup__btn-close_type_add" onClick={props.onClose} type="button"></button>
					<h3 className="popup__title">{props.title}</h3>
					<form className={`popup__form popup__form_type_${props.name}`} name="popup_form_add" noValidate>
						{props.children}
						<button className={`popup__btn popup__btn-save popup__btn-save_type_${props.name}`} type="submit">
							{props.textBtn}</button>
					</form>
				</div>
			</section>
	)
}

export default PopupWithForm
