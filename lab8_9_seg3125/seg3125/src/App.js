import React, { Component } from 'react';
import ItemsContainer from './ItemsContainer';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FilterContainer from './FilterContainer'
import Search from './Search'
import NewPost from './components/NewPost';
import Navbar from 'react-bootstrap/esm/Navbar';

class App extends Component {
  size = {
    XS: 'Extra Small',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'Extra Large'
  }

  colors = ["Red", "Yellow", "Blue", "Purple", "Grey", "Brown", "Black", "White", "Green", "Orange", "Pink", "Gold", "Silver", "Bronze"]

  state = {
    language: 'en',
    idCount: 4,

    items: [
      {
        id: 1,
        name: 'Biking-Shirt',
        imgSrc: '../images/Biking-Shirt_T-Shirt_M_Blue_None_30_JL.jpg',
        cost: 50,
        size: this.size.M,
        type: 'Tops',
        mainColor: 'Blue',
        secondaryColor: 'Blue',
        description: 'Perfect T-Shirt for biking',

        ownername: 'JL',
        owneremail: 'fakeemail@gmail.com',
        ownerphone: '819-123-4568'
      }, {
        id: 2,
        name: 'pink-Shirt',
        imgSrc: '../images/pinkshirt.jpg',
        cost: 40,
        size: this.size.S,
        type: 'Tops',
        mainColor: 'Pink',
        secondaryColor: 'Pink',
        description: 'Confy shirt',

        ownername: 'JL',
        owneremail: 'fakeemail@gmail.com',
        ownerphone: '819-123-4568'

      },
      {
        id: 3,
        name: 'red pants',
        imgSrc: '../images/redpants.jfif',
        cost: 40,
        size: this.size.L,
        type: 'Pants',
        mainColor: 'Red',
        secondaryColor: 'Red',
        description: 'Normal pants',

        ownername: 'JL',
        owneremail: 'fakeemail@gmail.com',
        ownerphone: '819-123-4568'

      }],
    sortBy: 'cost',
    ascendingOrder: true,
    resultList: [],
    appliedFilters: { Size: [], Type: [] },
    searchQuery: '',

    filters: [
      {
        name: 'Size',
        values: [...Object.values(this.size)]
      },
      {
        name: 'Type',
        values: ["Tops", "Pants", "Dresses", "Hats", "Jewerly"]
      }
    ]
  }

  componentDidMount() {
    this.setState({ resultList: this.state.items }, this.buildResultList)
  }

  addNewPost = (item) => {
    item.id = this.state.idCount;
    this.setState({ idCount: this.stateidCount + 1 })
    let items = [...this.state.items, item]
    this.setState({
      items: items
    })
    console.log('form submitted', item);
  }

  changeLanguage = (lang) => {
    this.setState({ language: lang });
  }

  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  compare(property, order) {
    var sortOrder = order ? 1 : -1;
    return function (a, b) {
      if (a[property] < b[property]) {
        return -1 * sortOrder;
      } else if (a[property] > b[property]) {
        return 1 * sortOrder;
      }
      else {
        return 0;
      }
    }
  }

  sortBy = (criteria) => {
    var attr = criteria.split('_')[0];
    var order = criteria.split('_')[1];
    this.setState({ sortBy: attr, ascendingOrder: order === 'Ascending' }, this.buildResultList);
  }

  getFilters = (f, value) => {
    var attr = { ...this.state.appliedFilters };
    if (attr[f].includes(value)) {
      attr[f].splice(attr[f].indexOf(value), 1);
    } else {
      attr[f].push(value);
    }
    this.setState(
      {
        appliedFilters: attr
      }, this.buildResultList);

  }
  buildResultList = () => {
    var list = this.state.items;

    //applying filters
    Object.keys(this.state.appliedFilters).map((k) => {
      list = list.filter(item => {
        if (this.state.appliedFilters[k].length > 0) {
          console.log(this.state.appliedFilters[k].length)
          return this.state.appliedFilters[k].includes(item[k.toLowerCase()]);
        }
        return true;
      })
    })

    //Sorting
    //Default is cost ascending
    this.setState({
      resultList: list.sort(this.compare(this.state.sortBy, this.state.ascendingOrder))
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" className="py-3">
          <Navbar.Brand className="text-white"><img style={{ width: '40px' }} src='../icons/tunic.png' alt="Trendy Apparel Trade"></img>&nbsp; Trendy Apparel Trade</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Col xs={2}>
              <NewPost addNewPost={this.addNewPost} language={this.state.language} filters={this.state.filters[1]} sizes={[...Object.values(this.size)]} colors={this.colors}></NewPost>
            </Col>
            <Col xs={9}>
              <Search sortBy={this.sortBy} />
            </Col>
            <Col className="col-auto">
              <select onChange={(e) => this.changeLanguage(e.target.value)}>
                <option value='en' id='languageEN'>English</option>
                <option value='fr' id='languageFR'>Français</option>
              </select>
            </Col>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col className="bg-white ml-1">
            <h5 className="border-bottom border-dark p-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
            </svg> Filter By</h5>
            <FilterContainer filters={this.state.filters} getFilter={this.getFilters}></FilterContainer>
          </Col>
          <Col xs={10}>
            <br></br>
            {<ItemsContainer items={this.state.resultList} language={this.state.language} sizes={this.size}></ItemsContainer>}
          </Col>
        </Row>
      </div >
    );
  }
}


export default App;
