import React from 'react';
import './Aboutus.css';


const AboutUsPage = () => {
    return (
        <div className="about-us-container">
            <header>
                <h1>About Us</h1>
            </header>
            <div className="content">
                <section>
                    <h2>Our Mission</h2>
                    <p>
                        At SLAYTECH, we believe that every story has the power to change
                        the world. Our mission is to create an open and diverse platform where
                        people can share, learn, and find empathy through stories, ideas, and
                        personal experiences.
                    </p>
                </section>
                <section>
                    <h2>Our Community</h2>
                    <p>
                        We believe that the strength of community is the key to growth and success.
                        With millions of members worldwide, SLAYTECH is not just a place to
                        read and write, but also a community where people connect, exchange ideas,
                        and support each other.
                    </p>
                </section>
                <section>
                    <h2>Our Goals</h2>
                    <p>
                        We are committed to providing the best experience for everyone on
                        SLAYTECH. This includes offering a user-friendly platform,
                        high-quality content, and a safe and supportive environment for
                        our community.
                    </p>
                </section>
                <section>
                    <h2>Contact Us</h2>
                    <p>
                        We always value feedback and input from you. If you have any questions,
                        suggestions, or partnership requests, please contact us via email:
                        <a href="mailto:slaytech@gmail.com">slaytech@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;
