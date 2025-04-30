import { useAuth } from "../store/auth";

const Service = () => {
  const { service } = useAuth(); // data get from context api store using custom useContext hook
  return (
    <section className="container service">
      <span>
        <h1>Services</h1>
      </span>

      <article className="grid grid-three-cols">
        {service?.map((curService) => {
          const { _id, service, description, price, provider } = curService;

          return (
            <li key={_id} className="card">
              <figure>
                <picture>
                  {/* WebP format (modern browsers) */}
                  <source
                    srcSet="/Service.webp"
                    type="image/webp"
                    width="200"
                  />
                  {/* Fallback JPEG format (older browsers) */}
                  <source srcSet="/Service.jpg" type="image/jpeg" width="200" />
                  {/* Default Contact image with alt text and dimensions */}
                  <img
                    src="/Service.jpg"
                    alt="Developer Image"
                    width="200"
                    loading="lazy" // Lazy loading for better performance
                    decoding="async" // Async decoding for better rendering
                  />
                </picture>
              </figure>
              <figcaption>
                <h3>{service}</h3>
                <p>{description}</p>
                <div className="card-badge">
                  <p>{price}</p>
                  <p>{provider}</p>
                </div>
              </figcaption>
            </li>
          );
        })}
      </article>
    </section>
  );
};

export default Service;
