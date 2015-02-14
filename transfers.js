var config = {
    "banco_cuenta_debito": "0072",
    "sucursal_cuenta_debito": "205",
    "tipo_cuenta_debito": "00",
    "numero_cuenta_debito": "0080268",
};

var tipos_cuenta_destino = {
    "CC en Pesos": "00",
    "CA en Pesos": "01",
    "Cuenta Única en pesos": "09",
    "Cuenta Única en dólares": "10",
    "CC en Dólares": "03",
    "CA en Dólares": "04"
};

var tipos_cuenta_destino_otros_bancos = [ 
    "CUENTA CORRIENTE PROPIA",
    "CUENTA CORRIENTE DE TERCEROS",
    "OTRA CUENTA"
];

var codigos_concepto_transferencia = [
    "ALQ", "VAR", "EXP", "CUO", "FAC", "PRE", "SEG", "HON"
];

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function formatImporte(importe) {
    // I need a 2 decimal precision
    importe = importe.toFixed(2);
    // toFixed retuns a string, I need a float
    importe = parseFloat(importe)
    // I need to move the decimal point two positions
    importe = importe * 100;
    // 149.20 * 100 = 14919.999999999998. Thank you javascript!
    // I have to round it
    importe = importe.toFixed(0);
    // We need to pad it to a fixed 14 positions as the pdf says
    return pad(importe, 14);
}

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

function BancoRioTransfer(config) {
    this.config = config;
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
            this.config.banco_cuenta_debito,
            this.config.sucursal_cuenta_debito,
            this.config.tipo_cuenta_debito,
            this.config.numero_cuenta_debito,
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


var br = new BancoRioTransfer(config);
br.addRow(
    new SantanderOtrasCuentas(
        374,
        09,
        3584422,
        518.40,
        "Horacio Oliva",
        "VAR"
    )
);
br.addRow(
    new OtrosBancos(
        1200.00,
        "Alguien",
        "2850401240017000480910",
        "HON",
        "",
        20139114923,
        3
    )
)

console.log(br.getHeader());
console.log(br.getBody().join("\n"));
console.log(br.getFooter());
