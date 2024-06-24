<h2>Routing</h2>

<h4>Route item</h4>

```
{
    path: '/doctors/profile/:id/edit',
    exact: true,
    component: MockRouteAppPage,
    meta: {
        title: 'Edit',
        breadcrumbs: [
            { name: 'Doctors', path: '/doctors' },
            { name: 'Doctors profile', path: '/doctors/profile/:id' },
        ]
    }
},
```

<h4>Router item</h4>

```
const GlobalAppRouter = {
    routes: [
        {
            path: '/',
            component: App,
            routes: {
                admin: adminRoutes,
                doctor: doctorRoutes,
                pharmacist: pharmacistRoutes,
                common: [LegalRoute, NotFoundRoute] // NotFoundRoute must be the last in the list
            }
        }
    ],
    paths: {...adminPaths, ...doctorPaths, ...pharmacistPaths }
}
```

<h5>Example of rendering `routes` in a place you want them to display</h5>

```
import { renderRoutes } from 'react-router-config';

const App = ({ route }) {

    const doctorRoutes = route.routes.doctor; // distributed by roles

    return (
        <div className={'app'}>
            {renderRoutes(doctorRoutes)}
        </div>
    )
}

```
<h6>Props</h6>

`route: RouteItem` - object that describes route itself. Include: `path`, `meta`, `routes` (as a child routes) etc.
