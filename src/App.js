import React from 'react';
import styles from './App.module.css';

import { Header, Overview, World, Israel, Footer } from "./components";
import { getCountriesPolygons } from "./api/";

class App extends React.Component {
  render() {
      getCountriesPolygons();
      return (
        <div className={styles.App}>
          <Header />
          <div className={styles.container}>
            <Overview />
            <World />
            <Israel />
          </div>
          <Footer />
        </div>
    );
  }
}

export default App;
