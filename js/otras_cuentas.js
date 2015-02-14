function SantanderOtrasCuentas (
    sucursal_destino,
    tipo_cuenta_destino,
    numero_cuenta_destino,
    importe,
    descripcion,
    codigo_concepto_transferencia,
    informacion_adicional
) {
    this.tipo_transferencia = 2;
    this.sucursal_destino = sucursal_destino;
    this.numero_cuenta_destino = numero_cuenta_destino
    this.tipo_cuenta_destino = tipo_cuenta_destino;
    this.importe = importe;
    this.descripcion = descripcion;
    this.codigo_concepto_transferencia = codigo_concepto_transferencia;

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
            pad(this.sucursal_destino, 2),
            pad(this.tipo_cuenta_destino, 2),
            pad(this.numero_cuenta_destino, 7),
            this.getFormattedImporte(),
            this.descripcion.slice(0, 20),
            this.codigo_concepto_transferencia,
            this.informacion_adicional.slice(0, 20)
        ];
    }

    this.getFormattedBody = function() {
        return this.getBody().join(";");
    }
}
