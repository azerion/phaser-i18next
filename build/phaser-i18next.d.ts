declare module PhaserI18n {
    module I18next {
        class Backend {
            private services;
            type: string;
            private loadPath;
            private game;
            constructor(game: Phaser.Game);
            init(services: any, options?: i18n.BackendOptions): void;
            read(language: string, namespace?: string, callback?: (err: any, data: any) => void): void;
            readMulti(languages: string, namespaces: string[], callback: (err: any, data: any) => void): void;
            create(languages: string[], namespace: string, key: string, fallbackValue: string): void;
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
        init(options: i18n.Options, ...plugins: any[]): void;
        setLanguage(language?: string): void;
        private recursiveUpdateText(obj);
        private addLocaleLoader();
    }
}
