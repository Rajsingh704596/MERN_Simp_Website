import { useState } from "react";

const Contact = () => {
  const [userDtl, setUserDtl] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDtl((prev) => ({ ...prev, [name]: value }));
  };

  // handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDtl);

    try {
      const res = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDtl),
      });
      // console.log("contact form fill then get response", res);
      if (res.ok) {
        setUserDtl({
          username: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log("Message not sent", error);
    }
  };

  return (
    <>
      <section className="section-hero">
        <div className=" grid grid-two-cols">
          {/* Image */}
          <div className="hero-image">
            <img src="/image.jpg" alt="contact" width="400" />
          </div>
          {/* Registration form */}
          <form onSubmit={handleSubmit}>
            <div className="contact">
              <h1>Contact Us</h1>

              <div>
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="username"
                  value={userDtl.username}
                  onChange={handleChange}
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  value={userDtl.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message :</label>
                <textarea
                  type="message"
                  autoComplete="off"
                  name="message"
                  value={userDtl.message}
                  onChange={handleChange}
                  id="message"
                  placeholder="Enter your message"
                  required
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>

        <div className="embed-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d217962.37039561427!2d75.6257456!3d26.8854214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e1!3m2!1sen!2sin!4v1744528206123!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
