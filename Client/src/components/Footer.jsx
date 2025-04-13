const Footer = () => {
  const year = new Date().getFullYear();
  return <div className="footer">&copy; {year} | All rights Reserved.</div>;
};

export default Footer;
