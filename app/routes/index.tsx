import type { LinksFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import styles from "~/styles/claytoningalls.com-old/index.css";
import profilePicture from "~/images/profile-picture.jpg";

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
        "a homebrewer",
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

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="mt-2 ml-auto navbar-nav mt-lg-0">
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
          <div className="text-center col-12" id="title">
            <h1>Clayton Ingalls</h1>
            <h4>Clean, simple, web development.</h4>
            <hr />
          </div>
          <div className="text-center vertical-line"></div>
        </div>

        {/* <!-- About --> */}
        {/* <a name="about"></a> */}
        <div className="row content-section">
          <div className="container">
            <div className="text-center col-12 section-title">
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
                  I'm a Nashville native, who lives in Lilburn, GA, just east of
                  Atlanta. I'm <span id="about-me">{aboutMeText}</span>.
                  {/*<!-- husband, dad, board game enthusiast, baker, and homebrewer. -->*/}
                </p>

                <p>
                  I'm also a coder and obsessive learner. When I decide to learn
                  something I dive in head first, which is what happened with
                  web development.
                </p>

                <p>
                  While I consider myself a full-stack developer, I find front
                  end work more enjoyable, with a growing enjoyment working with
                  React and Gatsby. I have experience with HTML, CSS,
                  Javascript, jQuery, MongoDB, Node, Express, React, Gatsby,
                  GraphQL. Keep scrolling to see examples of my work or check
                  out{" "}
                  <a href="https://www.github.com/zapbampow">
                    my code on Github
                  </a>
                  .
                </p>

                <p>
                  I love that moment when a problem has been turned into a
                  solution and when the intended message has become clear.
                </p>

                <p>
                  While I like cool design, I tend to be a minimalist when the
                  design style is up to me. I like to do what is needed in order
                  to keep the focus on the central ideas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Skills --> */}
        {/* <a name="skills"></a> */}
        <div className="row content-section" id="skills">
          <div className="container">
            <div className="text-center col-12 section-title">
              <h1>Skills</h1>
            </div>
            <div className="row">
              <div className="text-center col-12">
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
              <div className="text-center col-12">
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
            <div className="text-center col-12 section-title">
              <h1>Work</h1>
            </div>

            {/* <!-- Gatsby Blog --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://github.com/zapbampow/gatsby-blog">
                  Gatsby Blog
                </a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://github.com/zapbampow/gatsby-blog">
                  <img
                    src="/images/claytoningalls.com-old/gatsby-blog.png"
                    alt="gatsby-blog.png"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong> To use GatsbyJS, React, and
                  GraphQL to recreate an existing Wordpress blog.
                </p>
                <p>
                  <strong>The Why: </strong> Self hosted Wordpress sites{" "}
                  <em>can</em> be slow. I had heard about how using GatsbyJS can
                  pull it's data from Wordpress or another CMS, but then serve a
                  static site that is much quicker. I wanted to explore the ins
                  and outs of Gatsby.{" "}
                </p>
                <p>
                  <strong>Challenges: </strong> The biggest challenge I ran into
                  was working with images in Gatsby. There are extensions for
                  working with images and automatically serving appropriately
                  sized images. However, when I attempted to install them, it
                  failed to build. After lots of trial and error I've concluded
                  that there is something incompatiple with these extensions and
                  a windows development environment. This is still an unresolved
                  issue unfortunately.
                </p>
                <p>
                  <strong>Possible Improvements: </strong>In addition to
                  handling images differently, the site still needs responsive
                  styling added to it. Also, there are only a handful of posts
                  on it currently. Given more content, pagination will need to
                  be added.{" "}
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Church site design --> */}
            <div className="row project">
              <div className="col-12 project-title">Church Site Designs</div>
              <div className="col-md-4 col-sm-12">
                <img
                  src="/images/claytoningalls.com-old/churchsite.png"
                  alt="frugal-brewing.png"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong> To create or recreate several
                  church website designs.
                </p>
                <p>
                  <strong>The Why: </strong> My previous career in ministry has
                  given me a particular interest in church websites. In most
                  ways church websites are no different than any others. They
                  just have their particular audiences - members and potential
                  visitors. As a personal project I sometimes work on church
                  site designs. Sometimes I create my own designs. Other times I
                  recreate an existing site I find interesting.
                </p>
                <p>
                  Each of these are built from scratch and focus on using
                  Flexbox and/or CSS Grid for their layouts. Some of them also
                  exhibit my ability to take a design and recreate it.
                </p>
                <p>
                  <strong>Examples </strong>
                  <ul className="church-designs">
                    <li>
                      <a href="https://zapbampow.github.io/church-designs/DiamondDesign/index2.html">
                        The Diamond Design
                      </a>{" "}
                      inspired by{" "}
                      <a href="https://terranovachurch.org/">
                        Terra Nova Church's site
                      </a>
                      .
                    </li>
                    <li>
                      <a href="https://zapbampow.github.io/church-designs/FirstChurch/">
                        First Church Design
                      </a>{" "}
                      inspired by{" "}
                      <a href="https://www.firstchurch.com/">
                        First Church's site
                      </a>
                      .
                    </li>
                    <li>
                      <a href="https://zapbampow.github.io/church-designs/EssentialsDesign">
                        The Essentials Design
                      </a>{" "}
                      is a single page with just the most important information
                      that I think a church website should have.
                    </li>
                  </ul>
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Frugal Brewing --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://github.com/zapbampow/node-express-blog">
                  Frugal Brewing
                </a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://github.com/zapbampow/node-express-blog">
                  <img
                    src="/images/claytoningalls.com-old//frugal-brewing.png"
                    alt="frugal-brewing.png"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong>Create a blog application from
                  scratch. It uses Semantic UI as the frontend framework and
                  Node, Express, and MongoDB for the backend. Using RESTful
                  routing patterns, I've built a simple blog application that
                  includes commenting, built in post creation, post tags and
                  categories, flash messaging, and user authentication and
                  authorization.{" "}
                </p>
                <p>
                  <strong>Challenges: </strong> Because this was my first
                  application to build with Node, Mongo, and Express, there were
                  issues related to my growing familiarity with them. So I
                  learned a ton about how they work together. Playing around
                  with the growing project showed many possible errors that a
                  user could run into. So I built in flash messages to let the
                  user understand the errors they might encounter, like a post
                  not being there.
                </p>
                <p>
                  <strong>Possible Improvements: </strong>There are a number of
                  improvements I plan on adding. I want to add TinyMCE to the
                  textarea for writing articles in order to make formatting
                  things easier. I also plan to add uploading functionality so
                  that the site can more easily host the images for the
                  articles. I want to build in functionality so that when people
                  comment, it automatically emails the author of the post.
                  Speaking of commenting, the whole commenting system could be
                  more robust.{" "}
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Math Practice App Blog --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://zapbampow.github.io/math-practice-app/">
                  Math Practice App
                </a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://zapbampow.github.io/math-practice-app/">
                  <img
                    src="/images/claytoningalls.com-old//math.gif"
                    alt="math-app.gif"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong> To create a React app for
                  practicing basic math facts.
                </p>
                <p>
                  <strong>The Why: </strong> My elementary aged kids sometimes
                  say, "Dad, you should make a game for me." I wanted a fun
                  project that they could use, but didn't want to dive into game
                  design. Amazingly, my daughter occasionally asks to play my
                  math app!
                </p>
                <p>
                  <strong>Challenges: </strong>{" "}
                </p>
                <p>
                  <strong>Possible Improvements: </strong>The visual design and
                  styling can certainly be improved. However, the biggest
                  improvement that could be added would be to have a backend
                  that saves the progress of each user.{" "}
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Simon Game --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://zapbampow.github.io/Simon">Simon Game</a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://zapbampow.github.io/Simon">
                  <img
                    src="/images/claytoningalls.com-old//simon.gif"
                    alt="simon.gif"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong>Create a clone of the 80's game,
                  Simon
                </p>
                <p>
                  <strong>Challenges: </strong> The main challenges I ran into
                  with Simon were related to concurrency - when the computer ran
                  through the sequence it turned on all the lights and sounds at
                  once, instead of in order. I solved the timing issues with
                  setTimout.
                </p>
                <p>
                  <strong>Possible Improvements: </strong>The timing issues
                  could be refactored using better patterns. Additionally, the
                  visuals can be polished a bit. The game could also be improved
                  by adding code to speed up the computer's running of the
                  sequence as it gets longer.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Tic Tac Toe --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://zapbampow.github.io/TicTacToe">Tic Tac Toe</a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://zapbampow.github.io/TicTacToe">
                  <img
                    src="/images/claytoningalls.com-old//tictactoe.gif"
                    alt="tictactoe.gif"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong>Create a tic tac toe game that
                  can be played against the computer or against another player
                </p>
                <p>
                  <strong>Tools used: </strong> HTML, CSS, Bootstrap,
                  Javascript, jQuery
                </p>
                <p>
                  <strong>Challenges: </strong>{" "}
                </p>
                <p>
                  <strong>Possible Improvements: </strong>First, while the AI is
                  unbeatable, currently it doesn't always win when it has the
                  opportunity. I need to improve the AI to make sure that it
                  always wins if possible.
                </p>
                <p>
                  Second, although it is probably overkill for tic tac toe, the
                  game would be improved and the AI would play a more varied
                  style if I implemented the Minimax algorithm instead of my
                  homegrown logic, which hard codes certain moves in certain
                  situations. Minimax would make it a more "flexible" game.
                </p>
                <p>
                  Finally, the visual design isn't going to win any awards and
                  would be improved with some work on polishing it up.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Pomodoro Clock --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://zapbampow.github.io/Eclipse-Pomodoro-Clock">
                  Eclipse Pomodoro Timer
                </a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://zapbampow.github.io/Eclipse-Pomodoro-Clock">
                  <img
                    src="/images/claytoningalls.com-old//eclipse.gif"
                    alt="eclipse.gif"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong>Create a pomodoro clock, which
                  goes through two seperate countdown cycles before restarting.
                </p>
                <p>
                  <strong>Tools used: </strong> HTML, CSS, Bootstrap,
                  Javascript, jQuery
                </p>
                <p>
                  <strong>Challenges: </strong> I created this as part of
                  freeCodeCamp, so there are plenty of these tools out there.
                  However, as I looked for an eclipse animation to work off of,
                  I couldn't find any that I liked. I used this as an
                  opportunity to dive into CSS animation and create something
                  that I haven't seen anywhere else.
                </p>
                <p>
                  <strong>Possible Improvements: </strong>There are a few of
                  usability issues to change. First, it would save if the user
                  could simply type in the amounts for the 2 countdown clocks.
                  Additionally, being able to click "Enter" or the spacebar to
                  start and stop the clock would add a little usability.
                  Finally, I also want to continue improving the animation and
                  graphic design of this tool. On screens smaller than 520px
                  wide the elements for the CSS animation don't line up
                  correctly. This needs to be fixed.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Calculator --> */}
            <div className="row project">
              <div className="col-12 project-title">
                <a href="https://zapbampow.github.io/calculator">
                  A Javascript Calculator
                </a>
              </div>
              <div className="col-md-4 col-sm-12">
                <a href="https://zapbampow.github.io/calculator">
                  <img
                    src="/images/claytoningalls.com-old//calculator.gif"
                    alt="calculator.gif"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div className="col-md-8 col-sm-12">
                <p>
                  <strong>The Project: </strong>Create calculator for basic math
                  using Javascript.
                </p>
                <p>
                  <strong>Tools used: </strong> HTML, CSS, Bootstrap,
                  Javascript, jQuery
                </p>
                <p>
                  <strong>Challenges: </strong> the biggest challenge was
                  figuring out the logic to make all the functionality work -
                  how to store and clear all the variables, how to make all the
                  button clicks do what is needed.
                </p>
                <p>
                  <strong>Possible Improvements: </strong>There are some
                  usability issues that I'd like to address. First, it could use
                  2 clearing buttons, C and AC. The current Clear button acts as
                  the AC button. It clears everything. To be more like a
                  standard calculator it could use a C button to clear the last
                  input.
                </p>
                <p>
                  Second, when a user enters "1+1+1+1," it gives the correct
                  answer. But it doesn't show an updated tally as they go
                  through. I would like to add that functionality.
                </p>
                <p>
                  Finally, it would be nice if you could see the full string of
                  inputs from a multistep problem. So that would mainly include
                  updating the UI.
                </p>
              </div>
            </div>

            <hr />

            {/* <!-- Other Projects --> */}
            <div className="row project">
              <div className="col-12 project-title">Other Projects</div>

              {/* <!-- Simpsons Quotes --> */}
              <div className="text-center col-md-4 col-sm-12 other-project-title">
                <a href="https://zapbampow.github.io/simpsons-random-quote-generator/">
                  <img
                    className="img-fluid img-thumbnail"
                    src="/images/claytoningalls.com-old//simpsons-screenshot.png"
                    alt="simpsons screenshot"
                  />
                  <h4>Simpsons Quote Generator</h4>
                </a>
              </div>

              {/* <!-- Local Weather App --> */}
              <div className="text-center col-md-4 col-sm-12 other-project-title">
                <a href="https://zapbampow.github.io/local-weather-app/">
                  <img
                    className="img-fluid img-thumbnail"
                    src="/images/claytoningalls.com-old//weather-screenshot.png"
                    alt="weather screenshot"
                  />
                  <h4>Local Weather App</h4>
                </a>
              </div>

              {/* <!-- Wikipedia Viewer --> */}
              <div className="text-center col-md-4 col-sm-12 other-project-title">
                <a href="https://zapbampow.github.io/local-weather-app/">
                  <img
                    className="img-fluid img-thumbnail"
                    src="/images/claytoningalls.com-old//wikipedia-screenshot.png"
                    alt=""
                  />
                  <h4>Wikipedia Viewer</h4>
                </a>
              </div>

              {/* <!-- Twitch API Project --> */}
              {/* <div className="text-center col-md-3 col-sm-12 other-project-title">
                <a href="work/otherwork/twitch">
                  <img
                    className="img-fluid img-thumbnail"
                    src="/images/claytoningalls.com-old//twitch-screenshot.png"
                    alt=""
                  />
                  <h4>Twitch API Project</h4>
                </a>
              </div> */}
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
          <div className="text-center col-12 section-title">
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
          <div className="text-center col-lg-2 col-md-3 col-xs-12 contact-method">
            <a href="https://www.linkedin.com/in/clayton-ingalls/">
              <i className="fa fa-linkedin fa-2x"></i>
              <p>LinkedIn</p>
            </a>
          </div>
          <div className="text-center col-lg-2 col-md-3 col-xs-12 contact-method">
            <a href="https://www.github.com/zapbampow">
              <i className="fa fa-github fa-2x"></i>
              <p>Github</p>
            </a>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="row">
          <div className="text-center footer col-12 bg-dark">
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
