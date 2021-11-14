import React from 'react';
import axios from 'axios';

const Card = (props) => {
    const product = props.products

const handleclick = () => {
        console.log("clicked");
        axios.post('/cartapi/add', {
            name: product.name,
            price: product.price,
            quantity: 1,
        })
            .then(res => alert(product.name + " added to cart"));
    }


    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.name}/>
                <div className="card-body">
                    <h1 className="card-text">{product.name}</h1>
                    <h5>{product.description}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleclick}>
                                Add to cart
                            </button> 
                        </div>  
                        <small className="text-muted"><h2>{product.price}</h2></small>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProductRow = () => {

// fatch data onload
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        axios.get('/productapi/')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const productList = products.map(product => {
        return (
            <Card products={product} key={product.id}/>
        )
    });

    return (
        <div className="row">
            {productList}
        </div>
    );

}

export default ProductRow;