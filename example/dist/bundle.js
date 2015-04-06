require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/yuanyan/React/powers/node_modules/react-kit/appendVendorPrefix.js":[function(require,module,exports){
'use strict';
var getVendorPropertyName = require('./getVendorPropertyName');

module.exports = function (target, sources){
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
        var nextSource = arguments[nextIndex];
        if (nextSource == null) {
            continue;
        }

        var from = Object(nextSource);

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
    }

    var prefixed = {};
    for (var key in to) {
        prefixed[getVendorPropertyName(key)] = to[key]
    }

    return prefixed
}

},{"./getVendorPropertyName":"/Users/yuanyan/React/powers/node_modules/react-kit/getVendorPropertyName.js"}],"/Users/yuanyan/React/powers/node_modules/react-kit/getVendorPrefix.js":[function(require,module,exports){
'use strict';

var cssVendorPrefix;

module.exports = function (){

    if(cssVendorPrefix) return cssVendorPrefix;

    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];

    return cssVendorPrefix = '-' + pre + '-';
}

},{}],"/Users/yuanyan/React/powers/node_modules/react-kit/getVendorPropertyName.js":[function(require,module,exports){
'use strict';

var div = document.createElement('div');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
module.exports = function (prop) {

   if (prop in div.style) return prop;

   var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
   if(domVendorPrefix){
       return domVendorPrefix + prop;
   }else{
       for (var i=0; i<prefixes.length; ++i) {
           var vendorProp = prefixes[i] + prop;
           if (vendorProp in div.style) {
               domVendorPrefix = prefixes[i];
               return vendorProp;
           }
       }
   }
}

},{}],"/Users/yuanyan/React/powers/node_modules/react-kit/insertKeyframesRule.js":[function(require,module,exports){
'use strict';

var insertRule = require('./insertRule');
var vendorPrefix = require('./getVendorPrefix')();
var index = 0;

module.exports = function (keyframes) {
    // random name
    var name = 'anim_'+ (++index) + (+new Date);
    var css = "@" + vendorPrefix + "keyframes " + name + " {";

    for (var key in keyframes) {
        css += key + " {";

        for (var property in keyframes[key]) {
            var part = ":" + keyframes[key][property] + ";";
            // We do vendor prefix for every property
            css += vendorPrefix + property + part;
            css += property + part;
        }

        css += "}";
    }

    css += "}";

    insertRule(css);

    return name
}

},{"./getVendorPrefix":"/Users/yuanyan/React/powers/node_modules/react-kit/getVendorPrefix.js","./insertRule":"/Users/yuanyan/React/powers/node_modules/react-kit/insertRule.js"}],"/Users/yuanyan/React/powers/node_modules/react-kit/insertRule.js":[function(require,module,exports){
'use strict';

var extraSheet;

module.exports = function (css) {

    if (!extraSheet) {
        // First time, create an extra stylesheet for adding rules
        extraSheet = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(extraSheet);
        // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
        extraSheet = extraSheet.sheet || extraSheet.styleSheet;
    }

    var index = (extraSheet.cssRules || extraSheet.rules).length;
    extraSheet.insertRule(css, index);

    return extraSheet;
}

},{}],"powers":[function(require,module,exports){
var React = require('react');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var insertKeyframesRule = require('react-kit/insertKeyframesRule');

var showModalAnimation = insertKeyframesRule({
    '0%': {
        opacity: 0,
        transform: 'translate3d(-50%, -400px, 0)'
    },
    '100%': {
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0)'
    }
});

var hideModalAnimation = insertKeyframesRule({
    '0%': {
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0)'
    },
    '100%': {
        opacity: 0,
        transform: 'translate3d(-50%, 100px, 0)'
    }
});

var showBackdropAnimation = insertKeyframesRule({
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 0.7
    }
});

var hideBackdropAnimation = insertKeyframesRule({
    '0%': {
        opacity: 0.7
    },
    '100%': {
        opacity: 0
    }
});

