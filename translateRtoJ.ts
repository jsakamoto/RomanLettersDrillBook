module RomanLettersDrillBook {
    var mapRtoJ = [
        { R: 'A', J: 'あ' },
        { R: 'I', J: 'い' },
        { R: 'U', J: 'う' },
        { R: 'E', J: 'え' },
        { R: 'O', J: 'お' },

        { R: 'KA', J: 'か' },
        { R: 'KI', J: 'き' },
        { R: 'KU', J: 'く' },
        { R: 'KE', J: 'け' },
        { R: 'KO', J: 'こ' },

        { R: 'SA', J: 'さ' },
        { R: 'SI', J: 'し' },
        { R: 'SHI', J: 'し' },
        { R: 'SU', J: 'す' },
        { R: 'SE', J: 'せ' },
        { R: 'SO', J: 'そ' },

        { R: 'TA', J: 'た' },
        { R: 'TI', J: 'ち' },
        { R: 'CHI', J: 'ち' },
        { R: 'TU', J: 'つ' },
        { R: 'TSU', J: 'つ' },
        { R: 'TE', J: 'て' },
        { R: 'TO', J: 'と' },

        { R: 'NA', J: 'な' },
        { R: 'NI', J: 'に' },
        { R: 'NU', J: 'ぬ' },
        { R: 'NE', J: 'ね' },
        { R: 'NO', J: 'の' },

        { R: 'HA', J: 'は' },
        { R: 'HI', J: 'ひ' },
        { R: 'HU', J: 'ふ' },
        { R: 'FU', J: 'ふ' },
        { R: 'HE', J: 'へ' },
        { R: 'HO', J: 'ほ' },

        { R: 'MA', J: 'ま' },
        { R: 'MI', J: 'み' },
        { R: 'MU', J: 'む' },
        { R: 'ME', J: 'め' },
        { R: 'MO', J: 'も' },

        { R: 'YA', J: 'や' },
        { R: 'YU', J: 'ゆ' },
        { R: 'YO', J: 'よ' },

        { R: 'RA', J: 'ら' },
        { R: 'RI', J: 'り' },
        { R: 'RU', J: 'る' },
        { R: 'RE', J: 'れ' },
        { R: 'RO', J: 'ろ' },

        { R: 'WA', J: 'わ' },
        { R: 'WO', J: 'を' },

        { R: 'N', J: 'ん' },
        { R: 'NN', J: 'ん' },

        { R: 'GA', J: 'が' },
        { R: 'GI', J: 'ぎ' },
        { R: 'GU', J: 'ぐ' },
        { R: 'GE', J: 'げ' },
        { R: 'GO', J: 'ご' },

        { R: 'ZA', J: 'ざ' },
        { R: 'ZI', J: 'じ' },
        { R: 'ZU', J: 'ず' },
        { R: 'ZE', J: 'ぜ' },
        { R: 'ZO', J: 'ぞ' },

        { R: 'DA', J: 'だ' },
        { R: 'DI', J: 'ぢ' },
        { R: 'DU', J: 'づ' },
        { R: 'DE', J: 'で' },
        { R: 'DO', J: 'ど' },

        { R: 'BA', J: 'ば' },
        { R: 'BI', J: 'び' },
        { R: 'BU', J: 'ぶ' },
        { R: 'BE', J: 'べ' },
        { R: 'BO', J: 'ぼ' },

        { R: 'PA', J: 'ぱ' },
        { R: 'PI', J: 'ぴ' },
        { R: 'PU', J: 'ぷ' },
        { R: 'PE', J: 'ぺ' },
        { R: 'PO', J: 'ぽ' },

        { R: 'KYA', J: 'きゃ' },
        { R: 'KYU', J: 'きゅ' },
        { R: 'KYO', J: 'きょ' },

        { R: 'SHA', J: 'しゃ' },
        { R: 'SYA', J: 'しゃ' },
        { R: 'SHU', J: 'しゅ' },
        { R: 'SYU', J: 'しゅ' },
        { R: 'SHE', J: 'しぇ' },
        { R: 'SHO', J: 'しょ' },
        { R: 'SYO', J: 'しょ' },

        { R: 'CHA', J: 'ちゃ' },
        { R: 'CHU', J: 'ちゅ' },
        { R: 'CHO', J: 'ちょ' },

        { R: 'RYA', J: 'りゃ' },
        { R: 'RYU', J: 'りゅ' },
        { R: 'RYO', J: 'りょ' },

        // white space
        { R: ' ', J: ' ' },
    ];

    export interface TranslatedBlock {
        char: string;
        len: number;
    }

    export function translateLettersToJP(letters: string) {
        var blocks: Array<TranslatedBlock> = [];
        while (letters.length > 0) {
            var block = { char: '?', len: 1 };
            mapRtoJ.some(function (x) {
                var len = x.R.length;
                var part = letters.substr(0, len);
                if (x.R == part) {
                    block = { char: x.J, len: len };
                    return true;
                }
            });
            blocks.push(block);
            letters = letters.substring(block.len);
        }
        return blocks;
    }
}