import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';

angular.module('dreamItFe', ['ngRoute', 'timer'])
  .config(routerConfig)
  .controller('MainController', MainController);