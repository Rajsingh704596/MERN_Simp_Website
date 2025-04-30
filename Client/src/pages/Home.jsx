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
                  <button aria-label="Connect now and fill contact page">
                    {/* aria provide extra context for screen reader */}
                    Connect Now
                  </button>
                </NavLink>
                <NavLink to="/service">
                  <button
                    className="sec-btn"
                    aria-label="Learn more about our service"
                  >
                    Learn More
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          {/* hero image */}
          {/* Hero Image with WebP and Fallback */}
          <figure className="hero-image">
            <picture>
              {/* WebP format (modern browsers) */}
              <source
                srcSet="/image.webp"
                type="image/webp"
                width="400"
                height="400"
              />
              {/* Fallback JPEG format (older browsers) */}
              <source
                srcSet="/image.jpg"
                type="image/jpeg"
                width="400"
                height="400"
              />
              {/* Default image with alt text and dimensions */}
              <img
                src="/image.jpg"
                alt="Developer Image"
                width="400"
                height="400"
                loading="lazy" // Lazy loading for better performance
                decoding="async" // Async decoding for better rendering
              />
            </picture>
            <figcaption>Developer Image</figcaption>
          </figure>
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
