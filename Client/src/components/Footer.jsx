const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="footer">&copy; {year} | All rights Reserved.</p>
    </footer>
  );
};

export default Footer;
