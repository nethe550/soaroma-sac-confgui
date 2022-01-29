# Soaroma SAC Configuration Editor
A graphical configuration editor for the Soaroma SAC Minecraft anti-cheat plugin.

***This project is still in early beta, expect a few bugs and missing features!***

### Current Versions:
- SAC: `1.0.46`
- Editor: `0.0.2`

## Usage
To start editing configurations, simply download this repository and open the `index.html` file in your browser of choice. Then, either pick a default configuration on the sidebar, or upload your own to begin editing.

### Browser Compatibility
**There are some known issues with CORS policies in Google Chrome, Microsoft Edge, and any other browser built on Chromium.** While these issues are minor, they may prevent you from loading certain configurations properly. To get around this, you can simply click the 'Upload' button within the page and input the default configuration found at `./src/config/defaults/default.txt`. (You may have to rename the file to be `.yml`)

I hope to fix all of these issues in the near future.

### Tested Browsers
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera

## Contributing
Feel free to modify this to fix bugs, add more features, etc.

If you find a bug or have a suggestion, feel free to submit an issue in this repository.

## To Do
- [ ] Fix CORS issues when trying to load default configurations.
- [ ] Add more verbose errors and logging.
- [ ] Support more configuration versions of Soaroma SAC.
- [ ] Crowdsource configuration descriptions.
