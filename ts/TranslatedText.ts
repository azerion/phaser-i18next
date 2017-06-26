module PhaserI18n {
    /**
     * We override Phaser.Text's _text property to make sure we always fetch a translations instead of the original key value
     */
    export class TranslatedText extends Phaser.Text {

        private _nonTranslated: string = '';
        private _interpolations: any = {};

        constructor(game: Phaser.Game, x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, interpolations?: any) {
            super(game, x, y, '', style);
            this._interpolations = interpolations ? interpolations : {};
            this.text = text;
    }

        public setTranslationParamameter(key: string, value: string) {
            this._interpolations[key] = value;
            (<any>this).dirty = true;
        }

        public clearTranslationParamameter(key: string) {
            if (key in this._interpolations) {
                delete this._interpolations[key];
            }
        }

        get _text() {
            return i18next.t(this._nonTranslated, this._interpolations) || '';
        }

        set _text(value: string) {
            if (value !== this._nonTranslated) {
                this._nonTranslated = value.toString() || '';
            }
        }
    }
}
