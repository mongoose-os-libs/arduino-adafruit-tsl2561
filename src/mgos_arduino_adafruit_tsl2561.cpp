#include "mgos_arduino_adafruit_tsl2561.h"


Adafruit_TSL2561_Unified *mgos_tsl2561_create(uint8_t addr, int32_t sensorID = 2561) {
    return new Adafruit_TSL2561_Unified(addr, sensorID);
}

Adafruit_TSL2561_Unified *mgos_tsl2561_create() {
    return new Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT);
}

int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl) {
    if (tsl == nullptr) return 0;
    return tsl->begin();
}

void mgos_tsl2561_close(Adafruit_TSL2561_Unified *tsl) {
    if (tsl != nullptr) {
        delete tsl;
        tsl = nullptr;
    }
}

int mgos_tsl2561_begin(Adafruit_TSL2561_Unified *tsl, int addr) {
    if (tsl == nullptr) return 0;
    return tsl->begin();
}
