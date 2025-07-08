import { useAuth } from "../store/auth";
import { motion } from "framer-motion";

// Animation constants
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97], // Custom bezier curve for smoother motion
    },
  },
};

// Staggered animation components
const StaggeredContainer = ({ children, className, threshold = 0.2 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px 0px -50px 0px", amount: threshold }}
    variants={CONTAINER_VARIANTS}
  >
    {children}
  </motion.div>
);

const About = () => {
  const { user } = useAuth();

  const features = [
    <>
      <strong>Secure Authentication:</strong> Industry-standard security with
      OAuth 2.0, JWT, and biometric options
    </>,
    <>
      <strong>24/7 Support:</strong> Average 5-minute response time, ready to
      assist anytime
    </>,
    <>
      <strong>Regular Updates:</strong> Bi-weekly improvements based on user
      feedback
    </>,
    <>
      <strong>User-Friendly Interface:</strong> Award-winning design with 95%
      satisfaction
    </>,
    <>
      <strong>Cross-Platform:</strong> Responsive web and native mobile apps
    </>,
  ];

  return (
    <>
      {/* Meta tag for about page */}
      <title>About Us | MERN React19 Site </title>
      <meta name="description" content="Learn more about us" />
      <meta name="keyword" content="aboutpage, seo, meta" />
      <meta name="author" content="Rock" />
      <link rel="canonical" content="https://mern-simp-website.vercel.app" />

      <motion.section className="about-section container" aria-label="About us">
        {/* Welcome Section - Animate when 20% visible */}
        <StaggeredContainer className="main-section" threshold={0.4}>
          {user ? (
            <motion.h2 className="welcome-message" variants={ITEM_VARIANTS}>
              Welcome back, {user.username} 🙏
            </motion.h2>
          ) : (
            <motion.p className="login-prompt" variants={ITEM_VARIANTS}>
              *Please login to access personalized features
            </motion.p>
          )}
          <motion.h1 className="main-heading" variants={ITEM_VARIANTS}>
            Why Choose Our Platform?
          </motion.h1>
        </StaggeredContainer>

        {/* About Content - Animate when 20% visible */}
        <StaggeredContainer className="about-content" threshold={0.4}>
          <motion.div className="about-text" variants={ITEM_VARIANTS}>
            <motion.p variants={ITEM_VARIANTS}>
              We provide the best user experience with cutting-edge technology
              and personalized services, focusing on security, performance, and
              satisfaction.
            </motion.p>
            <motion.p variants={ITEM_VARIANTS}>
              Since 2020, we've helped 500,000+ users with innovative solutions.
              Our 50+ expert team maintains 99.9% uptime and highest quality
              standards.
            </motion.p>
          </motion.div>
        </StaggeredContainer>

        {/* Features - Animate when 20% visible */}
        <StaggeredContainer className="features-container" threshold={0.4}>
          <motion.article className="features" variants={ITEM_VARIANTS}>
            <motion.h2 variants={ITEM_VARIANTS}>Key Features :-</motion.h2>
            <motion.ul className="features-list">
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  variants={ITEM_VARIANTS}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        </StaggeredContainer>

        {/* Mission - Animate when 50% visible with different margin */}
        <motion.div
          className="mission-container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10px 0px" }}
          variants={CONTAINER_VARIANTS}
        >
          <motion.div className="mission" variants={ITEM_VARIANTS}>
            <motion.h3 variants={ITEM_VARIANTS}>
              Our Mission & Vision :-
            </motion.h3>
            <motion.p variants={ITEM_VARIANTS}>
              To empower 10M+ individuals and businesses by 2025 through
              technology that simplifies tasks, 3x productivity, and digital
              economy connections.
            </motion.p>
            <motion.p className="stats" variants={ITEM_VARIANTS}>
              <strong>Current stats:</strong> 500K+ users • 95% satisfaction •
              4.9/5 rating • 50+ countries
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default About;
