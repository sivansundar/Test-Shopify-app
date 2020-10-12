import { Context } from "@shopify/app-bridge-react";
import {Page, DisplayText, Toast, Card, Heading, Layout, TextField, Stack, Button, Form, FormLayout } from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react"
import { render } from "enzyme";
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'c1devstore.myshopify.com/',
    storefrontAccessToken: '<Storefront-AccessToken>'
  });



class DistanceScript extends React.Component {
    state = {
        location : ""
    }

  async handleClick() {
                    
            client.product.fetch('5442181169316').then((products) => {
            // Do something with the products
            console.log(products);
            })
            .catch((error) => {
                console.error("Error observed! : ", error)
            });
                    
    }
 
    render() {
        return (
            <form>
                
                <TextField 
                name = "location"
                required id="standard-required" 
                label="Required" 
                placeholder="Hello World" />

            <Button onClick = {this.handleClick()}>Default</Button>

            
            

            </form>



        );
    }
}
export default DistanceScript;
