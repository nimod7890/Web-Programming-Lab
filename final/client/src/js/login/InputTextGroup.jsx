function InputTextGroup({ children, ...rest }) {
  // const showBoolean=JSON.parse(show);
  // return (
  //     <div>
  //         {showBoolean&&<InputText id="inputStudent"/>}
  //         {!showBoolean&&<InputText id="inputOther"/>}
  //     </div>
  // );
  return <fieldset>{children}</fieldset>;
}

export default InputTextGroup;
