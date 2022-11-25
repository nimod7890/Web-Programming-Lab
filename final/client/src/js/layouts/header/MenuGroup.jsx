import ClassURLContext from "./ClassURLContext";

function MenuGroup({ className, children, ...rest }) {
  return (
    <div className={className}>
      <ClassURLContext.Provider value={rest}>
        {children}
      </ClassURLContext.Provider>
    </div>
  );
}
export default MenuGroup;
