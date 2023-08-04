/**
 * FLYWEIGHT
 * Space optimization!
 * 
 * - avoid redundancy when storing data (MMORPG)
 * 
 * a space optimization technique that lets
 * us use less memory by storing externally the data
 * asociated with similar objects.
 */


// this.formatting = new Array(this.plainText.length).fill().map(_ => ({capitalize: false}))
// is WRONG approach;
interface CapitalizeInfo {
    capitalize: Boolean;
}

class FormattingData {
    index: number;
    capitalize: Boolean;

    constructor(index: number) {
        this.index = index;
        this.capitalize = false;
    }

    covers(index: number) {
        return this.index === index;
    }
}

class Sentence {
    plainText: string[];
    formatting: FormattingData[];

    constructor(plainText: string) {
        this.plainText = plainText.split(' ');
        this.formatting = [];
    }

    at(index: number) {
        const formattingData = new FormattingData(index); 
        this.formatting.push(formattingData);
        return formattingData;
    }

    toString() {
        const result = [];
        const countWords = this.plainText.length;
        for (let i = 0; i < countWords; i++) {
            for (let formattingData of this.formatting) {
                if (formattingData.covers(i) && formattingData.capitalize) {
                    result.push(this.plainText[i].toUpperCase());
                } else if (formattingData.covers(i) && !formattingData.capitalize){
                    result.push(this.plainText[i].toLowerCase());
                } else {
                    result.push(this.plainText[i]);
                }
            }
        }

        return result.join(' ');
    }
}

const s = new Sentence('hello, my dear friend');
s.at(3).capitalize = true;
console.log(s.toString());
/**
 * - store common data externally
 * - specify an index of reference into external data storage
 * - define the idea of 'ranges' on homogeneous collections and store data related to those ranges;
 */
