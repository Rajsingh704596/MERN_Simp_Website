import { useAuth } from "../store/auth";

const About = () => {
  const { user } = useAuth();
  return (
    <section className="section-hero">
      {user ? (
        <p>Welcome to our website, {user.username}</p>
      ) : (
        <p>Please login to see personalized content</p>
      )}
      <br />

      <h1>Why choose Us ?</h1>

      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
        dignissimos rem impedit, architecto, voluptates perspiciatis ducimus
        magnam et assumenda dolorem numquam eaque. Iure neque dolores adipisci
        dolorem illo odio corrupti!
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
        ratione, incidunt dolor nihil illum debitis est deleniti voluptas
        excepturi dolores nemo magnam rerum neque voluptates laborum at nesciunt
        tempora nulla voluptate fuga culpa sed maiores? Laborum nobis corporis a
        aliquid accusamus, pariatur natus impedit ipsam iste, deleniti maiores
        quam cumque?
      </div>
      <br />
      <div>
        <ul>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, aliquam.
          </li>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, aliquam.
          </li>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, aliquam.
          </li>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, aliquam.
          </li>
          <li>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Cupiditate, aliquam.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
