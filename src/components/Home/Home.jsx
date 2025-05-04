import React from 'react';
import './Home.css';// Assuming 'css/index.css' is the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faBookReader, faBookOpen, faBook, faChartLine, faPhoneAlt, faEnvelope, faMap } from '@fortawesome/free-solid-svg-icons';
import { faMap as farMap, faEnvelope as farEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import CardSlider from './CardSlider';

const sliderData = [
  {
    image: '/image/Adi.jpeg',
    altText: 'Image 2',
    name: 'ADITYA V',
  },
  {
    image: '/image/Arthan.png',
    altText: 'Image 2',
    name: 'ARTHAN M GOWDA',
  },
  {
      image: '/image/GG.jpg',
      altText: 'Image 1',
      name: 'GAGAN SHIVANNA',
  },
  {
    image: '/image/Karthik.jpeg',
    altText: 'Image 1',
    name: 'KARTHIK H N',
  }
/*
{
  image: '/image/Arjun.jpeg',
  altText: 'Image 1',
  name: 'ARJUN BHARADWAJ',
  profession: 'FRONT END/UI UX'
},
{
  image: '/image/Chaitra.jpeg',
  altText: 'Image 2',
  name: 'CHAITRA M',
  profession: 'FRONT END'
}*/
  // Add more items as needed
];
class Home extends React.Component {
  toggleMenu = () => {
    const menu = document.getElementById("menu");
    if (menu.style.maxHeight === "0px") {
      menu.style.maxHeight = "390px";
    } else {
      menu.style.maxHeight = "0px";
    }
  };

  render() {
    return (
      <div>
        <div className="nevbar" id="nevbar">
          <div className="logo">
            <a href="" id="logo"><h1><span>Pegasus</span> CHARITY</h1></a>
          </div>
          <div className="menu" id="menu">
            <ul>
              <li><a id="home" href="">Home</a></li>
              <li><a href="#explore">Explore</a></li>
              <li><a href="#service">Service</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="https://metamask.io/">Metamask</a></li>
              <li><a href="https://www.investopedia.com/terms/b/blockchain.asp">Blockchain</a></li>
            </ul>
          </div>
          <div className="menuicon" onClick={this.toggleMenu}>
            <FontAwesomeIcon icon={faChevronCircleDown} />
            <span>MENU</span>
          </div>
        </div>
        <div className="cover" data-aos='fade up'>
      <div className="information">
          <h1>-</h1>
          <h3>Empower Change:</h3>
          <h2>Donate with Trust on Blockchain</h2>
          <h1>
            {' '}
            <span>FUTURE</span>{' '}
          </h1>
          <h3>
            {' '}
            <span>The Pegasus Foundation Charity</span>{' '}
          </h3>
          <h1>-</h1>
          <a href="#explore">
            <button>EXPLORE</button>
          </a>
          <a href="#explore">
            <button>SIGN UP TO DONATE</button>
          </a>
        </div>
    </div>
    <div className="about" id="explore">
        <div className="aboutcontent">
          <h5>_</h5>
          <h1>Why Choose The Pegasus Foundation Charity?</h1>
          <p>
          Secure and Transparent
          Harnessing the security of blockchain, every donation is transparently recorded, ensuring the utmost integrity in financial transactions. Your trust is our priority.
          Direct Impact.
          </p>
          <p>
          Your donations go directly to trusted NGOs and causes. Witness the real-time impact of your contribution and be part of a community making a difference.
          Decentralized Giving
          </p>

          <p>
          By leveraging blockchain's decentralized nature, we eliminate intermediaries, reducing costs and ensuring that more of your money reaches those who need it most.
          </p>
          <a
            href="/user-signup"
            target="black"
          >
            SIGN UP AS USER
          </a>
          <h5>_</h5>
        </div>
        <div className="aboutcontent">
          <h5>_</h5>
          <h1>How It Works</h1>
          <p>
          Explore Trusted NGOs: Browse through a curated list of reputable NGOs and causes. Each organization is thoroughly vetted to ensure your contribution makes a meaningful impact.
          </p>
          <p>
          Transparent Donations: See exactly how your donations are utilized. Blockchain technology guarantees transparency, providing a detailed and immutable record of every transaction.
          </p>
          <p>
          Real-Time Impact: Watch your impact unfold in real-time. From education and healthcare to environmental conservation, your support drives positive change.
          </p>
          <a
            href="\ngo-signup"
            target="black"
          >
            SIGN UP AS NGO
          </a>
          <h5>_</h5>
        </div>
    </div>
<div className='details'>
<CardSlider data={sliderData} />
</div>
    <div className="contact" id="contact">
      <h1>CONTACT ME</h1>
      <div className="contactcontanner">
        <div className="contanner">
          <div className="heading">
            <div className="icon">
            <FontAwesomeIcon icon={faMap} />
            </div>
            <div className="info">
              <p>Address : </p>
              <p id="contactinfo">
                Gagan Shivanna, Resident at Marina Bay , Sheik Zayed Main Road , E11 , Dubai 
              </p>
            </div>
          </div>

          <div className="heading">
            <div className="icon">
            <FontAwesomeIcon icon={faPhoneAlt} />
            </div>
            <div className="info">
              <p>Phone : </p>
              <p id="contactinfo">+971 96969696</p>
            </div>
          </div>

          <div className="heading">
            <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="info">
              <p>Email : </p>
              <p id="contactinfo">adityadbss@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="messageform">
          <div className="form">
            <form action="" method="POST">
              <input
                type="text"
                name="name"
                placeholder="NAME"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="SUBJECT"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                required
              />
              <textarea
                type="message"
                name="message"
                id="inputbox"
                cols="30"
                rows="5"
                placeholder="MESSAGE"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                required
              ></textarea>
              <button type="submit">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="contercontent">
    <div className="counterbox one">
      <div className="information" data-aos="fade-down">
        <div className="number">
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Pegasus</p>
        </div>
        <div className="text">
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            
          </p>
        </div>
      </div>
    </div>

    <div className="counterbox">
      <div className="information" data-aos="fade-down">
        <div className="number">
          <p>Loves</p>
        </div>
        <div className="text">
          <p>
            To <br /> Do
          </p>
        </div>
      </div>
    </div>

    <div className="counterbox">
      <div className="information" data-aos="fade-down">
        <div className="number">
          <p>Social</p>
        </div>
        <div className="text">
          <p>
            Work <br /> 
          </p>
        </div>
      </div>
    </div>

    <div className="counterbox">
      <div className="information" data-aos="fade-down">
        <div className="number">
          <p>&Blockchain</p>
        </div>
        <div className="text">
          <p>
            
          </p>
        </div>
      </div>
    </div>
  </div>
        <footer>
          <p>&copy; Made By Team Pegasus<a href="" target="_blank"><strong>Team Pegasus</strong></a> | <a href="" target="_blank"><strong>The Pegasus Foundation</strong></a></p>
        </footer>
</div>
    );
  }
}

export default Home;