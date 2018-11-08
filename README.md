# good-stravenky 🍽

Application for quick calculation of the owned meal vouchers for the tasty lunch you just had.

Made with React Native with love during GoodData Hackaton 2018 by Monika Lalak, Ivan Nejezchleb and Petr Dolejsi.

# TODO

## Must be resolved before publish to the app store
* Style Main screen according to the designs
    * Style the results
    * Solve issue with results scrolling
    * Main page should display button for calc or display keyboard right away (focus price input)
* Style Settings screen according to the designs
    * Debounce save in Settings screen
    * Do not dismiss welcome screen upon ranking strategy selection
    * Open keyboard upon first setup
* Show warning when invalid input was entered (2x voucher price + save with no voucher values) 
* Test default locale detection
* Ask Monca
    * Application icon
    * Check Slovak localization
    * Credit graphics authors

## Planned features
* Welcome screen tutorial
* Choose locale in the settings, independent from the device locale
* Warn about more than 5 meal vouchers in the result in the payment option
* Support up to four meal vouchers values
* DSettings of the displayed currency
* Simple calculator to sum up parts of the meals together

## Refactoring
* Split settingsContext into the navigationContext and settingsContext
* Name of the screen routers to the constants
* Do not repeat stylesheets blocks but define some shared stylesheet for them
* Add proper prop types to all React components (enable eslint rule once more)
* Replace React Context with Redux?

## Nice to have visual improvements 
* Use font from the design mockups 
 
