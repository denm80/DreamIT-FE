export class MainController {

    _arabic2roman(n) {
        let v = "";
        let i = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        let x = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        let c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
        let m = ["", "M", "MM", "MMM", "MMMM"];
        if (n >= 1 && n <= 4999) {
            v += m[Math.floor(n / 1000)];
            n %= 1000;
            v += c[Math.floor(n / 100)];
            n %= 100;
            v += x[Math.floor(n / 10)];
            n %= 10;
            v += i[n];
        }
        return v;
    }

    constructor($log, jackpot) {
        // some rules for tiers
        const _TIER_NUMBERS = [
            [5, 2],
            [5, 1],
            [5, 0],
            [4, 2],
            [4, 1],
            [4, 0],
            [3, 2],
            [2, 2],
            [3, 1],
            [3, 0],
            [1, 2],
            [2, 1]
        ];

        // creation model
        let model = jackpot.data;

        ['last', 'next'].forEach(n =>
            model[n].date = new Date(model[n].date.year, model[n].date.month - 1, model[n].date.day));

        model.last.numbers = model.last.numbers.map(n => ({number: n}))
            .concat(model.last.euroNumbers.map(n => ({number: n, isEuro: true})));

        model.last.odds = Object.keys(model.last.odds).map(k => {
            let item = model.last.odds[k];
            item.tier = parseInt(k.substr(4));
            item.romanTier = this._arabic2roman(item.tier);
            item.prize = item.prize / 100;
            item.numbers = item.tier ? _TIER_NUMBERS[item.tier - 1] : null;
            return item;
        }).sort((a, b) => a.tier - b.tier).slice(1);


        console.log(model.last);

        // this.model = model;
        // = new new Date(jackpot.last.year, jackpot.last.month, jackpot.last.day);
        // jackpot.next.date = new new Date(jackpot.next.year, jackpot.next.month, jackpot.next.day);
        // $log.info(jackpot);

        this.model = model;

    }


}
