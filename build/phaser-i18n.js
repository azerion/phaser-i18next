var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhaserI18n;
(function (PhaserI18n) {
    var I18next;
    (function (I18next) {
        var Backend = (function () {
            function Backend(game) {
                this.type = 'backend';
                this.loadPath = '/locales/{{lng}}/{{ns}}.json';
                this.game = game;
            }
            Backend.prototype.init = function (services) {
                this.services = services;
            };
            Backend.prototype.read = function (language, namespace, callback) {
                var _this = this;
                var url = this.services.interpolator.interpolate(this.loadPath, { lng: language, ns: namespace });
                var key = namespace + '_' + language;
                var handler = function (progress, cacheKey) {
                    if (cacheKey === key) {
                        callback(null, _this.game.cache.getJSON(key));
                        _this.game.load.onFileComplete.remove(handler);
                    }
                };
                this.game.load.onFileComplete.add(handler);
                this.game.load.json(key, url);
            };
            return Backend;
        }());
        I18next.Backend = Backend;
    })(I18next = PhaserI18n.I18next || (PhaserI18n.I18next = {}));
})(PhaserI18n || (PhaserI18n = {}));
Object.defineProperty(Phaser.Text.prototype, '_text', {
    get: function () {
        return i18next.t(this._nonTranslated);
    },
    set: function (value) {
        if (value !== this._nonTranslated) {
            this._nonTranslated = value.toString() || '';
        }
    }
});
var PhaserI18n;
(function (PhaserI18n) {
    var Plugin = (function (_super) {
        __extends(Plugin, _super);
        function Plugin(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this._language = 'en';
            Object.defineProperty(game, 'i18n', {
                value: _this
            });
            _this.addLocaleLoader();
            return _this;
        }
        Plugin.prototype.init = function (language) {
            if (language === void 0) { language = 'en'; }
            console.log('init');
            this._language = language;
            i18next.use(new PhaserI18n.I18next.Backend(this.game))
                .init({ debug: true });
            console.log('i18s created');
        };
        Plugin.prototype.setLanguage = function (language) {
            if (language === void 0) { language = 'en'; }
            console.log('setting language to: ', language);
            i18next.changeLanguage(language);
            this.recursiveUpdateText(this.game.stage);
        };
        Plugin.prototype.recursiveUpdateText = function (obj) {
            var _this = this;
            if (obj instanceof Phaser.Text) {
                obj.dirty = true;
            }
            if (obj.children && obj.children.length > 0) {
                obj.children.forEach(function (child) {
                    _this.recursiveUpdateText(child);
                });
            }
        };
        Plugin.prototype.addLocaleLoader = function () {
            Phaser.Loader.prototype.locale = function (key, url) {
                i18next.loadLanguages(key, function () {
                    i18next.changeLanguage(key[0]);
                });
            };
        };
        return Plugin;
    }(Phaser.Plugin));
    PhaserI18n.Plugin = Plugin;
})(PhaserI18n || (PhaserI18n = {}));
//# sourceMappingURL=phaser-i18n.js.map