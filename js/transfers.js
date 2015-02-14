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

var br = new BancoRioTransfer(
    "0072",
    "205",
    "00",
    "80268"
);
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
