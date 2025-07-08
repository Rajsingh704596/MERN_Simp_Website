const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer aria-label="footer">
      <h3 className="footer">&copy; {year} | All rights Reserved.</h3>
    </footer>
  );
};

export default Footer;
