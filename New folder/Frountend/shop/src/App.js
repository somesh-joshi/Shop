import './App.css';
import React, {useState} from 'react';
import ProductRow from './component/ProductRow';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Product() {

  const [show, setShow] = useState(false);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleclick = () => {
    axios.post('/productapi/add', {
      name: product,
      price: price,
      quantity: quantity,
      description: description,
      image: image
  })
      .then(res => console.log(res.data));
      

    setShow(false);
    setProduct("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setImage("");
  }

  return (
    <>
      <div className="container">
      <div className="row">
        <div className="col-md-10">
          <h1 className="title">Product List</h1>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleShow}>Add Product</button>
        </div>
      </div>
    </div>
    <div className="container main-content">
        <ProductRow />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setProduct(e.target.value)} required/>
            <br />
            <input type="number" className="form-control" placeholder="Product Price" onChange={(e) => setPrice(e.target.value)} required/>
            <br />
            <input type="number" className="form-control" placeholder="Product Quantity" onChange={(e) => setQuantity(e.target.value)}/>
            <br />
            <input type="file" className="form-control" placeholder="Product Image" onChange={(e) => setImage(e.target.value)}/>
            <br />
            <input type="text" className="form-control" placeholder="Product Description" onChange={(e) => setDescription(e.target.value)}/>
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-primary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" className="btn btn-primary" onClick={handleclick}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

function Cart() {

  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(0);
  const [s, setS] = useState(false);

  var total = 0;

  React.useEffect(() => {
    axios.get('/cartapi/')
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}, [s]);


const productList = products.map(product => {
  total = total + parseInt(product.price);
  return (
    <>
    <div className="main"> 
    
    </div>
    <div className="product">
      <div className="row">
        <div className="col">
        Product Name:{product.name}
        </div>
        <div className="col">
        Price:{product.price}
        </div>
        <div className="col">
        Quantity:{product.quantity}
        </div>
        <div className="col">
        <input type="number" onChange={(e) => {setUpdate(e.target.value)}} />

        <button className="btn btn-primary" onClick={() => {
          axios.put('/cartapi/'+product._id, {
            quantity: update
          })
          .then(res => setS(!s))
          .catch(err => console.log(err));
          setUpdate(0);
        }
        }>Update</button>
        </div>
        </div> 
    </div>
    </>
  );
});


return (
  <div className="row">
    <h1>Cart</h1>
      {productList}
      <hr />
      <h1>Total: {total}</h1>
  </div>
);

}

 

function App() {

  const [cart, setCart] = useState(false);
  

  return (
    <>
    <div className="main"> 
    <h1>Shop</h1>
    <button className="btn btn-primary" onClick={() => setCart(!cart)}>{cart ?  "Product" : "Cart" }</button>
    </div>
    <hr/>
    {cart ? <Cart/> : <Product/>}
    </>
  );
}


export default App;
