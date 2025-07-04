import React from 'react'
const PriceConfiguration = React.lazy(() => import('./views/admin/priceConfiguration'))
const CourtConfiguration = React.lazy(() => import('./views/admin/courtConfiguration'))
const AddLocations = React.lazy(() => import('./views/admin/addLocations'))
const Locations = React.lazy(() => import('./views/admin/locations'))
const Reporting = React.lazy(() => import('./views/admin/reporting'))
const LocationDetails = React.lazy(() => import('./views/admin/locationDetails'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AdminRegistration = React.lazy(() => import('./views/admin/adminRegistration'))
const UserRegistration = React.lazy(() => import('./views/admin/userRegistration'))
const Profile = React.lazy(() => import('./views/admin/profile'))
const Messages = React.lazy(() => import('./views/admin/messages'))
const CourtDetails = React.lazy(() => import('./views/admin/courtDetails'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin-registration', name: 'AdminRegistration', element: AdminRegistration },
  { path: '/update-registraion/:id', name: 'AdminRegistration', element: AdminRegistration },
  { path: '/messages', name: 'Messages', element: Messages },
  { path: '/locations', name: 'Locations', element: Locations },
  { path: '/add-locations', name: 'AddLocations', element: AddLocations },
  { path: '/update-locations/:id', name: 'AddLocations', element: AddLocations },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/reporting', name: 'Reporting', element: Reporting },
  { path: '/location-details/:id', name: 'LocationDetails', element: LocationDetails },
  { path: '/user-registraion', name: 'UserRegistration', element: UserRegistration },
  { path: '/price-configuration', name: 'PriceConfiguration', element: PriceConfiguration },
  { path: '/court-bookings', name: 'CourtConfiguration', element: CourtConfiguration },
  { path: '/court-details/:id', name: 'CourtDetails', element: CourtDetails },
  
]

export default routes
