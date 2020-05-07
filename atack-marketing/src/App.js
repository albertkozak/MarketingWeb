import React, {useEffect, useState} from 'react';
import firebase from './firebase'
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
import DeleteVendor from './components/forms/DeleteVendor'
import AddEventOrganizers from './components/forms/AddEventOrganizers';
import AddEventVendor from './components/forms/AddEventVendor';
import AddEventVendorUser from './components/forms/AddEventVendorUser'
import Venue from './screens/Venue'
import ViewVenue from './screens/ViewVenue'
import DeleteVenue from './components/forms/DeleteVenue'

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
			{location.pathname !== '/login' &&
			location.pathname !== '/register' &&
			location.pathname !== '/forgotpassword' && <Navbar />}
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute exact path="/qrcode" component={QRCode} />
				<PrivateRoute exact path="/roles" component={Roles} />
				<PrivateRoute exact path="/export" component={Export} />
				<PrivateRoute exact path="/addevent" component={AddEvent} />
				<PrivateRoute exact path="/editevent" component={EditEvent} />
				<PrivateRoute exact path="/deleteevent" component={DeleteEvent} />
				<PrivateRoute exact path="/edituser" component={EditUser} />
				<PrivateRoute exact path="/addeventorganizers" component={AddEventOrganizers} />
				<PrivateRoute exact path="/venues" component={Venue} />
				<PrivateRoute exact path="/viewvenue" component={ViewVenue} />
				<PrivateRoute exact path="/addvenue" component={AddVenue} />
				<PrivateRoute exact path="/editvenue" component={EditVenue} />
				<PrivateRoute exact path="/deletevenue" component={DeleteVenue} />
				<PrivateRoute exact path="/addvendor" component={AddVendor} />
				<PrivateRoute exact path="/editvendor" component={EditVendor} />
				<PrivateRoute exact path="/deletevendor" component={DeleteVendor} />
				<PrivateRoute exact path="/addeventvendor" component={AddEventVendor} />
				<PrivateRoute exact path="/addeventvendoruser" component={AddEventVendorUser} />
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
