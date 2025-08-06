import "../styles/navbar.css";
import Link from 'next/link';

export default function Navbar() {


    return (
        <nav className="navbar">

        <div className="main">
            
            <div className="logo-container">
                <img
    fetchPriority="high"
    sizes="190px"
    srcSet="
      https://static.wixstatic.com/media/86ae48_38295846b4fd47b1bad7966631954623~mv2.png/v1/fill/w_190,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/header%20logo.png 1x,
      https://static.wixstatic.com/media/86ae48_38295846b4fd47b1bad7966631954623~mv2.png/v1/fill/w_380,h_52,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/header%20logo.png 2x
    "
    src="https://static.wixstatic.com/media/86ae48_38295846b4fd47b1bad7966631954623~mv2.png/v1/fill/w_190,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/header%20logo.png"
    alt="header logo"
    style={{ objectFit: 'cover' }}
    className="BI8PVQ Tj01hh"
    
  />
  <span className="logotext">by TTT Networking Inc.</span>
        </div>
         
        <Link href="/auth/login">Sign in</Link>
        </div>
        </nav>
    );
}