<h2>Tabs</h2>

Component for displaying tabs and their contents. Built upon Material-UI `Tabs` and `Tab` components.

<h4>Tabs</h4>

```
const titles = ['Summary appointment', "Patient's info", 'Attachments', 'Prescription', 'Test', 'Past appointments']'

<Tabs items={titles} scrollable>
    <div>CONTENT #1</div>
    <div>CONTENT #2</div>
    <div>CONTENT #3</div>
    <div>CONTENT #4</div>
</Tabs>
```

<h6>Props</h6>

`items: string[]` - array of titles that represent tabs. The order the same as in the array.

`scrollable: boolean` - if `true` - tabs panel can be scrolled/swiped, scroll buttons are shown.

`children: JSX.Elements[]` - each of child is a content for corresponding tab. Related by order.