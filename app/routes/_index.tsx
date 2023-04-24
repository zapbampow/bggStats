import type { LinksFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import styles from "~/styles/claytoningalls.com-old/index.css";
import profilePicture from "~/images/profile-picture.jpg";
import { Link } from "@remix-run/react";

console.log("styles", styles);

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Josefin+Sans:700|Raleway:600,700",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css",
    },
    {
      rel: "stylesheet",
      href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
      // has prefetch in original code
    },
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "icon",
      type: "image/x-con",
      href: "/images/claytoningalls.com-old/favicon-dark.png",
    },
    {
      rel: "icon",
      type: "image/x-con",
      href: "/images/claytoningalls.com-old/favicon.png",
      media: "(prefers-color-scheme: dark)",
    },
  ];
};

export default function Index() {
  const [aboutMeText, setAboutMeText] = useState("a husband");

  useEffect(() => {
    aboutMe();
  }, []);

  const aboutMe = () => {
    let i = 0;

    function words() {
      const arr = [
        "a husband",
        "a dad",
        "a baker",
        "a boardgame enthusiast",
        // "a homebrewer",
        "a backyard chicken raiser",
        "a sci-fi novel fan",
        "a priest",
        "a weirdo",
        "a 9 on the Enneagram",
        "an INTJ",
      ];

      if (i < arr.length - 1) {
        i++;
      } else {
        i = 0;
      }

      let word = arr[i];

      setAboutMeText(word);
    }

    setInterval(words, 1500);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand brand" href="#">
            <img
              id="navbar-logo"
              src="/images/claytoningalls.com-old/logo.png"
              alt="logo"
            />
            Clayton Ingalls{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mt-lg-0 ml-auto mt-2">
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#work">
                  Work
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- Splash Page --> */}
      <div className="container-fluid">
        <div className="row splash justify-content-center" id="home">
          <div className="col-12 text-center" id="title">
            <h1>Clayton Ingalls</h1>
            <h4>Web developer</h4>
            <hr />
          </div>
          <div className="vertical-line text-center"></div>
        </div>

        {/* <!-- About --> */}
        {/* <a name="about"></a> */}
        <div className="row content-section">
          <div className="container">
            <div className="col-12 section-title text-center">
              <h1>About</h1>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <img
                  src="/images/claytoningalls.com-old/profile-picture.jpg"
                  alt="profile"
                  className="img-fluid"
                />
              </div>

              <div className="col-md-8 col-sm-12">
                <p>
                  I'm a frontend developer with expertise in React. Over my
                  career I've worked with client-side React, Next, Gatsby, and
                  Remix. Of course it wouldn't be much of frontend career
                  without some jQuery and a variety of CSS libraries thrown in
                  there.{" "}
                </p>

                <p>
                  Since frontend is now largely full-stack, I also have
                  experience with Node, Express, SQL, MongoDB, and GraphQL. I'm
                  always learning and looking for new challenges.
                </p>

                <p>
                  I love that moment when a problem has been turned into a
                  solution and when everything works as it's designed.
                </p>

                <p>
                  While I like cool design, I tend to be a minimalist when the
                  design style is up to me. I like to do what is needed in order
                  to keep the focus on the central ideas.
                </p>

                <p>
                  In additon to coding, I'm a Nashville native, but live just
                  outside of Atlanta. And I'm{" "}
                  <span id="about-me">{aboutMeText}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Skills --> */}
        {/* <a name="skills"></a> */}
        <div className="row content-section" id="skills">
          <div className="container">
            <div className="col-12 section-title text-center">
              <h1>Skills</h1>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <span
                  className="devicon-html5-plain devi-size"
                  data-toggle="tooltip"
                  title="HTML"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-css3-plain devi-size"
                  data-toggle="tooltip"
                  title="CSS"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-javascript-plain devi-size"
                  data-toggle="tooltip"
                  title="JavaScript"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-jquery-plain devi-size"
                  data-toggle="tooltip"
                  title="jQuery"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-bootstrap-plain devi-size"
                  data-toggle="tooltip"
                  title="Bootstrap"
                  data-placement="top"
                ></span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                <span
                  className="devicon-github-plain devi-size"
                  data-toggle="tooltip"
                  title="Git and GitHub"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-react-original-wordmark devi-size"
                  data-toggle="tooltip"
                  title="React"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-nodejs-plain devi-size"
                  data-toggle="tooltip"
                  title="NodeJS"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-mongodb-plain devi-size"
                  data-toggle="tooltip"
                  title="MongoDB"
                  data-placement="top"
                ></span>
                <span
                  className="devicon-express-original devi-size"
                  data-toggle="tooltip"
                  title="Express"
                  data-placement="top"
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Work --> */}
        {/* <a name="work"></a> */}
        <div className="row content-section" id="work">
          <div className="container">
            {/* <div className="text-center col-12 section-title">
              <h1>Work</h1>
            </div> */}

            {/* <!-- BGG STATS --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <Link to="/bggstats/acciopatronus/plays">BBG Play Stats</Link>
              </div>
              <div className="col-md-4 col-sm-12">
                <Link to="/bggstats/acciopatronus/plays">
                  <img
                    src="/images/claytoningalls.com-old/bggstats.png"
                    alt="gatsby-blog.png"
                    className="img-fluid"
                  />
                </Link>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  This is a personal passion project. As enthusiastic board
                  gamers, my family has recorded what games we play on Board
                  Game Geek (BGG) since 2009. At the end of each year I ask
                  questions about the games we played over the last year. There
                  were no tools that answered the exact questions I wanted to
                  answer. Things like "How many games did I play with just my
                  wife and kids? How many games did each of us win?" (My wife
                  wins the most. <span>👩‍❤️👨</span>)
                </p>
                <p>
                  So in my free time I built this app to let me easily drill
                  down to the data I wanted.
                </p>
                <p>
                  It uses React with Tailwind and Headless UI on the front end.
                  BGG has an API to retrieve data. I use fetch-retry to manage
                  an exponential backoff retry strategy in order to not be
                  blocked by the BGG API. Then the data is stored in the
                  browser's IndexedDB to make filtering the data very fast.
                </p>
                <p>
                  This was a lot of fun to build and I got to explore a variety
                  of technologies and coding strategies that I hadn't worked
                  with before, like piping from functional programming,
                  exponential backing off, and IndexedDB.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- FLOCKNOTE --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://www.flocknote.com">Flocknote</a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://www.flocknote.com">
                  <img
                    src="/images/claytoningalls.com-old/flocknote-login.png"
                    alt="gatsby-blog.png"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>Frontend Developer</strong>
                  <br />
                  <strong>Mar 2022 - present</strong>
                </p>
                <p>
                  <strong>The Role: </strong> I build new product features with
                  React, in partnership with sprint teams, and help maintain the
                  existing codebase.
                </p>
                <p>
                  I'm particularly proud of completing a mission critical new
                  frontend for our login flow and adding a UI for recurring
                  payments to our payments and donation features. I also fixed a
                  persnickety bug that was caused when React interacted with our
                  legacy app, which has made the smoothness and stability of our
                  overall app much better.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- NCF --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://www.ncfgiving.com">NCF</a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://www.ncfgiving.com">
                  <img
                    src="/images/claytoningalls.com-old/ncf.png"
                    alt="gatsby-blog.png"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>Senior Application Developer</strong>
                  <br />
                  <strong>Oct 2021 - Feb 2022</strong>
                </p>

                <p>
                  I built proof of concept apps in Next and Remix to help the
                  organization explore moving their core application to
                  serverside React with a Salesforce backend.
                </p>
                <p>
                  I massively improved the developer experience by refactoring
                  legacy code from a few multi-thousand lined files into many
                  smaller files bundled with Webpack.
                </p>
                <p>
                  I improved mobile responsiveness of the primary client-facing
                  application.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- WOV --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://www.withone.vision">With One Vision</a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://www.withone.vision">
                  <img
                    src="/images/claytoningalls.com-old/wov.png"
                    alt="gatsby-blog.png"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>Frontend Web Developer</strong>
                  <br />
                  <strong>Sep 2018 - Sep 2021</strong>
                </p>
                <p>
                  <strong>The Role: </strong> I build new product features with
                  React, in partnership with sprint teams, and help maintain the
                  existing codebase.
                </p>
                <p>
                  I replaced a legacy application with React and Material UI to
                  manage the writing, approving, and sending of 1,000,000 texts
                  and emails per year.
                </p>
                <p>
                  I designed and built an internal staff site for the sharing
                  and requesting of resources with React, Form.io, and custom
                  CSS..
                </p>
                <p>
                  I led the implementation of notifications and universal links
                  in our React Native app
                </p>
                <p>
                  I partnered with coworker to develop the table structures and
                  API endpoints for a contact management feature in our mobile
                  app using React and Knex.
                </p>
                <p>
                  I worked with a client to develop an executable Node
                  application to retrieve specified data and save it as a local
                  excel file.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Contact -->
    <!-- Skills --> */}
        {/* <a name="contact"></a> */}
        <div
          className="row content-section justify-content-center"
          id="contact"
        >
          <div className="col-12 section-title text-center">
            <h1>Connect</h1>
          </div>

          <div className="social-row"></div>
          {/* Email */}
          {/* <div className="text-center col-lg-2 col-md-3 col-xs-12 contact-method">
            <SCRIPT TYPE="text/javascript">
          <!--
          // protected email script by Joe Maller
          // JavaScripts available at http://www.joemaller.com
          // this script is free to use and distribute
          // but please credit me and/or link to my site

          emailE='claytoningalls.com'
          emailE=('mail' + '@' + emailE)
          document.write('<A href="mailto:' + emailE + '"><i className="fa fa-envelope fa-2x"></i><p>' + emailE + '</p></a>')

           //-->
          </script>

          <NOSCRIPT>
              <em>Email address protected by JavaScript.<BR>
              Please enable JavaScript to contact me by email.</em>
          </NOSCRIPT>
          </div> */}
          {/* Twitter */}
          {/* <div className="text-center col-lg-2 col-md-3 col-xs-12 contact-method">
            <a href="https://www.twitter.com/zapbampow">
              <i className="fa fa-twitter fa-2x"></i>
              <p>Twitter</p>
            </a>
          </div> */}
          <div className="col-lg-2 col-md-3 col-xs-12 contact-method text-center">
            <a href="https://www.linkedin.com/in/clayton-ingalls/">
              <i className="fa fa-linkedin fa-2x"></i>
              <p>LinkedIn</p>
            </a>
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 contact-method text-center">
            <a href="https://www.github.com/zapbampow">
              <i className="fa fa-github fa-2x"></i>
              <p>Github</p>
            </a>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="row">
          <div className="footer col-12 bg-dark text-center">
            <p>
              This site was created by myself, Clayton Ingalls. Find the code
              for it or any of my other projects on{" "}
              <a
                href="https://www.github/com/zapbampow"
                className="footer-link"
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>

        {/* <!-- End Container --> */}
      </div>
    </>
  );
}
