import React, { Component } from 'react';

import Sidebar from './js/components/sidebar/Sidebar';
import Header from './js/components/header/Header';
import Content from './js/components/content/Content';
import Footer from './js/components/footer/Footer';

class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <div className="row h-100">
                <Sidebar />
                <Header />
                <Content />
            </div>
            <div className="row h-25">
                <Footer />
            </div>
        </div>
    );
  }
}

export default App;
