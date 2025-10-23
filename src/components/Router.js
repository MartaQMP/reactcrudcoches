import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import MenuCoches from "./MenuCoches";
import Home from "./Home";
import CreateCoche from "./CreateCoche";
import UpdateCoche from "./UpdateCoche";
import DetallesCoche from './DetallesCoche'

export default class Router extends Component {
    render() {
        function UpdateElement(){
            let {id} = useParams()
            return <UpdateCoche id={id}/>
        }

        function DetailsElement(){
            let {id} = useParams()
            return <DetallesCoche id={id}/>
        }

        return (
            <BrowserRouter>
                <MenuCoches />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateCoche />} />
                    <Route path="/update/:id" element={<UpdateElement />} />
                    <Route path="/detalles/:id" element={<DetailsElement />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
