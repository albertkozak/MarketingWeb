import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import QRCode from './screens/QRCode';
import Register from './screens/authentication/Register';
import Login from './screens/authentication/Login';
import Footer from './components/Footer';
import Export from './screens/Export';
import Roles from './screens/Roles';
import AddEvent from './components/forms/AddEvent';
import EditEvent from './components/forms/EditEvent';
import EditUser from './components/forms/EditUser';
import Profile from './screens/Profile';
import ForgotPassword from './screens/ForgotPassword';
import ViewEvent from './screens/ViewEvent';
import { AuthProvider } from './screens/authentication/Auth';
import PrivateRoute from './screens/authentication/PrivateRoute';
import AddVenue from './components/forms/AddVenue';
import AddVendor from './components/forms/AddVendor';
import AddVendorProduct from './components/forms/AddVendorProduct';
import EditVendor from './components/forms/EditVendor';
import EditVenue from './components/forms/EditVenue';
import Vendors from './screens/Vendors';
import VendorDetailProductList from './components/products/VendorDetailProductList';
import DeleteEvent from './components/forms/DeleteEvent'
import ViewVendor from './screens/ViewVendor'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Main />
			</Router>
			<Footer />
		</AuthProvider>
	);
}

export const Main = withRouter(({ location }) => {
	return (
		<div>
			{location.pathname != '/login' &&
			location.pathname != '/register' &&
			location.pathname != '/forgotpassword' && <Navbar />}
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/home" component={Home} />
				<PrivateRoute exact path="/qrcode" component={QRCode} />
				<PrivateRoute exact path="/roles" component={Roles} />
				<PrivateRoute exact path="/export" component={Export} />
				<PrivateRoute exact path="/addevent" component={AddEvent} />
				<PrivateRoute exact path="/editevent" component={EditEvent} />
				<PrivateRoute exact path="/deleteevent" component={DeleteEvent} />
				<PrivateRoute exact path="/edituser" component={EditUser} />
				<PrivateRoute exact path="/addvenue" component={AddVenue} />
				<PrivateRoute exact path="/editvenue" component={EditVenue} />
				<PrivateRoute exact path="/addvendor" component={AddVendor} />
				<PrivateRoute exact path="/editvendor" component={EditVendor} />
				<PrivateRoute exact path="/event" component={ViewEvent} />
				<PrivateRoute exact path="/vendors" component={Vendors} />
				<PrivateRoute exact path="/viewvendor" component={ViewVendor} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path='/addvendorproduct' component={AddVendorProduct}/>
				<PrivateRoute exact path='/vendordetailproductlist'component={VendorDetailProductList}/>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/forgotpassword" component={ForgotPassword} />
			</Switch>
			<Footer />
		</div>
	);
});

export default App;
