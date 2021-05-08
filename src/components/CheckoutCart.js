import {  Breadcrumb } from 'react-bootstrap';
import Price from './Price';
import React, { Component } from 'react';

class CheckoutCart extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            cart: {},
            
        };
    }
    
    
    componentDidMount() {
        const request = new Request('api/carts/me', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        fetch(request)
            .then((response) => response.json())
            .then((cart) => {
                console.log(cart)
                document.getElementsByClassName("cart-number")[0].innerHTML = cart.cartItems.length;
                this.setState({
                    cart,
                });
            });
    }

    showCartItem(cartItem , cart)
    {
        const productDetailRequest = new Request(`api/products/productid/${cartItem.productId}`)
        fetch(productDetailRequest)
            .then((response) => response.json())
            .then((product) => {
                console.log(product) 
                this.setState({
                    product,
                });
            });
        return(
            <div >
                    <div className="card mb-3 checkout-card flex-child">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img
                                    src={cartItem.images}
                                    className="card-img"
                                    alt="..."
                                />
                            </div>
                            <div className="col-md-8 checkout-body">
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">{cartItem.brand}</h5>
                                    </div>
                                    <p className="card-text">{cartItem.title}</p>
                                    <span>
                                        <strong>Rs: {cartItem.pricePerUnit}</strong>
                                    </span>
                                    <div>
                                        <span>Quantity</span>
                                    <select>
                                        <option>{cartItem.qty}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }

    render()
    {
        console.log(this.state.cart);

        // for(var i=0; i<this.state.cart.cartItems.length; i++)
        // {
        //     this.showCartItem(this.state.cart.cartItems[i]);
        // }
       
        const cartItems = this.state.cart.cartItems || [];
        return (
            
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                    <Breadcrumb.Item href="/address">Add Address</Breadcrumb.Item>
                    <Breadcrumb.Item href="/payment">Payment</Breadcrumb.Item>
                </Breadcrumb>
                <div  className="flex-container">
                <div>{cartItems.map(cartItem => (<div key={cartItem.productId}>{this.showCartItem(cartItem, this.state.cart)}</div>))}</div> 
                <div className="flex-child">
                        <Price cart={this.state.cart}/>
                </div>
                </div>
            </div>
                
        );
    }

}

export default CheckoutCart;
