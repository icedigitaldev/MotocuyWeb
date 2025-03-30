import { logInfo, logError, logDebug } from '@/utils/logger.js';

let polyline = null;
let directionsService = null;

export const initializePolylineService = () => {
    if (!window.google || !window.google.maps) {
        logError("API de Google Maps no disponible para el servicio de polilíneas");
        return false;
    }

    try {
        directionsService = new google.maps.DirectionsService();
        logInfo("Servicio de direcciones inicializado correctamente");
        return true;
    } catch (error) {
        logError("Error al inicializar servicio de polilíneas: " + error.message);
        return false;
    }
};

export const drawRoute = (map, origin, destination) => {
    return new Promise((resolve, reject) => {
        if (!directionsService) {
            if (!initializePolylineService()) {
                reject(new Error("No se pudo inicializar el servicio de polilíneas"));
                return;
            }
        }

        // Limpiar la ruta anterior si existe
        if (polyline) {
            polyline.setMap(null);
        }

        const request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                // Crear la polilínea con la ruta
                const path = result.routes[0].overview_path;

                polyline = new google.maps.Polyline({
                    path: path,
                    geodesic: true,
                    strokeColor: '#0066FF', // Color azul para la ruta
                    strokeOpacity: 0.8,
                    strokeWeight: 5
                });

                polyline.setMap(map);
                logInfo("Ruta trazada exitosamente");
                resolve(result);
            } else {
                const errorMsg = `Error al obtener la ruta: ${status}`;
                logError(errorMsg);
                reject(new Error(errorMsg));
            }
        });
    });
};

export const drawRouteFromCoordinates = (map, originLat, originLng, destLat, destLng) => {
    const origin = { lat: parseFloat(originLat), lng: parseFloat(originLng) };
    const destination = { lat: parseFloat(destLat), lng: parseFloat(destLng) };
    return drawRoute(map, origin, destination);
};

export const clearRoute = () => {
    if (polyline) {
        polyline.setMap(null);
        polyline = null;
        logInfo("Ruta eliminada del mapa");
        return true;
    }
    return false;
};

export const fetchRouteDirectFromAPI = async (originLat, originLng, destLat, destLng) => {
    try {
        const apiKey = 'AIzaSyCqeDMZ3EMF5NKGTZjFcAmsc18Vfq45_Xo'; // En producción, usar variables de entorno
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        logInfo("Datos de ruta obtenidos directamente de la API");
        return data;
    } catch (error) {
        logError("Error al obtener ruta de la API: " + error.message);
        throw error;
    }
};