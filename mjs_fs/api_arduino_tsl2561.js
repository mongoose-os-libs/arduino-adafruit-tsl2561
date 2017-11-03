let Adafruit_TSL2561 = {

    // I2C address options
    TSL2561_ADDR_LOW: 0x29,
    TSL2561_ADDR_FLOAT: 0x39,
    TSL2561_ADDR_HIGH: 0x49,

    _create: ffi('void *mgos_tsl2561_create(void)'),
    _begin: ffi('int mgos_tsl2561_begin(void *)'),

    _proto: {

        begin: function () {
            return Adafruit_TSL2561._begin(this.tsl);
        },

    },

    create: function () {
        let obj = Object.create(Adafruit_TSL2561._proto);
        // Initialize Adafruit_TSL2561 library.
        // Return value: handle opaque pointer.
        obj.tsl = Adafruit_TSL2561._create();
        return obj;
    },

};
