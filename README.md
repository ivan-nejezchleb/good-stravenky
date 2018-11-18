# good-stravenky 🍽

Application for quick calculation of the owned meal vouchers for the tasty lunch you just had.

Made with React Native with love during GoodData Hackaton 2018 by Monika Lalak, Ivan Nejezchleb and Petr Dolejsi.

# TODO

## Must be resolved before publish to the app store
* Style Main screen according to the designs
    * Style the screen
    * Solve issue with results scrolling
* Show warning when invalid input was entered (2x voucher price + save with no voucher values) 
* Ask Monca
    * Application icon
    * Check Slovak localization
    * Credit graphics authors

## Planned features
* Debounce save in Settings screen and then do not dismiss welcome screen upon ranking strategy selection
* Choose locale in the settings, independent from the device locale
* Settings of the displayed currency

## Nice to have features
* Welcome screen tutorial
* Warn about more than 5 meal vouchers used in the result of the payment option
* Support up to four meal vouchers values
* Simple calculator to sum up parts of the meals together

## Refactoring
* Settings handling
    * Split settingsContext into the navigationContext and settingsContext...
    * ... or replace React Context with Redux
* Name of the screen routers to the constants
* Do not repeat stylesheets blocks but define some shared stylesheet for them
* Add proper prop types to all React components (enable eslint rule once more)

## Nice to have visual improvements 
* Use font from the design mockups 
 
