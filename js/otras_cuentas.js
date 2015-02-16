function SantanderOtrasCuentas () {
    this.id = Date.now();
    this.tipo_transferencia = 2;
    this.sucursal_destino = 0;
    this.numero_cuenta_destino = 0;
    this.tipos_cuenta_destino = [
        {"key": "00", "tipo": "Cuenta Corriente en Pesos"},
        {"key": "01", "tipo": "Caja de Ahorro en Pesos"},
        {"key": "03", "tipo": "Cuenta Corriente en Dolares"},
        {"key": "04", "tipo": "Caja de Ahorro en Dolares"},
        {"key": "09", "tipo": "Cuenta Unica en Pesos"},
        {"key": "10", "tipo": "Cuenta Unica en Dolares"}
    ];
    this.tipo_cuenta_destino = this.tipos_cuenta_destino[4].key;
    this.importe = 0.00;
    this.descripcion = "";
    this.codigo_concepto_transferencia = "VAR";
    this.informacion_adicional = "";
};

/*
*   sucursal_destino,
*   tipo_cuenta_destino,
*   numero_cuenta_destino,
*   importe,
*   descripcion,
*   codigo_concepto_transferencia,
*   informacion_adicional
*/
SantanderOtrasCuentas.prototype.fill = function ( args ) {
    this.sucursal_destino = args.sucursal_destino;
    this.numero_cuenta_destino = args.numero_cuenta_destino
    this.tipo_cuenta_destino = args.tipo_cuenta_destino;
    this.importe = args.importe;
    this.descripcion = args.descripcion;
    this.codigo_concepto_transferencia = args.codigo_concepto_transferencia;
    this.informacion_adicional = args.informacion_adicional;
};

SantanderOtrasCuentas.prototype.getImporte = function ( ) {
    return parseFloat(this.importe);
};

SantanderOtrasCuentas.prototype.getFormattedImporte = function() {
    return formatImporte(this.getImporte());
};

SantanderOtrasCuentas.prototype.getBody = function() {
    return [
        "I",
        this.tipo_transferencia,
        pad(this.sucursal_destino, 2),
        pad(this.tipo_cuenta_destino, 2),
        pad(this.numero_cuenta_destino, 7),
        this.getFormattedImporte(),
        this.descripcion.slice(0, 20),
        this.codigo_concepto_transferencia,
        this.informacion_adicional.slice(0, 20)
    ];
};

SantanderOtrasCuentas.prototype.getFormattedBody = function() {
    return this.getBody().join(";");
};
