function Menu({ value }) {
  return (
    <p value={value} onClick={() => window.location.replace(`/class/${value}`)}>
      {value}
    </p>
  );
}
export default Menu;
