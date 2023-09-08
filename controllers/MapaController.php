<?php
namespace Controllers;

use Model\Coordenada;
use Exception;
use MVC\Router;

class MapaController {
    public static function index(Router $router) {
        $coordenadas = static::coordenadas();
        $router->render('mapa/index', [
            'coordenadas' => $coordenadas,
        ]);
    }

    public static function coordenadas() {
        $sql = "SELECT * FROM coordenadas WHERE coord_situacion = '1'";
        try {
            $coordenadas = Coordenada::fetchArray($sql);
            return $coordenadas ?: [];
        } catch (Exception $e) {
            return [];
        }
    }

    public static function buscarAPI() {
        $coord_nombre = $_GET['coord_nombre'] ?? '';
        $sql = "SELECT * FROM coordenadas WHERE coord_situacion = '1' AND coord_nombre LIKE '%$coord_nombre%';";
   

        try {

            $mapas = Coordenada::fetchArray($sql);

            echo json_encode($mapas);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrió un error',
                'codigo' => 0
            ]);
        }
    }
}
?>
