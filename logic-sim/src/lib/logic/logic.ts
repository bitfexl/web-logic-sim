/**
 * A logic component (e.g. not, and, or, ...).
 */
export interface LogicComponent {
    /**
     * The name of the component,
     * should only contain letters,
     * numbers and underscores (no spaces).
     */
    name: string;

    /**
     * Get a list of all the inputs of
     * the component.
     */
    getInputs: () => Input[];

    /**
     * Get a list of all the outputs of
     * the component.
     */
    getOutputs: () => Output[];
}

export interface Connector {
    /**
     * The name of the connector,
     * should only contain letters,
     * numbers and underscores (no spaces).
     */
    name: string;

    /**
     * The state on = true, off = false.
     */
    getState: () => State;

    /**
     * Set the state. Should (immediatelly) update
     * the compoenents outputs if it is an input.
     */
    setState: (state: State) => void;

    /**
     * Get the component this connector belongs to.
     */
    getComponent: () => LogicComponent;
}

export interface Output extends Connector {
    /**
     * Connect the output to an input.
     * If the output changes setState should be
     * called on all connected inputs.
     * setState should also be called onec in the call
     * to this function as well as setProvider with
     * this as the argument.
     */
    connectTo: (input: Input) => void;

    /**
     * Dissconnect an input. Do not update state, just
     * remove from update list and call setProvider(null).
     */
    dissconnectFrom: (input: Input) => void;

    /**
     * Get a list of all connected inputs.
     */
    getConnections: () => Input[];
}

export interface Input extends Connector {
    /**
     * Set a provider, or remove (null).
     * A input should only have one provider.
     * dissconnectFrom(this) should be called on the
     * other provider if connecting a new one that is
     * not null.
     */
    setProvider: (provider: Output | null) => void;

    /**
     * Get the current provider or null if none.
     */
    getProvider: () => Output | null;
}

export type State = boolean;

export class SimpleOutput implements Output {
    private readonly component: LogicComponent;

    private state: State = false;
    private connectedInputs: Input[] = [];

    name: string;

    constructor(component: LogicComponent, name: string = "") {
        this.component = component;
        this.name = name;
    }

    connectTo(input: Input) {
        this.connectedInputs.push(input);
        input.setProvider(this);
        input.setState(this.state);
    }

    dissconnectFrom(input: Input) {
        let i = this.connectedInputs.indexOf(input);
        if (i != -1) {
            this.connectedInputs.splice(i, 1);
            input.setProvider(null);
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

    getComponent() {
        return this.component;
    }
}

export class SimpleInput implements Input {
    private readonly component: LogicComponent;

    private state: State = false;
    private provider: Output = null;

    onChnage: (newState: State) => void = null;

    name: string;

    constructor(component: LogicComponent, name: string = "") {
        this.component = component;
        this.name = name;
    }

    setProvider(provider: Output) {
        if (provider != null && this.provider != null) {
            // provider gets set to null in dissconnectFrom (recursive call)
            this.provider.dissconnectFrom(this);
        }
        // provider is set to the new one
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

    getComponent() {
        return this.component;
    }
}

export class NotComponent implements LogicComponent {
    readonly input: SimpleInput = new SimpleInput(this, "IN");
    readonly output: Output = new SimpleOutput(this, "OUT");

    name: string = "NOT";

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
    readonly inputA: SimpleInput = new SimpleInput(this, "A");
    readonly inputB: SimpleInput = new SimpleInput(this, "B");
    readonly output: Output = new SimpleOutput(this, "OUT");

    name: string = "AND";

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

    name: string;

    clone(): ClonableComponent {
        // todo: implement
        return null;
    }
}

export function createLogicCompoenent(name: string, inputs: Input[], outputs: Output[]): LogicComponent {
    return {
        name,

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
