import { useAuth } from "../store/auth";
import { motion, useReducedMotion } from "framer-motion";

const Service = () => {
  const { service } = useAuth(); // data get from context api store using custom useContext hook
  const shouldReduceMotion = useReducedMotion(); // Respect user's motion preferences

  // Animation variants (defined outside component to prevent recreation)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Faster stagger for many items
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } } // Simplified for reduced motion
    : {
        hidden: { y: 20, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.5,
          },
        },
        hover: {
          y: -5,
          transition: { duration: 0.2 },
        },
      };

  return (
    <>
      {/* Meta tag for about page */}
      <title>Service | MERN React19 Site </title>
      <meta name="description" content="Our Service" />
      <meta name="keyword" content="service,service page, seo, meta" />
      <meta name="author" content="Rock" />
      <link rel="canonical" content="https://mern-simp-website.vercel.app" />

      <motion.section
        className="container service"
        aria-label="service page"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -150px 0px" }} // Early trigger for better UX
        variants={containerVariants}
      >
        <motion.span variants={itemVariants}>
          <h1>Services</h1>
        </motion.span>

        <motion.article
          className="grid grid-three-cols"
          variants={containerVariants}
        >
          {service?.map((curService, index) => {
            const { _id, service, description, price, provider } = curService;

            return (
              <motion.li
                key={_id}
                className="card"
                variants={itemVariants}
                custom={index}
                whileHover="hover"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }} // Partial visibility triggers animation
                layout // Smooth layout animations
              >
                <motion.figure layout>
                  <picture>
                    {/* WebP format (modern browsers) */}
                    <source
                      srcSet="/Service.webp"
                      type="image/webp"
                      width="200"
                    />
                    {/* Fallback JPEG format (older browsers) */}
                    <source
                      srcSet="/Service.jpg"
                      type="image/jpeg"
                      width="200"
                    />
                    {/* Default Contact image with alt text and dimensions */}
                    <img
                      src="/Service.jpg"
                      alt="Developer Image"
                      width="200"
                      loading="lazy" // Lazy loading for better performance
                      decoding="async" // Async decoding for better rendering
                    />
                  </picture>
                </motion.figure>
                <motion.figcaption layout>
                  <motion.h3 variants={itemVariants}>{service}</motion.h3>
                  <motion.p variants={itemVariants}>{description}</motion.p>
                  <motion.div className="card-badge" variants={itemVariants}>
                    <p>{price}</p>
                    <p>{provider}</p>
                  </motion.div>
                </motion.figcaption>
              </motion.li>
            );
          })}
        </motion.article>
      </motion.section>
    </>
  );
};

export default Service;
