const Seo = ({ title, description }) => {
  return (
    <>
      {/* Meta tag support in react 19 direct*/}
      <title>{title} </title>
      <meta name="description" content={description} />
      <meta name="keyword" content="seo, meta" />
    </>
  );
};

export default Seo;
