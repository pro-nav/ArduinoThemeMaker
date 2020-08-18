<div align="center">
  <h1>Arduino Theme Maker</h1>
  <h3>Theme creator for Arduino IDE</h3>
</div>



<div align="center">
<br>
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg" />
<img src="https://forthebadge.com/images/badges/for-you.svg" />
</div>

<br><hr><br>

This is an [electron](https://electronjs.org/) application which lets you theme your [Arduino IDE](https://www.arduino.cc/en/Main/Software).

## Usage
Install and run Arduino Theme Maker using following commands
```bash
git clone https://github.com/pro-nav/ArduinoThemeMaker.git
cd ArduinoThemeMaker
npm install
npm start
```
Once launched you can select the preview the availabe themes. To apply a theme press `Apply` button. This will create a dialog to select Save location. `theme` folder will be created at the selected location. Now, replace the orignal `theme` folder at `Arduino/lib/theme` with this newly created one.

## Troubleshooting
If you get errors after selecting save location it is due to lack of Administrator permissions. Select another location like `Documents` or `Downloads`, etc. remaining process is the same.

If your Arduino IDE is not starting after applying the theme delete the `theme` folder at `Arduino/lib/theme` and now paste the new `theme` folder at the location. If still the problem persists, reinstall Arduino IDE and cerate an issue.

