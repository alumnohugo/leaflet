<?php
namespace Model;

class  Coordenada extends ActiveRecord{
    protected static $tabla = 'coordenadas';
    protected static $columnasDB = ['coord_nombre','latitud','longitud','coor_situacion'];
    protected static $idTabla = 'coord_id';


    public $coord_id;
    public $coord_nombre;
    public $latitud;
    public $longitud;
    public $coor_situacion;
    
    public function __construct($args =[])
    {
        $this->coord_id = $args['coord_id'] ?? null;
        $this->coord_nombre = $args['coord_nombre'] ?? '';
        $this->latitud = $args['latitud'] ?? '';
        $this->longitud = $args['longitud'] ?? '';
        $this->coor_situacion = $args['coor_situacion'] ??  1;
        
        
    }
}

?>