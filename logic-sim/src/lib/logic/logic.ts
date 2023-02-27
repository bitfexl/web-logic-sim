export interface LogicComponent {
    getInputs: () => Input[];
    getOutputs: () => Output[];
}

export interface Connector {
    getState: () => State;
    setState: (state: State) => void;
    name: string;
}

export interface Output extends Connector {
    connectTo: (input: Input) => void;
    dissconnectFrom: (input: Input) => void;
    getConnections: () => Input[];
}

export interface Input extends Connector {
    setProvider: (provider: Output | null) => void;
    getProvider: () => Output | null;
}

export type State = boolean;

export class SimpleOutput implements Output {
    name: string;
    private state: State = false;
    private connectedInputs: Input[] = [];

    constructor(name: string = "") {
        this.name = name;
    }

    connectTo(input: Input) {
        this.connectedInputs.push(input);
        input.setState(this.state);
    }

    dissconnectFrom(input: Input) {
        let i = this.connectedInputs.indexOf(input);
        if (i != -1) {
            this.connectedInputs.splice(i, 1);
        }
    }

    getConnections(): Input[] {
        return [...this.connectedInputs];
    }

    setState(state: State) {
        this.state = state;
        this.connectedInputs.forEach((input) => input.setState(state));
    }

    getState(): State {
        return this.state;
    }
}

export class SimpleInput implements Input {
    name: string;
    private state: State = false;
    private provider: Output = null;
    onChnage: (newState: State) => void = null;

    constructor(name: string = "") {
        this.name = name;
    }

    setProvider(provider: Output) {
        this.provider = provider;
    }

    getProvider(): Output {
        return this.provider;
    }

    setState(state: State) {
        this.state = state;
        if (this.onChnage != null) {
            this.onChnage(state);
        }
    }

    getState(): State {
        return this.state;
    }
}

export class NotComponent implements LogicComponent {
    readonly input: SimpleInput = new SimpleInput("IN");
    readonly output: Output = new SimpleOutput("OUT");

    constructor() {
        this.input.onChnage = (val) => this.output.setState(!val);
    }

    getInputs() {
        return [this.input];
    }

    getOutputs(): Output[] {
        return [this.output];
    }
}

export class AndComponent implements LogicComponent {
    readonly inputA: SimpleInput = new SimpleInput("A");
    readonly inputB: SimpleInput = new SimpleInput("B");
    readonly output: Output = new SimpleOutput("OUT");

    constructor() {
        let update = (a: State, b: State) => {
            this.output.setState(a && b);
        };

        this.inputA.onChnage = (a) => update(a, this.inputB.getState());
        this.inputB.onChnage = (b) => update(this.inputA.getState(), b);
    }

    getInputs() {
        return [this.inputA, this.inputB];
    }

    getOutputs(): Output[] {
        return [this.output];
    }
}

export class ClonableComponent implements LogicComponent {
    getInputs: () => Input[];
    getOutputs: () => Output[];

    clone(): ClonableComponent {
        // todo: implement
        return null;
    }
}

export function createLogicCompoenent(inputs: Input[], outputs: Output[]): LogicComponent {
    return {
        getInputs() {
            return [...inputs];
        },

        getOutputs() {
            return [...outputs];
        },
    };
}

export function clone(component: LogicComponent): LogicComponent {
    // let connectedInputs = component.getInputs().filter((i) => i.getProvider() != null);
    // if (connectedInputs.length != 0) {
    //     // do something (find root component)
    //     throw new Error("Provided component does not appear to be a root component.");
    // }

    if (component instanceof NotComponent) {
        return new NotComponent();
    } else if (component instanceof AndComponent) {
        return new AndComponent();
    } else if (component instanceof ClonableComponent) {
        return component.clone();
    }

    throw new Error("Component not clonable.");
}
