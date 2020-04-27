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
import AddUser from './components/users/AddUser';
import ViewEvent from './screens/ViewEvent'
import { AuthProvider } from './screens/authentication/Auth'
import PrivateRoute from './screens/authentication/PrivateRoute'

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Navbar />
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/home" component={Home} />
						<PrivateRoute exact path="/qrcode" component={QRCode} />
						<PrivateRoute exact path="/roles" component={Roles} />
						<PrivateRoute exact path="/export" component={Export} />
						<PrivateRoute exact path="/addevent" component={AddEvent} />
						<PrivateRoute exact path="/adduser" component={AddUser} />
						<PrivateRoute exact path="/event" component={ViewEvent} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</div>
			</Router>
			<Footer />
		</AuthProvider>
	)
}

// function App() {
// 	return (
// 		<div>
// 			<Router>
// 				<Navbar />
// 				<Route exact path="/">
// 					<Home />
// 				</Route>
// 				<Route path="/Home">
// 					<Home />
// 				</Route>
// 				<Route path="/QRCode">
// 					<QRCode />
// 				</Route>
// 				<Route path="/Roles">
// 					<Roles />
// 				</Route>
// 				<Route path="/Export">
// 					<Export />
// 				</Route>
// 				<Route path="/Login">
// 					<Login />
// 				</Route>
// 				<Route path="/Register">
// 					<Register />
// 				</Route>
// 				<Route path="/addevent">
// 					<AddEvent />
// 				</Route>
// 				<Route path="/adduser">
// 					<AddUser />
// 				</Route>
// 				<Route path="/event">
// 					<ViewEvent />
// 				</Route>
// 			</Router>
// 			<Footer />
// 		</div>
// 	);
// }

export default App;
