import RadioContext from "./RadioContext";

function RadioGroup({ children,...rest }) {
    return (
        <div className="radio">
            <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
        </div>
    );
}

export default RadioGroup
