import BsCurrency from './bs-currency';
import Currency, { CurrencyPrimitiveProps } from './currency';

interface CurrencyPriceProps {
    value: number;
    formattedValue?: string;
    currency: Currency;
}

export interface CurrencyPricePrimitiveProps {
    value: number;
    formattedValue?: string;
    currency: CurrencyPrimitiveProps;
}

export default class CurrencyPrice {
    constructor(private props: CurrencyPriceProps) {}

    get value() {
        return this.props.value;
    }

    get formattedValue() {
        if (this.props.formattedValue) {
            return this.props.formattedValue;
        }
        return this.props.currency.format(this.props.value);
    }

    get currency() {
        return this.props.currency;
    }

    static sum(priceA: CurrencyPrice, priceB: CurrencyPrice) {
        return new CurrencyPrice({
            value: priceA.value + priceB.value,
            currency: priceA.currency
        });
    }

    static times(
        currencyPrice: CurrencyPrice,
        times: number,
        totalCurrency?: Currency
    ) {
        return new CurrencyPrice({
            value: currencyPrice.value * times,
            currency: totalCurrency ?? currencyPrice.currency
        });
    }

    static div(
        currencyPrice: CurrencyPrice,
        times: number,
        totalCurrency?: Currency
    ) {
        return new CurrencyPrice({
            value: currencyPrice.value / times,
            currency: totalCurrency ?? currencyPrice.currency
        });
    }

    static getAcc(prices: CurrencyPrice[]) {
        if (prices.length == 0) return CurrencyPrice.fromZero(BsCurrency);

        const total = prices.reduce((a, b) => {
            return a + b.value;
        }, 0);

        const accCurrency = prices[0].currency;

        return new CurrencyPrice({
            currency: accCurrency,
            value: total
        });
    }

    toPrimitives(): CurrencyPricePrimitiveProps {
        return {
            ...this.props,
            currency: this.props.currency.toPrimitives()
        };
    }

    static fromPrimitives(props: CurrencyPricePrimitiveProps) {
        return new CurrencyPrice({
            currency: Currency.fromPrimitives(props.currency),
            value: props.value,
            formattedValue: props.formattedValue
        });
    }

    static fromZero(currency: Currency) {
        return new CurrencyPrice({
            currency: Currency.fromPrimitives(currency),
            value: 0,
            formattedValue: '0'
        });
    }

    static fromPrimitiveArray(items: CurrencyPricePrimitiveProps[]) {
        return items.map((e) => CurrencyPrice.fromPrimitives(e));
    }
}
