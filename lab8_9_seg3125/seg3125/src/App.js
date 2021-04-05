import React, { Component } from 'react';
import ItemsContainer from './ItemsContainer';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FilterContainer from './FilterContainer'
import PageTitle from './PageTitle'
import Search from './Search'
import NewPost from './components/NewPost';

class App extends Component {
  size = {
    XS: 'Extra Small',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'Extra Large'
  }

  colors = ["Red", "Yellow", "Blue","Purple", "Grey", "Brown", "Black", "White", "Green", "Orange", "Pink", "Gold", "Silver", "Bronze"]


  state = {
    language: 'en',
    idCount: 2,

    items: [
      {
      id: 1,
      name: 'Biking-Shirt',
      imgSrc: '../images/Biking-Shirt_T-Shirt_M_Blue_None_30_JL.jpg',
      cost: 30,
      size: this.size.M,
      type: 'T-Shirt',
      mainColor: 'Blue',
      secondaryColor: 'Red',
      description: 'Perfect T-Shirt for biking',
      
      ownername: 'JL',
      owneremail: 'fakeemail@gmail.com',
      ownerphone: '819-123-4568'
      
    }],


    filters: [
      {
        name: 'Size',
        values: [...Object.values(this.size)]
      },
      {
        name: 'Price',
        values: ["0-9", "10-19", "20-29", "30-39", "40+"]
      },
      {
        name: 'Type',
        values: ["Tops", "Pants", "Dresses", "Hats", "Jewerly"]
      }
    ]
  }

  addNewPost = (item) => {
    item.id = Math.random();
    let items = [...this.state.items, item]
    this.setState({
      items: items
    })
    console.log('form submitted', item);
  }

  changeLanguage = (lang) => {
    this.setState({ language: lang });
  }
  render() {
    return (
      <div className="App">
        <Row>
          <PageTitle changeLanguage={this.changeLanguage}></PageTitle>
        </Row>
        <Row>
          <Col className="bg-white ml-1" >
            <h3>Filters</h3>
            <FilterContainer filters={this.state.filters}></FilterContainer>
          </Col>

          <Col xs={10}>
          <br></br>
            <Row>
              <Col xs={2}>
              <NewPost addNewPost={this.addNewPost} language={this.state.language} filters={this.state.filters[2]} sizes={[...Object.values(this.size)]} colors={this.colors}></NewPost>
              </Col>
              <Col xs={10}>
                <Search />
              </Col>
            </Row>
            {<ItemsContainer items={this.state.items} language={this.state.language} sizes={this.size}></ItemsContainer>}
          </Col>
        </Row>
      </div >
    );
  }
}


export default App;
