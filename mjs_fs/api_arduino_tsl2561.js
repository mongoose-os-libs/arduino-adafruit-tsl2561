let Adafruit_TSL2561 = {

    // I2C address options
    TSL2561_ADDR_LOW: 0x29,
    TSL2561_ADDR_FLOAT: 0x39,   // Default i2c address for sensor
    TSL2561_ADDR_HIGH: 0x49,

    //
    TSL2561_VISIBLE: 2,              // channel 0 - channel 1
    TSL2561_INFRARED: 1,              // channel 1
    TSL2561_FULLSPECTRUM: 0,              // channel 0

    //
    TSL2561_INTEGRATIONTIME_13MS: 0x00,  // 13.7ms - shortest integration time (bright light)
    TSL2561_INTEGRATIONTIME_101MS: 0x01, // 101ms  - medium integration time (medium light)
    TSL2561_INTEGRATIONTIME_402MS: 0x02, // 402ms  - ongest integration time (dim light)

    TSL2561_GAIN_0X: 0x00,     // No gain  - set no gain (for bright situtations)
    TSL2561_GAIN_16X: 0x10,    // 16x gain - set 16x gain (for dim situations)

    _create: ffi('void *mgos_tsl2561_create(int)'),
    _bgn: ffi('int mgos_tsl2561_begin(void *)'),
    _gLum: ffi('int mgos_tsl2561_getLuminosity(void *, int)'),
    _gFLm: ffi('int mgos_tsl2561_getFullLuminosity(void *)'),
    _sInT: ffi('void mgos_tsl2561_setIntegrationTime(void *, int)'),
    _sGn: ffi('void mgos_tsl2561_setGain(void *, int)'),
    _cLx: ffi('int mgos_tsl2561_calculateLux(void *, int, int)'),

    _proto: {

        begin: function () {
            return Adafruit_TSL2561._bgn(this.tsl);
        },

        getLuminosity: function (lumo) {
            if (lumo === Adafruit_TSL2561.TSL2561_VISIBLE
                || lumo === Adafruit_TSL2561.TSL2561_INFRARED
                || lumo === Adafruit_TSL2561.TSL2561_FULLSPECTRUM
            ) {
                return Adafruit_TSL2561._gLum(this.tsl, lumo);
            }
            return -1;

        },

        // Convenience functions:
        getVisible: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_VISIBLE);
        },

        getInfrared: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_INFRARED);
        },

        getFullSpectrum: function () {
            return Adafruit_TSL2561._gLum(this.tsl, Adafruit_TSL2561.TSL2561_FULLSPECTRUM);
        },

        getFullLuminosity: function () {
            return Adafruit_TSL2561._gFLm(this.tsl);
        },

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

        setGain: function (g) {
            if (g === Adafruit_TSL2561.TSL2561_GAIN_0X
                || g === Adafruit_TSL2561.TSL2561_GAIN_16X
            ) {
                Adafruit_TSL2561._sGn(this.tsl, g);
            } else {
                print('ERROR:  api_arduino_tsl256.setGain(', g, ') - unsupported value.');
            }
        },

        calculateLux: function (ch0, ch1) {
            return Adafruit_TSL2561._cLx(this.tsl, ch0, ch1);
        }

    },

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
            // Initialize Adafruit_TSL2561 library.
            // Return value: handle opaque pointer.
            obj.tsl = Adafruit_TSL2561._create(addr);
        } else {
            print('ERROR: ', addr, ' is not a valid i2c address for TSL2561 sensor.');
            return null;
        }
        return obj;
    }

};
