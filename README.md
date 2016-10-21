crosstab
=======

Crosstab is a Javascript/jQuery component for cross tab and window communication. It supports subscribing and triggering events between tabs and windows by utilizing localStorage.

Browser compatibility
---------------------
* IE 8+
* Chrome 4+
* Firefox 3.5+
* Safari 4+
* Opera 10.5+

Usage
-----
### Trigger an event to the event subscribers
```javascript
crosstab.trigger('connected-with-stripe', { name : 'john@doe.com' });

// jquery version
$.crosstab.trigger('connected-with-stripe', { name : 'john@doe.com' });
```

### Subscribe to an event
```javascript
crosstab.on('connected-with-stripe', function(e){
	console.log(JSON.stringify(e.detail.value))
});

// jquery version
$.crosstab.on('connected-with-stripe', function(e){
	console.log(JSON.stringify(e.detail.value))
});
```

### Unsubscribe from an event
```javascript
crosstab.off('connected-with-stripe');	
crosstab.off('connected-with-stripe', onConnectedWithStripeCallback);	

// jquery version
$.crosstab.off('connected-with-stripe');	
$.crosstab.off('connected-with-stripe', onConnectedWithStripeCallback);	
```

Community
-----
Have something to add? Let's get in touch.

Copyright and license
-----

The license is available within the repository in the LICENSE file.