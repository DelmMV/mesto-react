import logo from '../images/logo.svg'

function Header() {
	return (
			<header className="header">
				<img alt="Логотип" className="header__logo-img" src={logo}/>
			</header>
	);
}

export default Header