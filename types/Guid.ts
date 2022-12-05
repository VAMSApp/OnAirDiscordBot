import { parse, stringify, validate, v4 as uuid } from 'uuid';

export class Guid {
    private readonly value: string;

    constructor(value?: string) {
        if (value) {
            if (!validate(value)) {

            }
            this.value = value;
        } else {
            this.value = uuid();
        }
    }

    toString() {
        return this.value;
    }
}
