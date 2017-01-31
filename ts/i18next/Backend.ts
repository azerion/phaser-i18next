//Phaser backed backend for 18next
module PhaserI18n {
    export module I18next {
        export class Backend {
            private services: any;

            public type: string = 'backend';

            /**
             * Default loadpath for i18next, {{lng}} will be replaced with the language, and {{ns}} with the namespace
             *
             * @type {string}
             */
            private loadPath: string = '/locales/{{lng}}/{{ns}}.json';

            private game: Phaser.Game;

            constructor(game: Phaser.Game) {
                this.game = game;
            }

            /**
             * Function called by i18next to pass a services object and the BacnedOptions (if configured)
             *
             * @param services
             * @param options
             */
            public init(services: any, options?: i18n.BackendOptions) {
                this.services = services;

                if (options && options.loadPath) {
                    this.loadPath = options.loadPath;
                }
            }

            /**
             * Function that is called when loading a language/namespace
             *
             * @param language
             * @param namespace
             * @param callback
             */
            public read(language: string, namespace?: string, callback?: (err: any, data: any) => void) {
                let url: string = this.services.interpolator.interpolate(this.loadPath, { lng: language, ns: namespace });
                let key: string = namespace + '_' + language;

                let handler = (progress: number, cacheKey: string) => {
                    if (cacheKey === key) {
                        callback(null, this.game.cache.getJSON(key));
                        this.game.load.onFileComplete.remove(handler);
                    }
                };
                this.game.load.onFileComplete.add(handler);
                this.game.load.json(key, url);
            }
        }
    }
}