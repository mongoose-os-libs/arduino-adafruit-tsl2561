//
// Created by pedalPusher68 <bradley.1.smith@gmail.com> on 11/10/17.
//

#ifndef ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
#define ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H

#include <Adafruit_Sensor.h>
#include "Adafruit_TSL2561_U.h"

#ifdef __cplusplus
extern "C" {
#endif


Adafruit_TSL2561_Unified *mgos_tsl2561_create(uint8_t addr, int32_t sensorID);

int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl);

/* TSL2561 Functions */
void mgos_tsl2561_enableAutoRange(Adafruit_TSL2561_Unified *tsl, bool enable);

void mgos_tsl2561_setIntegrationTime(Adafruit_TSL2561_Unified *tsl, int time);

void mgos_tsl2561_setGain(Adafruit_TSL2561_Unified *tsl, int gain);

void mgos_tsl2561_getLuminosity(Adafruit_TSL2561_Unified *tsl, uint16_t broadband, uint16_t ir);

uint32_t mgos_tsl2561_calculateLux(Adafruit_TSL2561_Unified *tsl, uint16_t broadband, uint16_t ir);

/* Unified Sensor API Functions */

void mgos_tsl2561_getSensor(sensor_t *);

// Other stuff
void mgos_tsl2561_close(Adafruit_TSL2561_Unified *tsl);


#ifdef __cplusplus
}
#endif

#endif //ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
