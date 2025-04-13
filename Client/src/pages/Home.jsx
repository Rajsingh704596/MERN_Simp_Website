import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <section className="section-hero">
      <main>
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <h1>Welcome to Home page</h1>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                consectetur distinctio nostrum atque nam ipsum iusto placeat
                autem doloribus dolore? Maiores mollitia labore sed nisi earum
                vitae! Perferendis quae voluptatem, deserunt voluptates porro,
                atque suscipit molestias cupiditate aliquam eveniet autem qui
                inventore sapiente quia maiores adipisci est vero reiciendis
                magni!
              </p>

              <div className="child">
                <NavLink to="/contact">
                  <button>Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="sec-btn">Learn More</button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* hero image */}
          <div className="hero-image">
            <img src="/image.jpg" alt="hero image" width="400" height="400" />
          </div>
        </div>
      </main>
      {/* 2nd Section */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>registered companies</p>
          </div>
          <div className="div1">
            <h2>100+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="div1">
            <h2>500+</h2>
            <p>well know developers</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>service</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
