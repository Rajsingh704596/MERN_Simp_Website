import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Home = () => {
  const stats = [
    { value: "50+", label: "registered companies" },
    { value: "100+", label: "Happy Clients" },
    { value: "500+", label: "well known developers" },
    { value: "24/7", label: "service" },
  ];

  return (
    <motion.section
      className="section-hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <main>
        <div className="container grid grid-two-cols">
          {/* Content Section */}
          <motion.div className="hero-content" variants={containerVariants}>
            <motion.h1 variants={fadeUp}>Welcome to Home page</motion.h1>
            <motion.h2 variants={fadeUp}>
              Transform Your Digital Presence
            </motion.h2>

            <motion.div variants={containerVariants}>
              <motion.p variants={fadeUp}>
                We create custom solutions that help businesses grow in the
                digital world. Our team of experts delivers high-quality
                products tailored to your needs.
              </motion.p>

              <motion.div className="child" variants={fadeUp}>
                <NavLink to="/contact">
                  <motion.button
                    aria-label="Connect now and fill contact page"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Connect Now
                  </motion.button>
                </NavLink>
                <NavLink to="/service">
                  <motion.button
                    className="sec-btn"
                    aria-label="Learn more about our service"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </NavLink>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.figure
            className="hero-image"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
          >
            <picture>
              <source
                srcSet="/image.webp"
                type="image/webp"
                width="400"
                height="400"
              />
              <source
                srcSet="/image.jpg"
                type="image/jpeg"
                width="400"
                height="400"
              />
              <motion.img
                src="/image.jpg"
                alt="Developer Image"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <motion.figcaption variants={fadeIn}>
              Developer Image
            </motion.figcaption>
          </motion.figure>
        </div>
      </main>

      {/* Stats Section */}
      <motion.section
        className="section-analytics"
        viewport={{ once: true, amount: 0.2 }}
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        <div className="container grid grid-four-cols">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="div1"
              variants={fadeUp}
              whileHover={{ y: -3 }}
            >
              <motion.h2>{stat.value}</motion.h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.section>
  );
};

export default Home;
