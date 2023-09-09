<div class="row justify-content-center mb-3">
    <div class="col-lg-11 p-3">
        <form class="col-lg-8" id="formularioCoordenadas" style="background: transparent; border: none; padding: 0;">
            <input type="hidden" name="coord_id" id="coord_id ">

            <div class="row mb-3">

                <div class="col-3">
                    <button type="button" id="btnBuscar" class="btn btn-info w-100">Buscar</button>
                </div>
                <div class="col-3">
                    <a href="/leaflet/mapa">
                        <button type="button" id="btnReiniciar" class="btn btn-warning w-100">Reiniciar</button>
                    </a>
                </div>

            </div>
        </form>





        <div class="row">
            <div class="col-lg-12 p-3 border rounded" id="map" style="height: 60vh; min-height: auto;">

            </div>
        </div>
    </div>
</div>

<script src="<?= asset('build/js/mapa/index.js') ?>"></script>