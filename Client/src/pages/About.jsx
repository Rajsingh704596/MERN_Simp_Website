import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();

  return (
    <section className="about-section container">
      <main className="main-section">
        {user ? (
          <h2 className="welcome-message">Welcome back, {user.username} 🙏</h2>
        ) : (
          <p className="login-prompt">
            *Please login to access personalized features
          </p>
        )}

        <div>
          <h1 className="main-heading">Why Choose Our Platform?</h1>
        </div>
      </main>

      <div className="about-content">
        <div className="about-text">
          <p>
            We are dedicated to providing the best user experience with
            cutting-edge technology and personalized services. Our platform is
            built with security, performance, and user satisfaction in mind.
          </p>

          <p>
            Since our founding in 2020, we've helped thousands of users achieve
            their goals through our innovative solutions. Our team of experts
            works tirelessly to ensure our platform meets the highest standards
            of quality and reliability.
          </p>
        </div>

        <article className="features">
          <h2>Key Features:</h2>
          <ul className="features-list">
            <li>
              <strong>Secure Authentication:</strong> Industry-standard security
              to protect your data
            </li>
            <li>
              <strong>24/7 Support:</strong> Our team is always ready to assist
              you
            </li>
            <li>
              <strong>Regular Updates:</strong> Continuous improvements and new
              features
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Intuitive design for
              seamless navigation
            </li>
            <li>
              <strong>Cross-Platform Compatibility:</strong> Access from any
              device, anywhere
            </li>
          </ul>
        </article>

        <div className="mission">
          <h3>Our Mission</h3>
          <p>
            To empower individuals and businesses through technology that
            simplifies complex tasks, enhances productivity, and connects people
            with the resources they need to succeed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
