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

    .controller('BRAutogenerateController', ['$scope', 'BancoRio', function($scope, BancoRio) {
        $scope.br = BancoRio.br;

        $scope.makeDescription = function(textLength) {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

          for (var i = 0; i < textLength; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
        }

        $scope.masiveImport = function(fileContent) {
          var allLines = fileContent.split(/\r\n|\n/);
          var headers = allLines[0].split(',');
          for (var i = 1; i < allLines.length; i++) {
            // split content based on comma
            var row = allLines[i].split(',');
            if (row.length == headers.length) {
              // Estructura del archivo
              // importe,es_santander,cbu,cuit,tipo_cuenta,sucursal,numero_de_cuenta,concepto
              transfer = null;
              descripcion = $scope.makeDescription(20);
              is_santander = row[1] === 'SI' ? true : false;
              if (is_santander) {
                transfer = new SantanderOtrasCuentas();
                transfer.sucursal_destino = row[5];
                transfer.numero_cuenta_destino = row[6];
                transfer.tipo_cuenta_destino = row[4];
                transfer.importe = row[0];
                transfer.descripcion = descripcion;
                transfer.codigo_concepto_transferencia = row[7];
              } else {
                transfer = new OtrosBancos();
                transfer.importe = row[0];
                transfer.descripcion = descripcion;
                transfer.cbu = row[2],
                  transfer.codigo_concepto_transferencia = row[7];
                transfer.cuit = row[3],
                  transfer.tipo_cuenta_destino = row[4];
              }
              $scope.br.addRow(angular.copy(transfer));
            }
          }
        };

        $scope.$watch("fileContent", function(newValue, oldValue) {
          if ($scope.fileContent != null) {
            $scope.masiveImport($scope.fileContent);
          }
        });

        $scope.saveTextAsFile = function(data, filename) {
          if (!data) {
            console.error('Console.save: No data')
            return;
          }

          if (!filename) filename = 'console.json'

          var blob = new Blob([data], {
              type: 'text/plain'
            }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

          // FOR IE:
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
          } else {
            var e = document.createEvent('MouseEvents'),
              a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            e.initEvent('click', true, false, window,
              0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
          }
        };

        $scope.exportFile = function() {
          var fileName = "transferencias.txt";
          var content = $scope.br.dump();
          $scope.saveTextAsFile(content, fileName);
        };
      }])


      .directive('fileReader', function() {
        return {
          scope: {
            fileReader: "="
          },
          link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
              var files = changeEvent.target.files;
              if (files.length) {
                var r = new FileReader();
                r.onload = function(e) {
                  var contents = e.target.result;
                  scope.$apply(function() {
                    scope.fileReader = contents;
                    scope.testing = contents;
                  });
                };

                r.readAsText(files[0]);
              }
            });
          }
        };
      });
