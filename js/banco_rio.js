function BancoRioTransfer(
        cuenta_debito,
        sucursal_cuenta_debito,
        tipo_cuenta_debito,
        numero_cuenta_debito
) {
    this.cuenta_debito = cuenta_debito;;
    this.sucursal_cuenta_debito = sucursal_cuenta_debito;;
    this.tipo_cuenta_debito = tipo_cuenta_debito;;
    this.numero_cuenta_debito = numero_cuenta_debito;
    this.numero_de_envio = new Date().getTime() * 100;
    this.rows = [];

    this.addRow = function(row) {
        this.rows.push(row);
    };

    this.getImporteTotal = function() {
        return this.rows
        .map(function(node){ return node.importe })
        .reduce(function(sum, importe){
            return sum + importe;
        }, 0);
    }

    this.getFormattedImporteTotal = function() {
        return formatImporte(this.getImporteTotal());
    }

    this.getHeader = function() {
        var elements = [
            'H',
            this.banco_cuenta_debito,
            this.sucursal_cuenta_debito,
            this.tipo_cuenta_debito,
            pad(this.numero_cuenta_debito, 7),
            this.getFormattedImporteTotal(),
            pad(this.numero_de_envio.toString().slice(-7), 7)
        ];
        return elements.join(';')
    }

    this.getFooter = function() {
        var elements = [
            'T',
            pad(this.rows.length, 4)
        ];
        return elements.join(';')
    }

    this.getBody = function() {
        return this.rows.map(function(node){
            return node.getFormattedBody();
        });
    }
}
