angular.module('BRApp', [])
    .service('BancoRio', [function BancoRio() {
        this.br = new BancoRioTransfer();
    }])

    .controller('BRConfig', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.master = {
            "tipo_cuenta_debito" : "00"
        };
        $scope.br = BancoRio.br;
        $scope.update = function(config) {
            $scope.master = angular.copy(config);
            BancoRio.br.fill(
                config.cuenta_debito,
                config.sucursal_cuenta_debito,
                config.tipo_cuenta_debito,
                config.numero_cuenta_debito
            );
            $scope.module_enabled = false;
        };
        $scope.reset = function() {
            $scope.config = angular.copy($scope.master);
        };
        $scope.reset();
    }])

    .controller('BRController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.br = BancoRio.br;
    }])

    .controller('BRSantanderOtrasCuentasController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.master = new SantanderOtrasCuentas();
        $scope.update = function(transfer) {
            $scope.master = angular.copy(transfer);
            BancoRio.br.addRow(angular.copy(transfer));
        };
        $scope.reset = function() {
            $scope.transfer = angular.copy($scope.master);
        };
        $scope.reset();
        $scope.br = BancoRio.br;
    }])

    .controller('BROtrosBancosController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.master = new OtrosBancos();
        $scope.update = function(transfer) {
            $scope.master = angular.copy(transfer);
            BancoRio.br.addRow(angular.copy(transfer));
        };
        $scope.reset = function() {
            $scope.transfer = angular.copy($scope.master);
        };
        $scope.reset();
        $scope.br = BancoRio.br;
    }])
