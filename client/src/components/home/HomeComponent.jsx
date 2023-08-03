import globe from "../../assets/globe.jpg";
function HomeComponent() {
  return (
    <div className="home">
      <div className="first">
        <div className="firstLeft">
          <h3>Necessity and invention</h3>
          <p>
            Shoush was founded in 1996, driven by the desire to democratize
            scientific research by expanding its availability, which meant
            giving scholarly publishers the software that they needed to excel
            in a new—and often intimidating—digital environment.
          </p>
          <p>
            Shoush’s initial development efforts resulted in Literatum, our
            online publishing and website development platform, first released
            in 1999. What was a five-person technology startup in Silicon Valley
            is now an influential global organization with a team of 500 in six
            offices across the United States, the UK, Jordan, the Czech
            Republic, Greece, and China.
          </p>
        </div>
        <div className="firstRight">
          <img src={globe} alt="globe" />
        </div>
      </div>

      <div className="second">
        <div className="secondLeft">
          <h3>Technology specifically for publishers</h3>
          <p>
            Over the 25+ years that Literatum has been in continuous
            development, we’ve gained a deep understanding of what it takes to
            power a successful online publishing business. Our product
            development is driven in part by our clients’ requirements for their
            own businesses. New features are regularly added to meet the design,
            editorial, and marketing needs of our expanding client base.
          </p>

          <h3 style={{ marginTop: "5rem " }}>
            A fast-growing technology company
          </h3>
          <p>
            Today Shoush has over 200 clients, including some of the world’s
            largest publishers; several date back to our first years in
            business. Literatum is home to 32 million articles in over 15,000
            journals, as well as nearly half a million books, in over a dozen
            languages and on more than 900 publication websites. The platform
            logs over 5.1 billion user sessions annually. We rival larger
            Silicon Valley companies in our aggressive pursuit of new
            technologies. Engineers comprise more than two thirds of our staff,
            and our ongoing, award-winning R&D team applies machine learning and
            AI-based technologies that keep our customers at the forefront of
            online publishing.
          </p>
        </div>
        <div className="secondRight">
          <h3>Technology in the service of knowledge</h3>
          <p>
            Our clients want to promote and distinguish their brands while
            forging lasting connections with their readers. So we look at
            publishing through the eyes of readers and authors, because we
            believe that prioritizing their online experience is the best way to
            foster a loyal customer base.
          </p>

          <p>
            We’re building new tools to make the workflows of practitioners,
            clinicians, and researchers more convenient and productive—from
            discovery and reading to collaborating and authoring.
          </p>

          <p>
            Our focus today remains much the same as it was more than 25 years
            ago: providing superior technology and personal service to help
            publishers grow their online businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
