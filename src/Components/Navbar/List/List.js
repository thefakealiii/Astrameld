import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

// Import Custome Hooks
import useAxios from "./../../../CustomeHooks/useAxios/useAxios";
import usePreventRouterLinks from "./../../../CustomeHooks/usePreventRouterLinks/usePreventRouterLinks";

// Main Navbar List Sass File
import "./List.scss";

// Navbar List Component
const NavbarList = ({ setNavbarOpen }) => {
	// States
	const [path, setPath] = useState("");

	// Custome Hooks
	const { preventRouterLinks } = usePreventRouterLinks(path);

	// Fetch data
	const {
		data: { links = [], button = {} },
	} = useAxios("./Apis/navbar.json", []);

	const habdleCLick = (link, e) => {
		preventRouterLinks(e);
		setNavbarOpen(false);
		setPath(link);
	};

	const listItems = links.map((link) => {
		return (
			<li key={link.id} className="navbar-item">
				<NavLink
					exact
					to={link.link}
					className="navbar-link"
					onClick={(e) => habdleCLick(link.link, e)}
				>
					{link.text}
				</NavLink>
			</li>
		);
	});

	return (
		<ul className="navbar-list">
			{listItems}
			<NavbarBtn button={button} habdleCLick={habdleCLick} />
		</ul>
	);
};

// Navbar Btn Component
const NavbarBtn = ({ button: { text }, habdleCLick }) => {
	return (
		<li className="navbar-item navbar-btn">
			<Link to="/" onClick={(e) => habdleCLick("/", e)} className="navbar-link">
				<span className="navbar-btn-text">{text}</span>
			</Link>
		</li>
	);
};

export default NavbarList;
