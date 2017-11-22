#include "mgos_arduino_adafruit_tsl2561.h"


Adafruit_TSL2561_Unified *mgos_tsl2561_create(uint8_t addr = TSL2561_ADDR_FLOAT, int32_t sensorID = 2561) {
    return new Adafruit_TSL2561_Unified(addr, sensorID);
}

int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl) {
    if (tsl == nullptr) return 0;
    return tsl->begin();
}

void mgos_tsl2561_enableAutoRange(Adafruit_TSL2561_Unified *tsl, bool enable) {
    if (tsl != nullptr) {
        tsl->enableAutoRange(enable);
    }
}

void mgos_tsl2561_setIntegrationTime(Adafruit_TSL2561_Unified *tsl, int time) {
    if (tsl != nullptr) {
        tsl2561IntegrationTime_t t = (time) ? (tsl2561IntegrationTime_t) time : TSL2561_INTEGRATIONTIME_101MS;
        tsl->setIntegrationTime(t);
    }
}

void mgos_tsl2561_setGain(Adafruit_TSL2561_Unified *tsl, int gain) {
    if (tsl != nullptr) {
        tsl->setGain((tsl2561Gain_t) gain);
    }
}

void mgos_tsl2561_getLuminosity(Adafruit_TSL2561_Unified *tsl, uint16_t broadband, uint16_t ir) {
    if (tsl != nullptr) {
        tsl->getLuminosity(&broadband, &ir);
    }
}

uint32_t mgos_tsl2561_calculateLux(Adafruit_TSL2561_Unified *tsl, uint16_t broadband, uint16_t ir) {
    if (tsl != nullptr) {
        return tsl->calculateLux(broadband, ir);
    }
    return -1;
}

void mgos_tsl2561_getSensor(sensor_t *) {
    // NO OP
}

void mgos_tsl2561_close(Adafruit_TSL2561_Unified *tsl) {
    if (tsl != nullptr) {
        delete tsl;
        tsl = nullptr;
    }
}

