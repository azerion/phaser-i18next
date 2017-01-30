module PhaserI18n {
        export class Plugin extends Phaser.Plugin {

        private _language: string = 'en';

        constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
            super(game, parent);

            Object.defineProperty(game, 'i18n', {
                value: this
            });

            this.addLocaleLoader();
        }

        public init(language: string = 'en') {
            console.log('init');

            this._language = language;

            //Initilize with language
            i18next.use(new I18next.Backend(this.game))
                .init({debug: true});
            console.log('i18s created');
        }

        public setLanguage(language: string = 'en') {
            console.log('setting language to: ', language)
            i18next.changeLanguage(language);

            this.recursiveUpdateText(this.game.stage);
        }

        private  recursiveUpdateText(obj: Phaser.Text | PIXI.DisplayObjectContainer): void {
            if ( obj instanceof Phaser.Text ) {
                (<any>obj).dirty = true;
            }

            if ( obj.children && obj.children.length > 0 ) {
                obj.children.forEach((child: PIXI.DisplayObjectContainer) => {
                    this.recursiveUpdateText(child);
                });
            }
        }

        private addLocaleLoader() {
            (<PhaserI18n.LocaleLoader>Phaser.Loader.prototype).locale = function(key: string[], url: string) {
                i18next.loadLanguages(key, () => {
                    i18next.changeLanguage(key[0]);
                });
            };
        }
    }
}
