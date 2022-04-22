// import Card from "./components/Card";
import React from 'react';
import EiffelTower from "./icons/eiffel_tower.svg";
import CardImage1 from "./icons/card_image_1.svg";
import CardImage2 from "./icons/card_image_2.svg";
import CardImage3 from "./icons/card_image_3.svg";
import Card from './components/Card';

export default function App(){
  return (
    <React.Fragment>
      <header
        className="my-5 d-flex justify-content-evenly align-items-center flex-column flex-md-row"
        style={{ maxHeight: "100%", minHeight: "90vh" }}
      >
        <h2 className="text-center mb-2 mb-md-0">
          Travel Everywhere. <br /> See Everything.
        </h2>
        <img src={EiffelTower} height="300" width="300" alt="headerImage"/>
      </header>
      <main style={{ maxHeight: "100%", minHeight: "90vh" }} className="my-5">
        <section className="d-flex justify-content-evenly align-items-center flex-column flex-md-row">
          <Card
            heading="Want to travel?"
            imageLink={CardImage1}
            description="Traveling is an amazing experience. Explore the world and fill your life with experiences."
          />
          <Card
            heading="Points of Interest"
            imageLink={CardImage2}
            description="Have you ever returned from a place, finding out moments later that you missed a huge point of cultural interest? With our application, this ends today."
            classes="mx-md-2"
          />
          <Card
            heading="Want to travel?"
            imageLink={CardImage3}
            description="Sign in today and start exploring the world!"
          />
        </section>
        <section className="mt-5 d-flex justify-content-evenly align-items-center">
          <a href="#" className="btn btn-primary">
            Sign In
          </a>
          <a className="btn btn-secondary">Register</a>
        </section>
      </main>
    </React.Fragment>
  );
};