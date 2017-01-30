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