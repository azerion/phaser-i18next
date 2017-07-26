module PhaserI18n {
    export class Plugin extends Phaser.Plugin {

        private _language: string = 'en';

        private backend: I18next.Backend;

        private wasLoaderLocked: boolean = false;
        private started: boolean = false;

        constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
            super(game, parent);

            Object.defineProperty(game, 'i18n', {
                value: this
            });

            this.addLocaleLoader();
            this.addLocaleFactory();
            this.addLocaleCreator();
        }

        public init(options: i18n.Options, ...plugins: any[]) {
            //Pausing Phaser's loader beeing reset across states until we have loaded the languages
            this.wasLoaderLocked = this.game.load.resetLocked;
            this.game.load.resetLocked = true;

            i18next.on('languageChanged', () => {
                this.recursiveUpdateText(this.game.stage);
            });

            this.backend = new I18next.Backend(this.game);
            //Initilize with language
            i18next.use(this.backend);

            for (let i: number = 0; i < plugins.length; i++) {
                i18next.use(plugins[i]);
            }

            i18next.init(options, () => {
                this.recursiveUpdateText(this.game.stage);
            });
        }

        public setLanguage(language: string = 'en') {
            i18next.changeLanguage(language);
        }

        private recursiveUpdateText(obj: Phaser.Text | Phaser.BitmapText | PIXI.DisplayObjectContainer): void {
            if (obj instanceof Phaser.Text || obj instanceof Phaser.BitmapText) {
                (<any>obj).dirty = true;
            }

            if (obj.children && obj.children.length > 0) {
                obj.children.forEach((child: PIXI.DisplayObjectContainer) => {
                    this.recursiveUpdateText(child);
                });
            }
        }

        private addLocaleLoader() {
            var self: this = this;
            (<PhaserI18n.LocaleLoader>Phaser.Loader.prototype).locale = function (key: string[], loadPath?: string | string[], namespaces?: string[]) {
                if (Array.isArray(loadPath)) {
                    namespaces = loadPath;
                } else if (typeof loadPath !== 'undefined') {
                    self.backend.setLoadPath(loadPath);
                    console.warn('Using loadPath trough load.locale is deprecated, please set it as part of the Plugin config instead!');
                }
                // console.log('loading translations!');
                i18next.loadLanguages(key, () => {
                    if (!self.started) {
                        self.started = true;
                        this.game.load.resetLocked = self.wasLoaderLocked;
                    }
                    // console.log('translations loaded!!');
                });

                if (namespaces) {
                    i18next.loadNamespaces(namespaces);
                }
            };
        }

        private addLocaleFactory() {
            (<PhaserI18n.LocaleObjectFactory>Phaser.GameObjectFactory.prototype).translatedText = function(x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, interpolations?: any, group?: Phaser.Group) {
                if (group === undefined) { group = this.world; }
                return group.add(new PhaserI18n.TranslatedText(this.game, x, y, text, style, interpolations));
            };
            (<PhaserI18n.LocaleObjectFactory>Phaser.GameObjectFactory.prototype).translatedBitmapText = function(x: number, y: number, font: string, text?: string, size?: number, align?: string, interpolations?: any, group?: Phaser.Group) {
                if (group === undefined) { group = this.world; }
                return group.add(new PhaserI18n.TranslatedBitmapText(this.game, x, y, font, text, size, align, interpolations));
            };
        }

        private addLocaleCreator() {
            (<PhaserI18n.LocaleObjectCreator>Phaser.GameObjectCreator.prototype).translatedText = function(x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, interpolations?: any) {
                return new PhaserI18n.TranslatedText(this.game, x, y, text, style, interpolations);
            };
            (<PhaserI18n.LocaleObjectCreator>Phaser.GameObjectCreator.prototype).translatedBitmapText = function(x: number, y: number, font: string, text?: string, size?: number, align?: string, interpolations?: any) {
                return new PhaserI18n.TranslatedBitmapText(this.game, x, y, font, text, size, align, interpolations);
            };
        }
    }
}
