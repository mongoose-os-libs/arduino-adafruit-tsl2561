//
// Created by pedalPusher68 <bradley.1.smith@gmail.com> on 11/10/17.
//

#ifndef ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
#define ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H

#include "TSL2561.h"

#ifdef __cplusplus
extern "C" {
#endif

TSL2561 *mgos_tsl2561_create(uint8_t addr);

/* TSL2561 Functions */
int mgos_tsl2561_begin(TSL2561 *tsl);

//void mgos_tsl2561_enableAutoRange(TSL2561 *tsl, bool enable);
void mgos_tsl2561_enable(TSL2561 *tsl);

void mgos_tsl2561_disable(TSL2561 *tsl);

int mgos_tsl2561_getLuminosity(TSL2561 *tsl, int lumo);

int mgos_tsl2561_getFullLuminosity(TSL2561 *tsl);

void mgos_tsl2561_setIntegrationTime(TSL2561 *tsl, int timing);

void mgos_tsl2561_setGain(TSL2561 *tsl, int gain);

uint32_t mgos_tsl2561_calculateLux(TSL2561 *tsl, uint16_t ch0, uint16_t ch1);

// Other stuff
void mgos_tsl2561_close(TSL2561 *tsl);

#ifdef __cplusplus
}
#endif

#endif //ARDUINO_ADAFRUIT_TSL2561_MGOS_ARDUINO_ADAFRUIT_TSL2561_H
