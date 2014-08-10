New App
=======

Installation
------------

Make sure to have Xcode installed.

Type `npm install`. Then type `grunt`, which will prompt for a password since it needs root access to install global dependencies.

When that script finishes an iOS simulator should pop up displaying "Hello World!".  If it doesn't pop up immediately, look for the app called HelloWorld and open it up.

Now navigate to `/build/index.html` in your browser.  You should also see "Hello World!" displayed in the browser.


Development
-----------

To Build: `grunt`

To Develop: `grunt watch`

To Test: `grunt test`

To Build PhoneGap App: `grunt phonegap`
