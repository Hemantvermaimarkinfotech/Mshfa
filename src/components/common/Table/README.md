<h2>Table</h2>

<p>
    Component created to display some data in a Table view. Built upon a Data Grid material-ui component. For detailed information, please dive into <a href="https://material-ui.com/components/data-grid/">original component docs</a>.
</p> 


<h4>Usage</h4>

```
<Table data={tableData} limit={10} />
```

<h4>Props</h4>

`data` - data to show, must implement TableData interface;

`limit: number` - rows to show on a page;

<h4>Interfaces</h4>

<h5>TableData</h5>

```
interface TableData {
    columns: TableColumn[];
    items: TableItem[];
}
```
<h5>TableColumn</h5>

```
interface TableColumn implements TableColumnOptions {
    field: string;
    headerName: string;
}
```

`field: string` - column id. Must be used for `searchBy` prop as a criterion (item) if there's any need to enable search filter. Internally used for connecting eponymous properties of TableItem to proper column.

`headerName: string` - title showed in a head of column.  


<h5>TableColumnOptions</h5>

```
interface TableColumnOptions {
    flex?: number;
    width?: number;
    sortable?: boolean;
    resizible?: boolean;
    renderCell?: Function;
}
```
`flex: number` - css `flex` property. Defines space which must be used by this column.

`width: number` - css `width` property. Defines space which must be used by this column (px).

`sortable: boolean | resizible: boolean` - abilities of column to be sorted/resized accordingly;

`renderCell: Function` - function that takes `params` object as an argument and returns `JSX.Element` which represents cell's custom markup. You can use one of predefined custom cell's or create a new one. Default (if omitted): cell that renders only text;

<h5>Example of `renderCell` function</h5>

```
const renderCellWithImage = (imageUrl, text) => {
    return (
        <div className={'cell cell--with-image'}>
            <img className={'cell__image'} src={imageUrl} />
            <span className={'cell__text'}>{text}</span>
        </div>
    )
}
```

Some custom `renderCell` functions can be found in `components/common/Table/index.components.js`

Syntax, naming and signature for new custom cell's functions must be kept.

<h5>Example of `TableColumn` item</h5>

```
{
    field: 'patient',
    headerName: 'Patient',
    sortable: false,
    resizable: false,
    flex: 1,
    renderCell: (params) => renderCellWithImage(params.row.avatarUrl, params.value),
},
```

<h5>TableItem</h5>

```
{
    [property: string]: string;
    ...
},
```

Free form object, must include properties that are needed by ColumnItems.

<h5>Example of complete `TableData` usage</h5>

Table with one column `Name` that consists of rows that include photo and name of a user.

```
const data: TableData = {
    columns: [
        {
            field: 'name',
            headerName: 'Name,
            renderCell: (params) => renderCellWithImage(params.row.avatarUrl, params.value)
        }
    ],
    items: [
        {
            name: 'Denis',
            avatarUrl: '/some-avatar-of-a-user
        },
        {
            name: 'Jacob',
            avatarUrl: '/some-another-avatar-of-a-user
        },
    ]
}

<Table data={data} limit={10} />
```

