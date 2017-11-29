let Adafruit_TSL2561 = {

    // ## ** I2C Address Options **
    // ### ** Adafruit_TSL2561.TSL2561_ADDR_LOW **
    // value is `0x29`
    TSL2561_ADDR_LOW: 0x29,
    // ### ** Adafruit_TSL2561.TSL2561_ADDR_FLOAT **
    // value is `0x39` and is used as the default address for the sensor on a typical breakout board.
    TSL2561_ADDR_FLOAT: 0x39,   // Default i2c address for sensor
    // ### ** Adafruit_TSL2561.TSL2561_ADDR_HIGH **
    // value is `0x49`
    TSL2561_ADDR_HIGH: 0x49,

    // ## ** `getLuminosity( p )` Parameter (p) Options **
    // ### ** Adafruit_TSL2561.TSL2561_VISIBLE **
    // get visible luminosity:  channel 0 - channel 1
    TSL2561_VISIBLE: 2,               // channel 0 - channel 1
    // ### ** Adafruit_TSL2561.TSL2561_INFRARED **
    // get infrared luminosity:  channel 1
    TSL2561_INFRARED: 1,              // channel 1
    // ### ** Adafruit_TSL2561.TSL2561_FULLSPECTRUM **
    // get full-spectrum luminosity:  channel 0
    TSL2561_FULLSPECTRUM: 0,           // channel 0

    //
    TSL2561_INTEGRATIONTIME_13MS: 0x00,  // 13.7ms - shortest integration time (bright light)
    TSL2561_INTEGRATIONTIME_101MS: 0x01, // 101ms  - medium integration time (medium light)
    TSL2561_INTEGRATIONTIME_402MS: 0x02, // 402ms  - longest integration time (dim light)

    TSL2561_GAIN_0X: 0x00,     // No gain  - set no gain (for bright situations)
    TSL2561_GAIN_16X: 0x10,    // 16x gain - set 16x gain (for dim situations)

    _create: ffi('void *mgos_tsl2561_create(int)'),
    _bgn: ffi('int mgos_tsl2561_begin(void *)'),
    _gLum: ffi('int mgos_tsl2561_getLuminosity(void *, int)'),
    _gFLm: ffi('int mgos_tsl2561_getFullLuminosity(void *)'),
    _sInT: ffi('void mgos_tsl2561_setIntegrationTime(void *, int)'),
    _sGn: ffi('void mgos_tsl2561_setGain(void *, int)'),
    _cLx: ffi('int mgos_tsl2561_calculateLux(void *, int, int)'),

    _proto: {

        // ## **`myTSL.begin()`**
        // Initialize sensor and make it ready for use.
        // Return value: 1 if sensor is ready, 0 otherwise.
        begin: function () {
            return Adafruit_TSL2561._bgn(this.tsl);
        },

        // ## **`myTSL.getLuminosity( lumo )`**
        // Return the current luminosity for either channel or both.
        // Set `lumo` parameter to:
        // * `Adafruit_TSL2561.TSL2561_INFRARED` for channel 1 (infrared) contribution to luminosity
        // * `Adafruit_TSL2561.TSL2561_FULLSPECTRUM` for channel 1 and channel 0 combined as luminosity
        // * `Adafruit_TSL2561.TSL2561_VISIBLE` for channel 0 (visible) contribution to luminosity
        // Return value: current humidity value as a double.
        getLuminosity: function (lumo) {
            if (lumo === Adafruit_TSL2561.TSL2561_VISIBLE
                || lumo === Adafruit_TSL2561.TSL2561_INFRARED
                || lumo === Adafruit_TSL2561.TSL2561_FULLSPECTRUM
            ) {
                return Adafruit_TSL2561._gLum(this.tsl, lumo);
            }
            return -1;

        },

        // ## **`myTSL.getVisible( )`**
        // Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_VISIBLE )`.
        getVisible: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_VISIBLE);
        },

        // ## **`myTSL.getInfrared( )`**
        // Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_INFRARED )`.
        getInfrared: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_INFRARED);
        },

        // ## **`myTSL.getFullSpectrum( )`**
        // Convenience function equivalent to calling `myTSL.getLuminosity( Adafruit_TSL2561.TSL2561_FULLSPECTRUM )`.
        // Return value:
        getFullSpectrum: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_FULLSPECTRUM);
        },

        // ## **`myTSL.getFullLuminosity( )`**
        // Return value:  32-bit `unsigned int` with the 16 high-bits containing channel 1 (infrared) and the 16 low-bits
        // containing channel 0 (visible).
        getFullLuminosity: function () {
            return Adafruit_TSL2561._gFLm(this.tsl);
        },

        // ## **`myTSL.setIntegrationTime( t )`**
        // Set the sampling (integration) time of the sensor using the value of parameter `t`.
        // Allowed values for `t` and their meanings are:
        // * `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_13MS` 13.7ms - shortest integration time (bright light)
        // * `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_101MS` 101ms  - medium integration time (medium light)
        // * `Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS` 402ms  - longest integration time (dim light)
        setIntegrationTime: function (t) {
            if (t === Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_13MS
                || t === Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_101MS
                || t === Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS
            ) {
                Adafruit_TSL2561._sInT(this.tsl, t);
            } else {
                print('ERROR:  api_arduino_tsl256.setIntegrationTiming(', t, ') - unsupported value.');
            }
        },

        // ## **`myTSL.setGain( g )`**
        // Set the gain of the sensor using the value of parameter `g`.
        // Allowed values for `g` and their meanings are:
        // * `Adafruit_TSL2561.TSL2561_GAIN_0X` No gain  - set no gain (for bright situations)
        // * `Adafruit_TSL2561.TSL2561_GAIN_16X` 16x gain - set 16x gain (for dim situations)
        setGain: function (g) {
            if (g === Adafruit_TSL2561.TSL2561_GAIN_0X
                || g === Adafruit_TSL2561.TSL2561_GAIN_16X
            ) {
                Adafruit_TSL2561._sGn(this.tsl, g);
            } else {
                print('ERROR:  api_arduino_tsl256.setGain(', g, ') - unsupported value.');
            }
        },

        // ## **`myTSL.calculateLux( ch0, ch1 )`**
        // Uses the formula supplied in the sensor datasheet to calculate Lux for the supplied values of
        // channel 0 (ch0) and channel 1 (ch1).
        // Return value:  the calculated Lux
        calculateLux: function (ch0, ch1) {
            return Adafruit_TSL2561._cLx(this.tsl, ch0, ch1);
        }

    },

    // ## **`Adafruit_TSL2561.create( addr )`**
    // Create an Adafruit_TSL2561 instance on I2C bus.  Supported i2c addresses are:
    // * `Adafruit_TSL2561.TSL2561_ADDR_LOW` (0x29)
    // * `Adafruit_TSL2561.TSL2561_ADDR_FLOAT` (0x39 - default if addr not specified).
    // * `Adafruit_TSL2561.TSL2561_ADDR_HIGH` (0x49)
    // Return value: an object representing the TSL2561 sensor with the methods defined in _proto: {...} (above).
    create: function (addr) {
        let obj = null;
        if (!addr) {
            addr = Adafruit_TSL2561.TSL2561_ADDR_FLOAT;
            print('TSL2561:  addr not specified - defaulting to ', Adafruit_TSL2561.TSL2561_ADDR_FLOAT);
        }
        if (addr === Adafruit_TSL2561.TSL2561_ADDR_FLOAT
            || addr === Adafruit_TSL2561.TSL2561_ADDR_HIGH
            || addr === Adafruit_TSL2561.TSL2561_ADDR_LOW
        ) {
            obj = Object.create(Adafruit_TSL2561._proto);
            obj.tsl = Adafruit_TSL2561._create(addr);
        } else {
            print('ERROR: ', addr, ' is not a valid i2c address for TSL2561 sensor.');
            return null;
        }
        return obj;
    }

};
