angular.module('BRApp', [])
    .service('BancoRio', [function BancoRio() {
        this.br = new BancoRioTransfer("0072", "205", "00", "80268");
    }])

    .controller('BRController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.br = BancoRio.br;
    }])

    .controller('BRSantanderOtrasCuentasController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.master = new SantanderOtrasCuentas();;
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
