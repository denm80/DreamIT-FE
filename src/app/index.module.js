import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';

angular.module('dreamItFe', ['ngRoute'])
  .config(routerConfig)
  .controller('MainController', MainController);