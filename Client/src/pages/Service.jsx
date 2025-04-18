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
                <img src="/image.jpg" alt="image" width="200" />
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
