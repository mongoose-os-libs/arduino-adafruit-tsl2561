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


Adafruit_TSL2561_Unified *mgos_tsl2561_create();

int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl);

boolean mgos_tsl2561_init();

/* TSL2561 Functions */
void mgos_tsl2561_enableAutoRange(bool enable);

void mgos_tsl2561_setIntegrationTime(tsl2561IntegrationTime_t time);

void mgos_tsl2561_setGain(tsl2561Gain_t gain);

void mgos_tsl2561_getLuminosity(uint16_t *broadband, uint16_t *ir);

uint32_t mgos_tsl2561_calculateLux(uint16_t broadband, uint16_t ir);

/* Unified Sensor API Functions */
bool mgos_tsl2561_getEvent(sensors_event_t *);

void mgos_tsl2561_getSensor(sensor_t *);


#ifdef __cplusplus
}
#endif

#endif //ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
