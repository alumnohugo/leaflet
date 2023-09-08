import { data } from "jquery";
import L from "leaflet"
import { validarFormulario, Toast, confirmacion } from "../funciones";
const formulario = document.getElementById('formularioCoordenadas');
const btnBuscar = document.getElementById('btnBuscar');
const map = L.map('map', {
    center: [15.525158, -90.32959],
    zoom: 7,
})

const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const markerLayer = L.layerGroup(); 

const icon = L.icon({
    iconUrl : './images/cit.png',
    iconSize : [35, 35]
})

const marker = L.marker([15.525158, -90.32959],{
    icon
}).addTo(markerLayer)

var tooltip = L.tooltip()
    .setLatLng([15.525158, -90.32959])
    .setContent('UBICACION INICIAL')
    .addTo(map);


    var popup = L.popup()
    .setLatLng([15.525158, -90.32959])
    .setContent('<p>Hola esta es la ubicacion de la base de datos!<br />EJERCICIO DE EJEMPLO .</p>')

    marker.bindPopup(popup)

    // const coordenadas = [
    //     [14.1, -90.5],
    //     [14.3, -90.8],
    //     [14.6, -90.9],
    //     [15.0, -90.6],
    //     [15.3, -90.7]
    //   ];
 
    
  
   
    const buscar = async () => {
        const url = `/leaflet/API/mapas/buscar`;
        const config = {
            method: 'GET',
        };
    
        try {
            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
    
            // console.log(data);
            markerLayer.clearLayers();
    
            if (data && data.length > 0) {
            
                const coordinates = data.map(registro => {
                    const latitud = parseFloat(registro.latitud);
                    const longitud = parseFloat(registro.longitud);
                    if (!isNaN(latitud) && !isNaN(longitud)) {
                        return [latitud, longitud];
                    }
                    return null;
                }).filter(coordinate => coordinate !== null);
    
                if (coordinates.length > 0) {
                 
                    const bounds = L.latLngBounds(coordinates);
    
                    map.fitBounds(bounds);
                    
                    data.forEach(registro => {
                        const latitud = parseFloat(registro.latitud);
                        const longitud = parseFloat(registro.longitud);
    
                        if (!isNaN(latitud) && !isNaN(longitud)) {
                            const marcador = L.marker([latitud, longitud], {
                                icon: icon,
                                draggable: true
                            });
    
                            const popup = L.popup()
                                .setLatLng([latitud, longitud])
                                .setContent(`<p>Nombre: ${registro.coord_nombre}<br> ubicacion desde la db</p>`);
                            var tooltip = L.tooltip()
                                .setLatLng([latitud, longitud])
                                .setContent('UBICACIONES DESDE LA DB')
                                .addTo(map);
    
                            marcador.bindPopup(popup);
                            marcador.addTo(markerLayer);
                        }
                    });
    
                 
                    Toast.fire({
                        title: 'COORDENADAS ENCONTRADAS',
                        icon: 'success'
                    });
                } else {
                    Toast.fire({
                        title: 'No se encontraron registros válidos con coordenadas',
                        icon: 'info'
                    });
                }
            } else {
                Toast.fire({
                    title: 'No se encontraron registros',
                    icon: 'info'
                });
            }
    
        } catch (error) {
            console.error(error);
        }
    }
    
    
    
    // buscar();

// var polygon = L.polygon(coordenadas, {color: 'red'}).addTo(map);
// L.circle([14.6, -90.9], {radius: 5000}).addTo(map);
markerLayer.addTo(map)
btnBuscar.addEventListener('click', buscar);
