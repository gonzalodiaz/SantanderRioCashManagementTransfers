function OtrosBancos (
    importe,
    descripcion,
    cbu,
    codigo_concepto_transferencia,
    informacion_adicional,
    cuit,
    tipo_cuenta_destino
) {
    this.tipo_transferencia = 3;
    this.importe = importe;
    this.descripcion = descripcion;
    this.cbu = cbu.toString(),
    this.codigo_concepto_transferencia = codigo_concepto_transferencia;
    this.cuit = cuit,
    this.tipo_cuenta_destino = tipo_cuenta_destino;

    if(!informacion_adicional) {
        informacion_adicional = "";
    }
    this.informacion_adicional = informacion_adicional;

    this.getFormattedImporte = function() {
        return formatImporte(this.importe);
    }

    this.getBody = function() {
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

    this.getFormattedBody = function() {
        return this.getBody().join(";");
    }
}
