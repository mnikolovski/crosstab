/* 
*	crosstab - message communication across tabs and windows 
*	https://github.com/mnikolovski/crosstab
*	Copyright (c) 2016 Marjan Nikolovski; Licensed MIT 
*/
;var crosstab = (function Crosstab(){
	var me = {};
	var subscriptions = {};
	var MESSAGE_PREFIX = 'crosstab-'
	
	/*
	*	@desc initialize the crosstab component
	*/		
	function init(){
		attachEvents();
	}
	
	/*
	*	@desc attach event listeners
	*/	
	function attachEvents(){
		window.addEventListener('storage', onStorageChanged);
	}
	
	/*
	*	@desc create a crosstab specific event name
	*	@param eventName<string> name of the event
	*/
	function createEventName(eventName){
		eventName = MESSAGE_PREFIX + eventName;
		return eventName;
	}
	
	/*
	*	@desc resolve the callbacks for the provided event
	*	@param eventName<string> name of the event
	*/	
	function resolveSubscriptionForEventName(eventName){
		if(!subscriptions[eventName]) return [];
		return subscriptions[eventName];
	}
		
	/*
	*	@desc subscribe to a provided event
	*	@param eventName<string> name of the event
	*	@param eventcallbackName<function> callback function
	*/		
	me.on = function(eventName, callback){
		eventName = createEventName(eventName);
		if(!subscriptions[eventName]) subscriptions[eventName] = [];
		subscriptions[eventName].push(callback);
	};
	
	/*
	*	@desc unsubscribe from a provided event
	*	@param eventName<string> name of the event
	*	@param eventcallbackName<function> callback function
	*/			
	me.off = function(eventName, callback){
		eventName = createEventName(eventName);
		if(!subscriptions[eventName]) return;
		if(!callback) {
			delete subscriptions[eventName];
		}
		else{
			for(var i = 0; i < subscriptions[eventName].length; i++){
				if(subscriptions[eventName][i] == callback){
					subscriptions[eventName].splice(i, 1);
					break;
				}
			}
		}
	};
	
	/*
	*	@desc trigger an event to the event subscribers
	*	@param eventName<string> name of the event
	*	@param data<object> callback data
	*/		
	me.trigger = function(eventName, data){
		eventName = createEventName(eventName);
		localStorage.setItem(eventName, JSON.stringify(data));
	};
	
	/*
	*	@desc handle storage change and notify the event subscribers
	*	@param e<event> native storae event
	*/		
	function onStorageChanged(e){
		if(!e.key) return;
		if(!e.key.startsWith(MESSAGE_PREFIX)) return;
		if(e.oldValue) return;
		var key
		var crossTabEvent = new CustomEvent(e.key, {
			detail: {
				name: e.key,
				value: JSON.parse(e.newValue)
			}
		});
		localStorage.removeItem(e.key);		
		var subscriptions = resolveSubscriptionForEventName(e.key);
		for(var i = 0; i < subscriptions.length; i++){
			subscriptions[i](crossTabEvent);
		}
	}
	
	init();
	
	return me;
})();

(function($){
	if($) $.crosstab = crosstab;
})(this.jQuery);