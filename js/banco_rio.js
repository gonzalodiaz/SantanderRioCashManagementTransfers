function BancoRioTransfer() {
    this.numero_de_envio = new Date().getTime() * 100;
    this.rows = [];
    this.active = false;

    this.codigos_concepto_transferencia = [
        "ALQ", "VAR", "EXP", "CUO", "FAC", "PRE", "SEG", "HON"
    ];
};


BancoRioTransfer.prototype.fill = function (
        cuenta_debito,
        sucursal_cuenta_debito,
        tipo_cuenta_debito,
        numero_cuenta_debito
) {
    this.cuenta_debito = cuenta_debito;;
    this.sucursal_cuenta_debito = sucursal_cuenta_debito;;
    this.tipo_cuenta_debito = tipo_cuenta_debito;;
    this.numero_cuenta_debito = numero_cuenta_debito;
    this.active = true;
};


BancoRioTransfer.prototype.addRow = function(row) {
    this.rows.push(row);
};

BancoRioTransfer.prototype.getImporteTotal = function() {
    return this.rows
    .map(function(node){ return node.getImporte(); })
    .reduce(function(sum, importe){
        return sum + importe;
    }, 0.0);
}

BancoRioTransfer.prototype.getFormattedImporteTotal = function() {
    return formatImporte(this.getImporteTotal());
}

BancoRioTransfer.prototype.getHeader = function() {
    var elements = [
        'H',
        this.cuenta_debito,
        this.sucursal_cuenta_debito,
        this.tipo_cuenta_debito,
        pad(this.numero_cuenta_debito, 7),
        this.getFormattedImporteTotal(),
        pad(this.numero_de_envio.toString().slice(-7), 7)
    ];
    return elements.join(';')
}

BancoRioTransfer.prototype.getFooter = function() {
    var elements = [
        'T',
        pad(this.rows.length, 4)
    ];
    return elements.join(';')
}

BancoRioTransfer.prototype.getBody = function() {
    return this.rows.map(function(node){
        return node.getFormattedBody();
    });
}

BancoRioTransfer.prototype.dump = function() {
    var content = []
    content.push(this.getHeader());
    if(this.getBody().length > 0) {
        content.push(this.getBody().join("\n"));
    }
    content.push(this.getFooter());
    return content.join("\n");
}
