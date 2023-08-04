class Doc {}

// BAD
// abstract class Machine {
//     abstract print(doc);
//     abstract fax(doc);
//     abstract scan(doc);
// }

// GOOD - 3 Intefaces
interface Printer {
    print(doc: Doc): void;
}

interface Fax {
    fax(doc: Doc): void;
}

interface Scanner {
    scan(doc: Doc): void;
}

// class MultiFuncPrinter extends Machine {
class MultiFuncPrinter implements Printer, Fax, Scanner {
    print(doc: Doc) {
        //
    } 

    fax(doc: Doc) {
        //
    }

    scan(doc: Doc) {
        //
    }
}

// class OldFashionPrinter extends Machine {
class OldFashionPrinter implements Printer {
    print(doc: Doc) {
        //
    }
}
