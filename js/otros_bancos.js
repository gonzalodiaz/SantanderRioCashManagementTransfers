function OtrosBancos() {
    this.id = Date.now();
    this.tipo_transferencia = 3;
    this.importe = 0.00;
    this.descripcion = "";
    this.cbu = "";
    this.codigo_concepto_transferencia = "VAR";
    this.cuit = "";
    this.tipos_cuenta_destino = [
        {"key": "1", "tipo": "Cuenta Corriente Propia"},
        {"key": "2", "tipo": "Cuenta Corriente de Terceros"},
        {"key": "3", "tipo": "Otra Cuenta"},
        {"key": "4", "tipo": "Otra Cuenta de Terceros"}
    ];
    this.tipo_cuenta_destino = this.tipos_cuenta_destino[3].key;
    this.informacion_adicional = "";
};

/*
*   importe,
*   descripcion,
*   cbu,
*   codigo_concepto_transferencia,
*   informacion_adicional,
*   cuit,
*   tipo_cuenta_destino
*/
OtrosBancos.prototype.fill = function(args) {
    this.importe = args.importe;
    this.descripcion = args.descripcion;
    this.cbu = args.cbu.toString(),
    this.codigo_concepto_transferencia = args.codigo_concepto_transferencia;
    this.cuit = args.cuit,
    this.tipo_cuenta_destino = args.tipo_cuenta_destino;
    this.informacion_adicional = args.informacion_adicional;
};

OtrosBancos.prototype.getFormattedImporte = function() {
    return formatImporte(this.getImporte());
};

OtrosBancos.prototype.getImporte = function ( ) {
    return parseFloat(this.importe);
};

OtrosBancos.prototype.getBody = function() {
    return [
        "I",
        this.tipo_transferencia,
        this.getFormattedImporte(),
        this.descripcion.slice(0, 20),
        this.cbu,
        this.codigo_concepto_transferencia,
        this.informacion_adicional.slice(0, 20),
        pad(this.cuit, 11),
        pad(this.tipo_cuenta_destino, 1),
    ];
}

OtrosBancos.prototype.getFormattedBody = function() {
    return this.getBody().join(";");
};
