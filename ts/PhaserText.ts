/**
 * We override Phaser.Text's _text property to make sure we always fetch a translations instead of the original key value
 */
Object.defineProperty((<any>Phaser.Text.prototype), '_text', {

    get: function() {
        return i18next.t(this._nonTranslated);
    },

    set: function(value) {

        if (value !== this._nonTranslated)
        {
            this._nonTranslated = value.toString() || '';
        }

    }

});
/**
 * And we do the same for bitmap text
 */
Object.defineProperty((<any>Phaser.BitmapText.prototype), '_text', {

    get: function() {
        return i18next.t(this._nonTranslated);
    },

    set: function(value) {

        if (value !== this._nonTranslated)
        {
            this._nonTranslated = value.toString() || '';
        }

    }

});