# good-stravenky 🍽

Application for quick calculation of the owned meal vouchers for the tasty lunch you just had.

Made with React Native with love during GoodData Hackaton 2018 by Monika Lalak, Ivan Nejezchleb and Petr Dolejsi.

# TODO

## Must be resolved before publish to the app store
* Style Main screen according to the designs
* Style Settings screen according to the designs
* Show warning when invalid input was entered (2x voucher price + save with no voucher values) 
* Do not dismiss welcome screen upon ranking strategy selection
* Test default locale detection
* Application icon
* Debounce save in Settings screen
* Credit graphics authors

## New features
* Welcome screen tutorial
* Choose locale in the settings, independent from the device locale
* Warn about more than 5 meal vouchers in the payment option
* Support up to five meal vouchers values
* Displayed currency settings
* Simple calculator to sum up parts of the meals together

## Refactoring
* Split settingsContext into the navigationContext and settingsContext
* Name of the screen routers to the constants
* Do not repeat stylesheets blocks but define some shared stylesheet for them
* Add proper prop types to all React components

## Nice to have visual improvements 
* Use font from the design mockups 
 
