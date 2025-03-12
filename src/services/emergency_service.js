import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase_service.js';
import { logInfo, logError } from '@/utils/logger.js';

export const watchEmergencyLocationRealtime = (emergencyCode, callback) => {
    if (!emergencyCode) {
        logError("Código de emergencia no proporcionado para seguimiento en tiempo real");
        return null;
    }

    logInfo(`Iniciando seguimiento en tiempo real para código: ${emergencyCode}`);
    const emergencyRef = doc(db, "emergency", emergencyCode);

    // Retorna la función unsubscribe que puede usarse para detener la escucha
    return onSnapshot(emergencyRef,
        (doc) => {
            if (doc.exists()) {
                const emergencyData = doc.data();
                if (emergencyData.lastLocation) {
                    logInfo(`Actualización en tiempo real - Ubicación: Lat ${emergencyData.lastLocation.lat}, Lng ${emergencyData.lastLocation.lng}`);
                    callback(emergencyData.lastLocation);
                } else {
                    logError("Actualización sin datos de ubicación");
                    callback(null);
                }
            } else {
                logError("El documento de emergencia ya no existe");
                callback(null);
            }
        },
        (error) => {
            logError(`Error en seguimiento en tiempo real: ${error.message}`);
            callback(null);
        }
    );
};

export const getEmergencyCodeFromUrl = () => {
    try {
        // Extraer de hash (#ref=codigo)
        const hash = window.location.hash;
        logInfo(`Hash de URL: ${hash}`);

        if (hash && hash.includes('ref=')) {
            const code = hash.split('ref=')[1];
            logInfo(`Código de emergencia extraído: ${code}`);
            return code;
        }

        logError("No se encontró código de emergencia en la URL");
        return null;
    } catch (error) {
        logError(`Error al extraer código: ${error.message}`);
        return null;
    }
};