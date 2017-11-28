#include "mgos_arduino_adafruit_tsl2561.h"


TSL2561 *mgos_tsl2561_create(uint8_t addr = TSL2561_ADDR_FLOAT) {
    return new TSL2561(addr);
}

int mgos_tsl2561_begin(TSL2561 *tsl) {
    if (tsl == nullptr) return 0;
    return tsl->begin();
}

void mgos_tsl2561_enable(TSL2561 *tsl) {
    if (tsl != nullptr) {
        tsl->enable();
    }
}

void mgos_tsl2561_disable(TSL2561 *tsl) {
    if (tsl != nullptr) {
        tsl->disable();
    }
}

int mgos_tsl2561_getLuminosity(TSL2561 *tsl, int lumo) {
    return (tsl == nullptr) ? -1 : tsl->getLuminosity(lumo);
}

int mgos_tsl2561_getFullLuminosity(TSL2561 *tsl) {
    return (tsl == nullptr) ? -1 : tsl->getFullLuminosity();
}

void mgos_tsl2561_setIntegrationTime(TSL2561 *tsl, int time) {
    if (tsl != nullptr) {
        tsl->setTiming((tsl2561IntegrationTime_t) time);
    }
}

void mgos_tsl2561_setGain(TSL2561 *tsl, int gain) {
    if (tsl != nullptr) {
        tsl->setGain((tsl2561Gain_t) gain);
    }
}

uint32_t mgos_tsl2561_calculateLux(TSL2561 *tsl, uint16_t ch0, uint16_t ch1) {
    return (tsl == nullptr) ? -1 : tsl->calculateLux(ch0, ch1);
}

void mgos_tsl2561_close(TSL2561 *tsl) {
    if (tsl != nullptr) {
        delete tsl;
        tsl = nullptr;
    }
}

