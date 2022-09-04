<?php
$arr = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

$dateActual = new DateTime();


$date = DateTime::createFromFormat('!m', 3);
$monthName = $date->format('F');
$echo ($monthName);
/**    let fecha = new Date();
    fecha.getMonth();
    console.log( fecha.getMonth() + " mes" + fecha.getFullYear() + " año"); //sumar un mes y uno al año */
?>