<h2>Breadcrumbs</h2>

<p>
    Component that displays path of a current page in the whole site map.
</p>

<h4>Usage</h4>

```
<Breadcrumbs route={route} />
```

<h4>Props</h4>

`route` - route component that displays current page. Passed in PageComponent automatically by renderer of all routes.

<h5>Example of complete `Breadcrumbs` usage</h5>

<h6>Route</h6>

```
{
    path: '/home/doctors',
    exact: true,
    component: DoctorsPage,
    meta: {
        title: 'Doctors',
        breadcrumbs: [
            { name: 'Home', path: '/home' },
        ]
    }
},
```

<h6>Page: PageComponent</h6>

```
const DoctorsPage = (props) => {
    const route = props.route; // ROUTE
    return (
        <div className="home-page">
            <Breadcrumbs route={route} />
        </div>
    )
}

export default DoctorsPage;
```
