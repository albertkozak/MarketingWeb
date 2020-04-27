import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import QRCode from './screens/QRCode';
import Register from './screens/authentication/Register';
import Login from './screens/authentication/Login';
import Footer from './components/Footer';
import Export from './screens/Export';
import Roles from './screens/Roles';
import AddEvent from './components/events/AddEvent';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/Home">
					<Home />
				</Route>
				<Route path="/QRCode">
					<QRCode />
				</Route>
				<Route path="/Roles">
					<Roles />
				</Route>
				<Route path="/Export">
					<Export />
				</Route>
				<Route path="/Login">
					<Login />
				</Route>
				<Route path="/Register">
					<Register />
				</Route>
				<Route path="/addevent">
					<AddEvent />
				</Route>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
