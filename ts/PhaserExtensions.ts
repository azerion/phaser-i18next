module PhaserI18n {
    export interface LocaleObjectFactory extends Phaser.GameObjectFactory {
        translatedText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, interpolations?: any, group?: Phaser.Group) => PhaserI18n.TranslatedText;
        translatedBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, interpolations?: any, group?: Phaser.Group) => PhaserI18n.TranslatedBitmapText;
    }

    export interface LocaleObjectCreator extends Phaser.GameObjectCreator {
        translatedText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, interpolations?: any) => PhaserI18n.TranslatedText;
        translatedBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, interpolations?: any) => PhaserI18n.TranslatedBitmapText;
    }

    export interface LocaleLoader extends Phaser.Loader {
        locale: (key: string[], url: string) => void;
    }

    export interface LocalisedGame extends Phaser.Game {
        load: LocaleLoader;
        add: LocaleObjectFactory;
    }
}