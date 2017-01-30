declare module PhaserI18n {
    module I18next {
        class Backend {
            private services;
            type: string;
            loadPath: string;
            private game;
            constructor(game: Phaser.Game);
            init(services: any): void;
            read(language: string, namespace?: string, callback?: (err: any, data: any) => void): void;
        }
    }
}
declare module PhaserI18n {
    interface LocaleLoader extends Phaser.Loader {
        locale: (key: string[], url: string) => void;
    }
    interface LocalisedGame extends Phaser.Game {
        load: LocaleLoader;
    }
}
declare module PhaserI18n {
    class Plugin extends Phaser.Plugin {
        private _language;
        constructor(game: Phaser.Game, parent: Phaser.PluginManager);
        init(language?: string): void;
        setLanguage(language?: string): void;
        private recursiveUpdateText(obj);
        private addLocaleLoader();
    }
}
