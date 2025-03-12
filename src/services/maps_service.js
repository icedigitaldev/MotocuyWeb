import { logInfo, logError } from '@/utils/logger.js';
import { getEmergencyCodeFromUrl, watchEmergencyLocationRealtime } from '@/services/emergency_service.js';

let googleMapsPromise = null;
let emergencyMarker = null;
let map = null;
let locationWatchUnsubscribe = null;

export { emergencyMarker, map };

export const loadGoogleMapsAPI = () => {
    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    if (window.google && window.google.maps && window.google.maps.marker) {
        return Promise.resolve();
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        try {
            const apiKey = 'AIzaSyCqeDMZ3EMF5NKGTZjFcAmsc18Vfq45_Xo';
            const callbackName = 'googleMapsInitCallback_' + Math.random().toString(36).substring(2, 15);

            window[callbackName] = () => {
                resolve();
                delete window[callbackName];
            };

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}&loading=async&libraries=marker&v=beta`;
            script.defer = true;
            script.async = true;

            script.onerror = (error) => {
                googleMapsPromise = null;
                reject(error);
                logError("Error al cargar el script de Google Maps");
            };

            document.head.appendChild(script);
        } catch (error) {
            googleMapsPromise = null;
            reject(error);
            logError("Error al preparar carga de API: " + error.message);
        }
    });

    return googleMapsPromise;
};

export const updateEmergencyMarker = (newPosition, title = 'Punto de emergencia') => {
    if (!newPosition) return false;

    if (map) {
        if (!emergencyMarker) {
            // Crear el marcador si no existe
            try {
                emergencyMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: newPosition,
                    map: map,
                    title: title
                });
                logInfo("Marcador de emergencia creado");
            } catch (error) {
                logError("Error al crear marcador de emergencia: " + error.message);
                return false;
            }
        } else {
            // Actualizar marcador existente
            emergencyMarker.position = newPosition;
            emergencyMarker.title = title;
        }

        map.setCenter(newPosition);
        logInfo(`Marcador de emergencia actualizado: Lat ${newPosition.lat}, Lng ${newPosition.lng}`);
        return true;
    }

    logError("No se pudo actualizar el marcador de emergencia - mapa no inicializado");
    return false;
};

export const startEmergencyTracking = (router) => {
    const emergencyCode = getEmergencyCodeFromUrl();
    if (!emergencyCode) {
        logInfo("No se encontró código de emergencia en la URL");
        if (router) {
            router.push('/');
        } else {
            window.location.href = '/';
        }
        return false;
    }

    if (locationWatchUnsubscribe) {
        locationWatchUnsubscribe();
    }

    logInfo(`Iniciando seguimiento del código de emergencia: ${emergencyCode}`);
    locationWatchUnsubscribe = watchEmergencyLocationRealtime(emergencyCode, (location) => {
        if (location) {
            updateEmergencyMarker(location);
        } else if (router) {
            router.push('/');
        } else {
            window.location.href = '/';
        }
    });

    return true;
};

export const initializeMap = (mapContainer, router) => {
    return new Promise((resolve, reject) => {
        try {
            if (!mapContainer) {
                reject(new Error("Contenedor de mapa no disponible"));
                return;
            }

            map = new google.maps.Map(mapContainer, {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                fullscreenControl: true,
                mapTypeControl: true,
                mapId: '3142516602f19200'
            });

            const hasEmergencyCode = startEmergencyTracking(router);

            if (!hasEmergencyCode) {
                logInfo("Sin código de emergencia, redirección necesaria");
                reject(new Error("No hay código de emergencia disponible"));
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userCoordinates = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        map.setCenter(userCoordinates);

                        new google.maps.marker.AdvancedMarkerElement({
                            position: userCoordinates,
                            map: map,
                            title: 'Tu ubicación actual'
                        });

                        logInfo("Mapa inicializado - Ubicación actual del usuario");
                        resolve(map);
                    },
                    (error) => {
                        logError(`Error al obtener la ubicación: ${error.message}`);
                        reject(new Error("Error de geolocalización"));
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                logError("Geolocalización no soportada por este navegador");
                reject(new Error("Geolocalización no soportada"));
            }
        } catch (error) {
            logError("Error al inicializar mapa: " + error.message);
            reject(error);
        }
    });
};