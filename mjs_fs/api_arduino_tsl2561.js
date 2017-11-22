let Adafruit_TSL2561 = {

    // I2C address options
    TSL2561_ADDR_LOW: 0x29,
    TSL2561_ADDR_FLOAT: 0x39, // default
    TSL2561_ADDR_HIGH: 0x49,

    TSL2561_INTEGRATIONTIME_13MS: 0x00,      // 13.7ms
    TSL2561_INTEGRATIONTIME_101MS: 0x01,     // 101ms - default
    TSL2561_INTEGRATIONTIME_402MS: 0x02,     // 402ms

    TSL2561_GAIN_1X: 0x00,    // No gain
    TSL2561_GAIN_16X: 0x10,    // 16x gain

    _create: ffi('void *mgos_tsl2561_create(int, int)'),
    _begin: ffi('int mgos_tsl2561_begin(void *)'),
    _enAut: ffi('void mgos_tsl2561_enableAutoRange(void *, int)'),
    _sInTm: ffi('void mgos_tsl2561_setIntegrationTime(void *, int)'),
    _sGn: ffi('void mgos_tsl2561_setGain(void *, int)'),
    _gLum: ffi('void mgos_tsl2561_getLuminosity(void *, int, int)'),
    _cLux: ffi('int mgos_tsl2561_calculateLux(void *, int, int)'),
    _close: ffi('void mgos_tsl2561_close(void *)'),

    _proto: {

        // fields to hold current sensor readings
        broadband: 0,
        ir: 0,
        lux: 0,

        // functions
        begin: function () {
            return Adafruit_TSL2561._begin(this.tsl);
        },

        enableAutoRange: function (enable) {
            Adafruit_TSL2561._enAut(this.tsl, enable);
        },

        setIntegrationTime: function (time) {
            // Note:  as of 11/22/2017 switch is not implemented in mjs...
            //        so no error checking on supplied value of time
            // switch(time) {
            //     case Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_13MS:
            //     case Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_101MS:
            //     case Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_402MS:
            //         break;
            //     default:
            //         time = Adafruit_TSL2561.TSL2561_INTEGRATIONTIME_101MS;
            // }

            Adafruit_TSL2561._sInTm(this.tsl, time);
        },

        setGain: function (gain) {
            // switch(gain) {
            //     case Adafruit_TSL2561.TSL2561_GAIN_1X:
            //     case Adafruit_TSL2561.TSL2561_GAIN_16X:
            //         break;
            //     default:
            //         gain = Adafruit_TSL2561.TSL2561_GAIN_1X;
            // }
            Adafruit_TSL2561._sGn(this.tsl, gain);
        },

        getLuminosity: function () {
            Adafruit_TSL2561._gLum(this.tsl, this.broadband, this.ir);
        },

        calculateLux: function () {
            if (this.broadband === 0 && this.ir === 0) {
                this.getLuminosity();
            }
            this.lux = Adafruit_TSL2561._cLux(this.tsl, this.broadband, this.ir);
            return this.lux;
        },

        close: function () {
            Adafruit_TSL2561._close(this.tsl);
        }


// Adafruit_TSL2561_Unified *mgos_tsl2561_create();
//
// int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl);
//
// boolean mgos_tsl2561_init();
//
// /* TSL2561 Functions */
// void mgos_tsl2561_enableAutoRange(bool enable);
//
// void mgos_tsl2561_setIntegrationTime(tsl2561IntegrationTime_t time);
//
// void mgos_tsl2561_setGain(tsl2561Gain_t gain);
//
// void mgos_tsl2561_getLuminosity(uint16_t *broadband, uint16_t *ir);
//
// uint32_t mgos_tsl2561_calculateLux(uint16_t broadband, uint16_t ir);
//
// /* Unified Sensor API Functions */
// bool mgos_tsl2561_getEvent(sensors_event_t *);
//
// void mgos_tsl2561_getSensor(sensor_t *);


//         class Adafruit_TSL2561_Unified : public Adafruit_Sensor {
//     public:
//         Adafruit_TSL2561_Unified(uint8_t addr, int32_t sensorID = -1);
//
//     boolean begin(void);
//
//     boolean begin(TwoWire *theWire);
//
//     boolean init();
//
//     /* TSL2561 Functions */
//     void enableAutoRange(bool enable);
//
//     void setIntegrationTime(tsl2561IntegrationTime_t time);
//
//     void setGain(tsl2561Gain_t gain);
//
//     void getLuminosity(uint16_t *broadband, uint16_t *ir);
//
//     uint32_t calculateLux(uint16_t broadband, uint16_t ir);
//
//     /* Unified Sensor API Functions */
//     bool getEvent(sensors_event_t *);
//
//     void getSensor(sensor_t *);


    },

    create: function (i2cAddr /* i2c address of sensor */, sensorAppId /* any integer you want - I default to 2561 */) {
        let obj = Object.create(Adafruit_TSL2561._proto);
        // set default parameter values
        let adr = (i2cAddr) ? i2cAddr : Adafruit_TSL2561.TSL2561_ADDR_FLOAT;
        let apId = (sensorAppId) ? sensorAppId : 2561;
        // Initialize Adafruit_TSL2561 library.
        // Return value: handle opaque pointer.
        obj.tsl = Adafruit_TSL2561._create(Adafruit_TSL2561.getI2CAddress(i2cAddr), apId);
        return obj;
    },

    getI2CAddress: function (i2cAddr) {
        if (!i2cAddr) {
            i2cAddr = Adafruit_TSL2561.TSL2561_ADDR_FLOAT;
        }
        // Note:  as of 11/22/2017 switch is not implemented in mjs...
        //        so no error checking on supplied value of i2cAddr
        // switch (i2cAddr) {
        //     case Adafruit_TSL2561.TSL2561_ADDR_FLOAT:
        //     case Adafruit_TSL2561.TSL2561_ADDR_HIGH:
        //     case Adafruit_TSL2561.TSL2561_ADDR_LOW:
        //         break;
        //     default:
        //         i2cAddr = Adafruit_TSL2561.TSL2561_ADDR_FLOAT;
        // }
        return i2cAddr;
    },

    getBroadband: function () {
        return this.broadband;
    },

    getInfrared: function () {
        return this.ir;
    },

    getLux: function () {
        return this.lux;
    }

};
