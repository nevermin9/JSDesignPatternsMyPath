/**
 * - some objects are simple and can be created in a single initializer call
 * - other objects require a lot of ceremony to create
 * - having an object with 10 initializer args isn't productive
 * - instead, opt for piecewise construction
 * 
 * BUILDER provides an API for constructing an object step-by-step
 * When piecewise object construction is compicated, provide an API for doing it succinctly;
 */

class Employee {
    constructor(
        public city: string = '',
        public address: string = '',
        public postCode: string = '',
        public employeer: string = '',
        public position: string = '',
        public salary: number = 0,
    ) { }

    toString() {
        return `Employee lives in ${this.city}, at ${this.address}, ${this.postCode};
works for ${this.employeer}, as a/an ${this.position}, for ${this.salary}.`;
    }
}

class EmployeeBuilder {
    employee: Employee;

    constructor(
        employee: Employee = new Employee()
    ) {
        this.employee = employee;
    }

    get lives() {
        return new EmployeeAddressBuilder(this.employee);
    }

    get works() {
        return new EmployeeJobBuilder(this.employee);
    }

    build() {
        return this.employee;
    }
}

class EmployeeJobBuilder extends EmployeeBuilder {
    constructor(employee: Employee) {
        super(employee);
    }

    for(employeer: string) {
        this.employee.employeer = employeer;
        return this;
    }

    asA(position: string) {
        this.employee.position = position;
        return this;
    }

    forSalary(salary: number) {
        this.employee.salary = salary;
        return this;
    }
}

class EmployeeAddressBuilder extends EmployeeBuilder {
    constructor(employee: Employee) {
        super(employee);
    }

    atCity(city: string) {
        this.employee.city = city;
        return this;
    }

    at(address: string) {
        this.employee.address = address;
        return this;
    }

    withPostCode(postCode: string) {
        this.employee.postCode = postCode;
        return this;
    }
}

const employeeBuilder = new EmployeeBuilder();
const employee = employeeBuilder
    .lives.atCity('Kyiv').at('Bratislavska, 33').withPostCode('02145')
    .works.for('KITCODE').asA('Fronted Dev').forSalary(23333)
    .build();
console.log(employee.toString());


class CodeBuilder {
    className: string;
    fields: string[];
    templateArr: string[];

    constructor(className: string) {
        this.className = className;
        this.fields = [];
        this.templateArr = [];
    }

    addField(name: string) {
        this.fields.push(name);
        return this;
    }

    private createConstructor(): void {
        let constructorRow = `  constructor(`

        for (let i = 0; i < this.fields.length; ++i) {
            constructorRow += this.fields[i];

            if (i + 1 !== this.fields.length) {
                constructorRow += ', '
            }
        }

        constructorRow += ') {'

        this.templateArr.push(constructorRow);
        this.declareFieldsWithinConstructor();
    }

    private declareFieldsWithinConstructor() {

        for (let i = 0; i < this.fields.length; ++i) {
            this.templateArr.push(`    this.${this.fields[i]} = ${this.fields[i]};`)
        }

        this.closeConstructorBody();
    }

    private closeConstructorBody() {
        this.templateArr.push('  }')
    }

    toString(): string {
        this.templateArr.push(`class ${this.className} {`);

        if (this.fields.length > 0) {
            this.createConstructor();
        }

        this.templateArr.push('}');

        return this.templateArr.join('\n');
    }
}

const cb = new CodeBuilder('Person');
cb.addField('name').addField('address').addField('email');
console.log(cb.toString());

/**
 * SUMMARY
 * - a builder is a separate components for building an object
 * - can either give builder an initializer or return it via a static func
 * - to make builder fluent, return "this"
 * - different facets of an object can be built with different builders working in tandem via a bse class
 */