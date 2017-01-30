module PhaserI18n {
    export interface LocaleLoader extends Phaser.Loader {
        locale: (key: string[], url: string) => void;
    }

    export interface LocalisedGame extends Phaser.Game {
        load: LocaleLoader;
    }
}