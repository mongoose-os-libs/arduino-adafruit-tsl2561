
# Arduino Adafruit TSL2561 library for Mongoose OS

This is a port of the [Adafruit Arduino driver for the TSL2561 sensor](https://github.com/adafruit/TSL2561-Arduino-Library) ported to run on the [Mongoose OS ecosystem](https://mongoose-os.com/docs/reference/api.html).

Usage is extremely simple....

in _**mos.yml**_, add to **libs:** section,

`  - origin: https://github.com/pedalPusher68/arduino-adafruit-htu21df`
  
in your _**init.js**_, add something like the following,

```javascript
load('api_arduino_tsl2561.js');
```

and

```javascript
//Initialize Adafruit_TSL2561 library
let tsl = Adafruit_TSL2561.create();
print('Adafruit_TSL2561.TSL2561_GAIN_16X -> ',Adafruit_TSL2561.TSL2561_GAIN_16X);
tsl.setGain(Adafruit_TSL2561.TSL2561_GAIN_16X);
tsl.setIntegrationTime(Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS);
tsl.begin();

let tslGetData = function() {
    let vis = tsl.getVisible();
    let ir = tsl.getInfrared();
    let lux = tsl.calculateLux(vis, ir);
    print('TSL2561:  Vis: ', vis ,', IR: ', ir, ', Lux: ',lux);
};

let tslTimer = Timer.set(10000 /* milliseconds */, true /* repeat */, tslGetData, null);
```

to use the library.

Enjoy!
