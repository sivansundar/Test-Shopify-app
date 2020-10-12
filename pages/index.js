import { Context } from "@shopify/app-bridge-react";
import {Page, DisplayText, Toast, Card, Heading, Layout, TextField, Stack, Button, Form, FormLayout } from "@shopify/polaris";
import {ResourcePicker} from "@shopify/app-bridge-react"
import { render } from "enzyme";

import ReactMapGL, { Marker }  from 'react-map-gl';
import { useState } from "react";

import Geocoder from 'react-mapbox-gl-geocoder';
const { REACT_MAP_GL_TOKEN } = process.env;

import mbxClient from '@mapbox/mapbox-sdk';
import mbxDirections from '@mapbox/mapbox-sdk/services/directions'

const baseClient = mbxClient({ accessToken: "pk.eyJ1IjoieGQ4OTEwIiwiYSI6ImNrY2x3emgyYzIxd3QydWxwYTY3bGEwM2MifQ.lMNnphcF4wM6Oirome9wJw" });
const directionsClient = mbxDirections(baseClient);

class Index extends React.Component {
  state = {open: false,
           deliveryAddress: "",
           distanceValue: 0,
          
           viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8
          }
        
        }

           

  render() {
   
    return (

      <Layout sectioned>
          <Layout.AnnotatedSection
                  title="Delivery Ratessss"
                  description="Set your custom delivery rate depending on the distance."
                >
                  <Card sectioned>

                    <Form>

                    <FormLayout>
                        <TextField
                            value = "sd"
                            label = "Minimum delievery charge in rupees (₹)"
                            type = "base_delivery"
                            />

                            <TextField
                            label = "Additional delivery charge per km in rupees (₹)"
                            type = "delivery_per_km"
                            
                            />

                            <Stack distribution = "trailing">
                                <Button primary>
                                    Save
                                </Button>
                            </Stack>
                    </FormLayout>

                    </Form>

                  </Card>
                </Layout.AnnotatedSection>


        <Layout.AnnotatedSection
          title = "Delivery Address"
          description = "Wilson Manor Apartments, Wilson Garden, Bangalore."
          >

          <Card sectioned>
   

            <ReactMapGL
        mapStyle = "mapbox://styles/mapbox/outdoors-v11"
                 {...this.state.viewport}
                 onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken = "pk.eyJ1IjoieGQ4OTEwIiwiYSI6ImNrY2x3emgyYzIxd3QydWxwYTY3bGEwM2MifQ.lMNnphcF4wM6Oirome9wJw"
        >

              <Geocoder
                onSelected = {this.onSelected}
                mapboxApiAccessToken={"pk.eyJ1IjoieGQ4OTEwIiwiYSI6ImNrY2x3emgyYzIxd3QydWxwYTY3bGEwM2MifQ.lMNnphcF4wM6Oirome9wJw"}
                onViewportChange={(viewport) => this.setState({viewport})}
                viewport={this.state.viewport}
                hideOnSelect={true}
                value=""
                
              />
            
    </ReactMapGL>

    <DisplayText size="small" children = {this.state.distanceValue}  ></DisplayText>

          </Card>

  
        </Layout.AnnotatedSection>

        <Layout.AnnotatedSection>

        </Layout.AnnotatedSection>

        
      </Layout>
    
          
    )
  }

  onSelected = (viewport, item) => {

    this.setState({
      viewport
    })
    var value = JSON.parse(JSON.stringify(item));

    var latitude = value['geometry']['coordinates'][1];
    var longitude = value['geometry']['coordinates'][0];

    this.calculateDistance(latitude, longitude);
    console.log("Selected viewport : ", value)

}

calculateDistance = (latitude, longitude) => {
  directionsClient.getDirections({
    profile: 'driving',
    waypoints: [{
      //From
      coordinates: [77.60621225, 12.93415875]
    },
  {
    //To
    coordinates: [longitude, latitude]
  }
 ]
  })
  .send()
  .then(response => {
    const directionsBody = response.body;
    var distanceParse = JSON.parse(JSON.stringify(directionsBody));
    console.log("Distance Response: ", distanceParse)
    var result = distanceParse['routes'][0]['distance'];
    
    this.setState({
      distanceValue : result
    })
    console.log("State value : ", this.state.distanceValue)
    console.log("Distance between store and delivery location is : ", result)
  })
}

  handleChange = (field) => {
    
    return (value) => this.setState({ [field]: value });

  };


  handleSelection = (resources) => {

    const idFromResources = resources.selection.map((product) => product.id)
    this.setState({open : false})
    console.log(idFromResources)
  }
}

export default Index;