var showContentAnimation = insertKeyframesRule({
    '0%': {
        opacity: 0,
        transform: 'translate3d(0, -100px, 0)'
    },
    '100%': {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    }
});

var hideContentAnimation = insertKeyframesRule({
    '0%': {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
    },
    '100%': {
        opacity: 0,
        transform: 'translate3d(0, 50px, 0)'
    }
});

module.exports = React.createClass({displayName: "exports",
    propTypes: {
        className: React.PropTypes.string,
        hidden: React.PropTypes.bool,
        // Close the modal when esc is pressed? Defaults to true.
        keyboard: React.PropTypes.bool,
        onHide: React.PropTypes.func,
        backdrop: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string
        ])
    },

    getDefaultProps: function() {
        return {
            className: "",
            onHide: function(){},
            keyboard: true,
            backdrop: true
        };
    },

    getInitialState: function(){
        return {
            hidden: false
        }
    },

    render: function() {
        if(this.props.hidden) return null;

        var modalStyle = appendVendorPrefix({
            position: "fixed",
            width: "500px",
            transform: "translate3d(-50%, -50%, 0)",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            zIndex: 1050,
            animationDuration: '0.4s',
            animationFillMode: 'forwards',
            animationName: this.state.hidden? hideModalAnimation: showModalAnimation,
            animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
        });

        var backdropStyle = appendVendorPrefix({
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            backgroundColor: "black",
            animationDuration: '0.4s',
            animationFillMode: 'forwards',
            animationDelay: '0.25s',

            animationName: this.state.hidden? hideBackdropAnimation: showBackdropAnimation,
            animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
        });

        var contentStyle = appendVendorPrefix({
            animationDuration: '0.4s',
	        animationFillMode: 'forwards',
            animationDelay: '0.25s',
            animationName: showContentAnimation,
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
        });

        var modal = (
            React.createElement("div", {style: modalStyle, tabIndex: "-1", className: this.props.className}, 
                React.createElement("div", {style: contentStyle}, 
                    this.props.children
                )
            )
        );

        var backdrop = React.createElement("div", {style: backdropStyle});

        return React.createElement("div", null, 
            modal, 
            backdrop
        );
    },

    onHide: function(){
        var self = this;
        this.setState({
            hidden: true
        });
        // after animation end
        setTimeout(function(){
            self.props.onHide();
        }, 400)
    },

    listenKeyboard: function(event) {
        if (this.props.keyboard &&
                (event.key === "Escape" ||
                 event.keyCode === 27)) {
            this.onHide();
        }
    },

    componentDidMount: function() {
        window.addEventListener("keydown", this.listenKeyboard, true);
    },

    componentWillUnmount: function() {
        window.removeEventListener("keydown", this.listenKeyboard, true);
    }
});

},{"react":false,"react-kit/appendVendorPrefix":"/Users/yuanyan/React/powers/node_modules/react-kit/appendVendorPrefix.js","react-kit/insertKeyframesRule":"/Users/yuanyan/React/powers/node_modules/react-kit/insertKeyframesRule.js"}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2FwcGVuZFZlbmRvclByZWZpeC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1raXQvZ2V0VmVuZG9yUHJlZml4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWtpdC9nZXRWZW5kb3JQcm9wZXJ0eU5hbWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2luc2VydEtleWZyYW1lc1J1bGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3Qta2l0L2luc2VydFJ1bGUuanMiLCJzcmMvUG93ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRWZW5kb3JQcm9wZXJ0eU5hbWUgPSByZXF1aXJlKCcuL2dldFZlbmRvclByb3BlcnR5TmFtZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZXMpe1xuICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgICAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmVmaXhlZCA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiB0bykge1xuICAgICAgICBwcmVmaXhlZFtnZXRWZW5kb3JQcm9wZXJ0eU5hbWUoa2V5KV0gPSB0b1trZXldXG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWZpeGVkXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjc3NWZW5kb3JQcmVmaXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCl7XG5cbiAgICBpZihjc3NWZW5kb3JQcmVmaXgpIHJldHVybiBjc3NWZW5kb3JQcmVmaXg7XG5cbiAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnJyk7XG4gICAgdmFyIHByZSA9IChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzdHlsZXMpLmpvaW4oJycpLm1hdGNoKC8tKG1venx3ZWJraXR8bXMpLS8pIHx8IChzdHlsZXMuT0xpbmsgPT09ICcnICYmIFsnJywgJ28nXSlcbiAgICApWzFdO1xuXG4gICAgcmV0dXJuIGNzc1ZlbmRvclByZWZpeCA9ICctJyArIHByZSArICctJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xudmFyIHByZWZpeGVzID0gWydNb3onLCAnV2Via2l0JywgJ08nLCAnbXMnXTtcbnZhciBkb21WZW5kb3JQcmVmaXg7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHByb3BlciB2ZW5kb3IgcHJvcGVydHkgbmFtZS4gKHRyYW5zaXRpb24gPT4gV2Via2l0VHJhbnNpdGlvbilcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHByb3ApIHtcblxuICAgaWYgKHByb3AgaW4gZGl2LnN0eWxlKSByZXR1cm4gcHJvcDtcblxuICAgdmFyIHByb3AgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zdWJzdHIoMSk7XG4gICBpZihkb21WZW5kb3JQcmVmaXgpe1xuICAgICAgIHJldHVybiBkb21WZW5kb3JQcmVmaXggKyBwcm9wO1xuICAgfWVsc2V7XG4gICAgICAgZm9yICh2YXIgaT0wOyBpPHByZWZpeGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgIHZhciB2ZW5kb3JQcm9wID0gcHJlZml4ZXNbaV0gKyBwcm9wO1xuICAgICAgICAgICBpZiAodmVuZG9yUHJvcCBpbiBkaXYuc3R5bGUpIHtcbiAgICAgICAgICAgICAgIGRvbVZlbmRvclByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgICAgICAgICAgcmV0dXJuIHZlbmRvclByb3A7XG4gICAgICAgICAgIH1cbiAgICAgICB9XG4gICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbnNlcnRSdWxlID0gcmVxdWlyZSgnLi9pbnNlcnRSdWxlJyk7XG52YXIgdmVuZG9yUHJlZml4ID0gcmVxdWlyZSgnLi9nZXRWZW5kb3JQcmVmaXgnKSgpO1xudmFyIGluZGV4ID0gMDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5ZnJhbWVzKSB7XG4gICAgLy8gcmFuZG9tIG5hbWVcbiAgICB2YXIgbmFtZSA9ICdhbmltXycrICgrK2luZGV4KSArICgrbmV3IERhdGUpO1xuICAgIHZhciBjc3MgPSBcIkBcIiArIHZlbmRvclByZWZpeCArIFwia2V5ZnJhbWVzIFwiICsgbmFtZSArIFwiIHtcIjtcblxuICAgIGZvciAodmFyIGtleSBpbiBrZXlmcmFtZXMpIHtcbiAgICAgICAgY3NzICs9IGtleSArIFwiIHtcIjtcblxuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBrZXlmcmFtZXNba2V5XSkge1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBcIjpcIiArIGtleWZyYW1lc1trZXldW3Byb3BlcnR5XSArIFwiO1wiO1xuICAgICAgICAgICAgLy8gV2UgZG8gdmVuZG9yIHByZWZpeCBmb3IgZXZlcnkgcHJvcGVydHlcbiAgICAgICAgICAgIGNzcyArPSB2ZW5kb3JQcmVmaXggKyBwcm9wZXJ0eSArIHBhcnQ7XG4gICAgICAgICAgICBjc3MgKz0gcHJvcGVydHkgKyBwYXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgY3NzICs9IFwifVwiO1xuICAgIH1cblxuICAgIGNzcyArPSBcIn1cIjtcblxuICAgIGluc2VydFJ1bGUoY3NzKTtcblxuICAgIHJldHVybiBuYW1lXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBleHRyYVNoZWV0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcblxuICAgIGlmICghZXh0cmFTaGVldCkge1xuICAgICAgICAvLyBGaXJzdCB0aW1lLCBjcmVhdGUgYW4gZXh0cmEgc3R5bGVzaGVldCBmb3IgYWRkaW5nIHJ1bGVzXG4gICAgICAgIGV4dHJhU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGV4dHJhU2hlZXQpO1xuICAgICAgICAvLyBLZWVwIHJlZmVyZW5jZSB0byBhY3R1YWwgU3R5bGVTaGVldCBvYmplY3QgKGBzdHlsZVNoZWV0YCBmb3IgSUUgPCA5KVxuICAgICAgICBleHRyYVNoZWV0ID0gZXh0cmFTaGVldC5zaGVldCB8fCBleHRyYVNoZWV0LnN0eWxlU2hlZXQ7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gKGV4dHJhU2hlZXQuY3NzUnVsZXMgfHwgZXh0cmFTaGVldC5ydWxlcykubGVuZ3RoO1xuICAgIGV4dHJhU2hlZXQuaW5zZXJ0UnVsZShjc3MsIGluZGV4KTtcblxuICAgIHJldHVybiBleHRyYVNoZWV0O1xufVxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBhcHBlbmRWZW5kb3JQcmVmaXggPSByZXF1aXJlKCdyZWFjdC1raXQvYXBwZW5kVmVuZG9yUHJlZml4Jyk7XG52YXIgaW5zZXJ0S2V5ZnJhbWVzUnVsZSA9IHJlcXVpcmUoJ3JlYWN0LWtpdC9pbnNlcnRLZXlmcmFtZXNSdWxlJyk7XG5cbnZhciBzaG93TW9kYWxBbmltYXRpb24gPSBpbnNlcnRLZXlmcmFtZXNSdWxlKHtcbiAgICAnMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MDBweCwgMCknXG4gICAgfSxcbiAgICAnMTAwJSc6IHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgLTUwJSwgMCknXG4gICAgfVxufSk7XG5cbnZhciBoaWRlTW9kYWxBbmltYXRpb24gPSBpbnNlcnRLZXlmcmFtZXNSdWxlKHtcbiAgICAnMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC01MCUsIDApJ1xuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIDEwMHB4LCAwKSdcbiAgICB9XG59KTtcblxudmFyIHNob3dCYWNrZHJvcEFuaW1hdGlvbiA9IGluc2VydEtleWZyYW1lc1J1bGUoe1xuICAgICcwJSc6IHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgIH0sXG4gICAgJzEwMCUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAuN1xuICAgIH1cbn0pO1xuXG52YXIgaGlkZUJhY2tkcm9wQW5pbWF0aW9uID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZSh7XG4gICAgJzAlJzoge1xuICAgICAgICBvcGFjaXR5OiAwLjdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgfVxufSk7XG5cbnZhciBzaG93Q29udGVudEFuaW1hdGlvbiA9IGluc2VydEtleWZyYW1lc1J1bGUoe1xuICAgICcwJSc6IHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgLTEwMHB4LCAwKSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICB9XG59KTtcblxudmFyIGhpZGVDb250ZW50QW5pbWF0aW9uID0gaW5zZXJ0S2V5ZnJhbWVzUnVsZSh7XG4gICAgJzAlJzoge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKSdcbiAgICB9LFxuICAgICcxMDAlJzoge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCA1MHB4LCAwKSdcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIHByb3BUeXBlczoge1xuICAgICAgICBjbGFzc05hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGhpZGRlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIC8vIENsb3NlIHRoZSBtb2RhbCB3aGVuIGVzYyBpcyBwcmVzc2VkPyBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAgICBrZXlib2FyZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uSGlkZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGJhY2tkcm9wOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgICBdKVxuICAgIH0sXG5cbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBcIlwiLFxuICAgICAgICAgICAgb25IaWRlOiBmdW5jdGlvbigpe30sXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wOiB0cnVlXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhpZGRlbjogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLnByb3BzLmhpZGRlbikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIG1vZGFsU3R5bGUgPSBhcHBlbmRWZW5kb3JQcmVmaXgoe1xuICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICAgIHdpZHRoOiBcIjUwMHB4XCIsXG4gICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoLTUwJSwgLTUwJSwgMClcIixcbiAgICAgICAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgICAgICAgIGxlZnQ6IFwiNTAlXCIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgICAgIHpJbmRleDogMTA1MCxcbiAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAnMC40cycsXG4gICAgICAgICAgICBhbmltYXRpb25GaWxsTW9kZTogJ2ZvcndhcmRzJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbk5hbWU6IHRoaXMuc3RhdGUuaGlkZGVuPyBoaWRlTW9kYWxBbmltYXRpb246IHNob3dNb2RhbEFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuNywwLDAuMywxKSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGJhY2tkcm9wU3R5bGUgPSBhcHBlbmRWZW5kb3JQcmVmaXgoe1xuICAgICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHpJbmRleDogMTA0MCxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiLFxuICAgICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246ICcwLjRzJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiAnZm9yd2FyZHMnLFxuICAgICAgICAgICAgYW5pbWF0aW9uRGVsYXk6ICcwLjI1cycsXG5cbiAgICAgICAgICAgIGFuaW1hdGlvbk5hbWU6IHRoaXMuc3RhdGUuaGlkZGVuPyBoaWRlQmFja2Ryb3BBbmltYXRpb246IHNob3dCYWNrZHJvcEFuaW1hdGlvbixcbiAgICAgICAgICAgIGFuaW1hdGlvblRpbWluZ0Z1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuNywwLDAuMywxKSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnRTdHlsZSA9IGFwcGVuZFZlbmRvclByZWZpeCh7XG4gICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogJzAuNHMnLFxuXHQgICAgICAgIGFuaW1hdGlvbkZpbGxNb2RlOiAnZm9yd2FyZHMnLFxuICAgICAgICAgICAgYW5pbWF0aW9uRGVsYXk6ICcwLjI1cycsXG4gICAgICAgICAgICBhbmltYXRpb25OYW1lOiBzaG93Q29udGVudEFuaW1hdGlvbixcblx0ICAgICAgICBhbmltYXRpb25UaW1pbmdGdW5jdGlvbjogJ2N1YmljLWJlemllcigwLjcsMCwwLjMsMSknXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBtb2RhbCA9IChcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBtb2RhbFN0eWxlLCB0YWJJbmRleDogXCItMVwiLCBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lfSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7c3R5bGU6IGNvbnRlbnRTdHlsZX0sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBiYWNrZHJvcCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBiYWNrZHJvcFN0eWxlfSk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBtb2RhbCwgXG4gICAgICAgICAgICBiYWNrZHJvcFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBvbkhpZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBoaWRkZW46IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFmdGVyIGFuaW1hdGlvbiBlbmRcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2VsZi5wcm9wcy5vbkhpZGUoKTtcbiAgICAgICAgfSwgNDAwKVxuICAgIH0sXG5cbiAgICBsaXN0ZW5LZXlib2FyZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMua2V5Ym9hcmQgJiZcbiAgICAgICAgICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiIHx8XG4gICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IDI3KSkge1xuICAgICAgICAgICAgdGhpcy5vbkhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmxpc3RlbktleWJvYXJkLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5saXN0ZW5LZXlib2FyZCwgdHJ1ZSk7XG4gICAgfVxufSk7XG4iXX0=
