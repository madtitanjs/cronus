# Install the package

**Through NPM**
``npm install cronus-calendar``

**Through Yarn**
``yarn add cronus--calendar``


# Add css and js builds in your HTML
```html
<head>
    <script src="node_modules/cronus-calendar/dist/js/cronus-calendar.js"></script>
    <link rel="stylesheet" href="node_modules/cronus-calendar/dist/css/cronus-calendar.css">
</head>
```

# Add the cronus element in your html
```html
<body>
    <cronus-calendar></cronus-calendar>
</body>
```

# API

* ``ondateselected``: Provided callback for when a date has been selected
  ```js
    let cal = document.getElementsByTagName('cronus-calendar').item(0);
    // Date selected
    // Called when a date is clicked
    cal.ondateselected = (date) => {
        console.log('DATE SELECTED');
        console.log(date);
    }
  ```


* ``onmonthchange``: Provided callback for when the next / prev button has been clicked
  ```js
    let cal = document.getElementsByTagName('cronus-calendar').item(0);
    // Month change event
    // Called when next / prev button has been changed
    cal.onmonthchange = (date) => {
        console.log('MONTH CHANGED');
        console.log(date)
    }

  ```

* ``ongeneratedots``: Provided callback for when the calendar is rendering the dates. Here you have do option to populate some dots in the date. This callback provides a date and expects a ``string[]`` to be returned
```js
  let cal = document.getElementsByTagName('cronus-calendar').item(0);
    // Callback that listens to when the calendar is populating dates
    // Expects an array of strings containing colors
    // Can provide hex or a standard color value 
    cal.ongeneratedots = (date) => {
        hasEvent = ....;
        hasMeeting = ....;
        if (hasEvent) dots.push('purple');
        if (hasMeeting) dots.push('green');

        return dots;
    }

```