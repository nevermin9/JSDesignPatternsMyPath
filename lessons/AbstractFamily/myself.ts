class Chair {}

class Table {}

interface FurnitureFactory {
    createChair(): Chair;
    createTable(): Table;
}

//---

class BaroccoChair extends Chair {}

class BaroccoTable extends Table {}

class BaroccoFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
        return new BaroccoChair()
    }
    
    createTable(): Table {
        return new BaroccoTable()
    }
}

// ---

class ClassicChair extends Chair {}

class ClassicTable extends Table {}

class ClassicFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
        return new ClassicChair()
    }
    
    createTable(): Table {
        return new ClassicTable()
    }
}

//--