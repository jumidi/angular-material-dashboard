/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   31-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 11-02-2017
 */
(function() {
  'use strict'
  angular
    .module('app')
    .controller('UsersController', [
      '$scope',
      '$rootScope',
      '$log',
      '_',
      'DataUsersService',
      function UsersController($scope, $rootScope, $log, _, DataUsersService) {
        var vm = this;
        vm.usuarios = 0;
        vm.sexChartData = [];
        vm.totalSex = 0;
        vm.edadesKeys = [];
        vm.edadChartData = [];
        vm.seqSexKeys = [];
        vm.seqSexChartData = [];
        vm.sexchartOptions = {
          chart: {
            type: 'pieChart',
            height: 300,
            donut: true,
            pie: {
              startAngle: function(d) {
                return d.startAngle / 2 - Math.PI / 2;
              },
              endAngle: function(d) {
                return d.endAngle / 2 - Math.PI / 2;
              }
            },
            x: function(d) {
              return d.key;
            },
            y: function(d) {
              return d.y;
            },
            valueFormat: (d3.format('.0f')),
            //color: ['rgb(0, 150, 136)', 'rgb(191, 191, 191)'],
            showLabels: false,
            showLegend: true,
            tooltips: false,
            title: '0',
            titleOffset: -10,
            margin: {
              bottom: -80,
              left: -20,
              right: -20
            }
          }
        };
        vm.edadChartOptions = {
          chart: {
            type: 'multiBarChart',
            height: 300,
            margin: {
              top: 30,
              right: 40,
              bottom: 30,
              left: 90
            },
            transitionDuration: 350,
            reduceXTicks: true,
            rotateLabels: 0,
            showControls: true,
            groupSpacing: 0.1,
            sortDescending: false,
            xAxis: {
              tickFormat: function(d) {
                return vm.edadesKeys[d];
              }
            },
            yAxis: {
              tickFormat: (d3.format(',.1f'))
            }
          }
        };


        vm.chartSeqSexOptions = {
          chart: {
            type: 'lineChart',
            height: 350,
            margin: {
              top: 30,
              right: 40,
              bottom: 30,
              left: 90
            },
            x: function(d) {
              return d[0];
            },
            y: function(d) {
              return d[1];
            },
            showLabels: true,
            showLegend: true,
            title: '',
            showYAxis: true,
            showXAxis: true,
            tooltip: {
              contentGenerator: function(d) {
                return '<div class="custom-tooltip">' + d.point.y + '</div>' + '<div class="custom-tooltip">' + d.series[0].key + '</div>'
              }
            },
            showControls: true
          }
        };



        vm.edadCompare = function(a, b) {
          var as = a.split('_');
          var bs = b.split('_');
          return (parseInt(as[1]) >= parseInt(bs[0]));

        }



        /* Funciones para obtener datos */



        vm.getUsers = function(queryArray) {
          DataUsersService.getUsersAll(queryArray).then(function(result) {
            var total = 0;
            if (!_.isEmpty(result)) {
              if (result[0].total) {
                total = result[0].total;
              }
            }
            vm.usuarios = total;
          });
        };

        vm.getUsersSex = function(queryArray) {
          DataUsersService.getUsersSex(queryArray).then(function(result) {
            vm.sexChartData = [];
            vm.totalSex = 0;
            for (var i = 0, tot = result.length; i < tot; i++) {
              var p = result[i];
              vm.sexChartData.push({
                key: p._id.sex,
                y: p.total
              });
              vm.totalSex += p.total;
            }
            vm.sexchartOptions.chart.title = vm.totalSex;
          });
        };

        vm.getUsersEdad = function(queryArray) {
          DataUsersService.getUsersEdad(queryArray).then(function(result) {

            vm.edadChartData = [];
            var datos = [];
            for (var i = 0, tot = result.length; i < tot; i++) {
              var p = result[i];
              if (!datos[p._id.sex]) {
                datos[p._id.sex] = [];
              }
              if (!datos[p._id.sex][p._id.grupoEdad]) {
                datos[p._id.sex][p._id.grupoEdad] = 0;
              }
              datos[p._id.sex][p._id.grupoEdad] += p.total;
            }
            for (var sex in datos) {
              var valores = datos[sex];
              for (var edad in valores) {
                if (vm.edadesKeys.indexOf(edad) <= -1) {
                  vm.edadesKeys.push(edad);
                }
              }
            }

            vm.edadesKeys.sort(vm.edadCompare);

            for (var sex in datos) {
              var obj = {};
              obj.key = sex;
              obj.values = [];
              var valores = datos[sex];
              for (var i = 0, tot = vm.edadesKeys.length; i < tot; i++) {
                var edad = vm.edadesKeys[i];
                var vedad = 0;
                if (valores[edad] >= 0) {
                  vedad = valores[edad];
                }
                obj.values.push({
                  x: i,
                  y: vedad
                });
              }

              // obj.values.sort(function(a, b) {
              //   return (b.x >= a.x);
              // })
              //
              // obj.values.reverse();

              vm.edadChartData.push(obj);
            }
          });
        };


        vm.getUsersSexSeq = function(queryArray) {
          queryArray.seq = 1;
          DataUsersService.getUsersSex(queryArray).then(function(result) {
            vm.seqSexKeys = [];
            vm.seqSexChartData = [];
            var lines = [];
            var x_labels = [];
            for (var i = 0, max = result.length; i < max; i++) {

              var point = result[i];
              var sex = point._id.sex;

              delete point._id['sex'];

              var key = "";

              for (var k in point._id) {
                key += "_" + k.charAt(0);
                key += "_" + point._id[k];
              }
              if (!_.contains(x_labels, key)) {
                x_labels.push(key);
              }
              if (_.isUndefined(lines[sex])) {
                lines[sex] = [];
              }

              lines[sex][key] = point.total;
            }

            vm.seqSexKeys = x_labels;

            for (var k in lines) {
              var obj = {
                key: k,
                values: []
              };
              for (var j = 0, maxj = vm.seqSexKeys.length; j < maxj; j++) {
                var total = 0;
                if (_.has(lines[k], vm.seqSexKeys[j])) {
                  total = lines[k][vm.seqSexKeys[j]];
                }
                obj.values.push([j, total]);
              }
              vm.seqSexChartData.push(obj);
              $log.info("los datos SEMI procesados:", vm.seqSexChartData);
            }



          });
        }


        vm.refreshAll = function() {
          var queryArray = {
            from: $rootScope.ubRange.dateStart.getTime(),
            to: $rootScope.ubRange.dateEnd.getTime()
          };
          //vm.getUsers(queryArray);
          vm.getUsersSex(queryArray);
          vm.getUsersEdad(queryArray);
          vm.getUsersSexSeq(queryArray);
        }
        vm.refreshAll();

        $rootScope.$watch('ubRange', function(newValue, oldValue) {
          vm.refreshAll();
        })



        return vm;
      }
    ]);
})();
