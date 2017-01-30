//Phaser backed backend for 18next
module PhaserI18n {
    export module I18next {
        export class Backend {
            private services: any;

            public type: string = 'backend';

            public loadPath: string = '/locales/{{lng}}/{{ns}}.json';

            private game: Phaser.Game;

            constructor(game: Phaser.Game) {
                this.game = game;
            }

            public init(services: any) {
                this.services = services;
            }

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