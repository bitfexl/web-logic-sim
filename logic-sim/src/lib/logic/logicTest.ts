import { AndComponent, NotComponent, type LogicComponent } from "./logic";

export function test() {
    let log = console.log;

    log("***** *** LOGIC TEST *** *****");

    let not = new NotComponent();
    let and = new AndComponent();

    log("NOT:");
    log(truthTable(not));

    log("AND:");
    log(truthTable(and));
}

function truthTable(component: LogicComponent): string {
    let output = "";

    let colSizes = [];

    let header = "";

    component.getInputs().forEach((input) => {
        header += input.name + " ";
        colSizes.push(input.name.length);
    });

    header += "| ";

    component.getOutputs().forEach((output) => {
        header += output.name + " ";
        colSizes.push(output.name.length);
    });

    output += header + "\n";
    output += "-".repeat(header.length) + "\n";

    let line = "";

    for (let i = 0; i < Math.pow(2, component.getInputs().length); i++) {
        for (let j = 0; j < component.getInputs().length; j++) {
            component.getInputs()[j].setState(((i >> j) & 1) == 1);
            line += (component.getInputs()[j].getState() ? "1" : "0") + " ".repeat(colSizes[j]);
        }

        line += "| ";

        for (let j = 0; j < component.getOutputs().length; j++) {
            line += (component.getOutputs()[j].getState() ? "1" : "0") + " ".repeat(colSizes[component.getInputs().length + j]);
        }

        output += line + "\n";
        line = "";
    }

    return output;
}
