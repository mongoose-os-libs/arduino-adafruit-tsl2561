//
// Created by pedalPusher68 <bradley.1.smith@gmail.com> on 11/10/17.
//
#ifndef ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
#define ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H

#ifdef __cplusplus
#include "TSL2561.h"
#else
typedef struct TSL2561Tag TSL2561;
#endif

#ifndef TSL2561_ADDR_LOW
#define TSL2561_ADDR_LOW  0x29
#endif
#ifndef TSL2561_ADDR_FLOAT
#define TSL2561_ADDR_FLOAT 0x39
#endif
#ifndef TSL2561_ADDR_HIGH
#define TSL2561_ADDR_HIGH 0x49
#endif

#ifndef TSL2561_VISIBLE
#define TSL2561_VISIBLE 2                   // channel 0 - channel 1
#endif
#ifndef TSL2561_INFRARED
#define TSL2561_INFRARED 1                  // channel 1
#endif
#ifndef TSL2561_FULLSPECTRUM
#define TSL2561_FULLSPECTRUM 0              // channel 0
#endif


#ifdef __cplusplus
extern "C" {
#endif

/*
 * TSL2561 sensor I2C address is one of:
 *
 * - 0x29 - `TSL2561_ADDR_LOW`
 * - 0x39 - `TSL2561_ADDR_FLOAT` (default for many sensors; e.g. Adafruit TSL2561 breakout board)
 * - 0x49 - `TSL2561_ADDR_HIGH`
 *
 * consult your wiring to determine which of these addresses to use in your app.
 * In your code, to initialize and obtain a handle to the TSL2561 sensor, write code something
 * like this:
 *
 * ```c
 * TSL2561 *tsl2561;
 * ...
 * ...
 * tsl2561 = mgos_tsl2561_create(TSL2561_ADDR_FLOAT);
 * mgos_tsl2561_begin(tsl2561);
 * ```
 */

/*
 * Initialize Adafruit TSDL2561 library for sensor at address `addr`.  Address can be one of
 * `TSL2561_ADDR_LOW`, `TSL2561_ADDR_FLOAT`, or `TSL2561_ADDR_HIGH`.  See above and your datasheet
 * and/or your wiring guide to determine which address value to use for your application.
 *
 * Return value: opaque pointer handle to C++ TSL2561 class.
 */
TSL2561 *mgos_tsl2561_create(uint8_t addr);

/* TSL2561 Functions */

/*
 * Checks that the sensor exists at the address it was created on and applies default settings for
 * gain and integration timing.
 *
 * Returns 1 (true) if the above actions were successful, 0 (false) otherwise.
 */
int mgos_tsl2561_begin(TSL2561 *tsl);

/*
 * Send a command to sensor to enable it
 */
void mgos_tsl2561_enable(TSL2561 *tsl);

/*
 * Send a command to the sensor to disable it
 */
void mgos_tsl2561_disable(TSL2561 *tsl);

/*
 * Get the luminosity of the desired channel.
 *
 * Supported channel values:
 * - 0 or `TSL2561_FULLSPECTRUM` - visible + infrared
 * - 1 or `TSL2561_INFRARED` - infrared
 * - 2 or `TSL2561_VISIBLE` - visible
 *
 * Returns -1 for any error.
 *
 */
int mgos_tsl2561_getLuminosity(TSL2561 *tsl, int channel);

/*
 * Return the value of both channels in a 32-bit unsigned integer.  The upper (lower)
 * 16 bits contain value of channel 1 (channel 0).
 */
int mgos_tsl2561_getFullLuminosity(TSL2561 *tsl);

/*
 * Sets the sensor integration time.  Allowed values are:
 * - 0x00 or `TSL2561_INTEGRATIONTIME_13MS` - 13.7 ms - use w. no gain and bright light conditions
 * - 0x01 or `TSL2561_INTEGRATIONTIME_101MS` - 101 ms - use w. either gain setting and med. light conditions
 * - 0x02 or `TSL2561_INTEGRATIONTIME_402MS` - 402 ms - use w. 16x gain and low light conditions
 */
void mgos_tsl2561_setIntegrationTime(TSL2561 *tsl, int timing);

/*
 * Sets the sensor gain.  Allowed values are:
 * - 0x00 or `TSL2561_GAIN_0X` - no gain, use for bright lighting conditions
 * - 0x10 or `TSL2561_GAIN_16X` - 16x gain, low light conditions
 */
void mgos_tsl2561_setGain(TSL2561 *tsl, int gain);

/*
 * Convert sensor reading into lux value.
 */
uint32_t mgos_tsl2561_calculateLux(TSL2561 *tsl, uint16_t ch0, uint16_t ch1);

/*
 * Delete TSL2561 handle and its resources.
 */
void mgos_tsl2561_close(TSL2561 *tsl);

// TODO - implement the following
//void mgos_tsl2561_enableAutoRange(TSL2561 *tsl, bool enable);

#ifdef __cplusplus
}
#endif

#endif //ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
