import { routerConfig } from './index.route';
import { EuroJackpotController } from './euro-jackpot/euro-jackpot.controller';

angular.module('dreamItFe', ['ngRoute', 'timer'])
  .config(routerConfig)
  .controller('EuroJackpotController', EuroJackpotController);