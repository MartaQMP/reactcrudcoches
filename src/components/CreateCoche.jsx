import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { Navigate } from "react-router-dom";

export default class CreateCoche extends Component {
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();
    cajaId = React.createRef();

    state = {
        status: false,
    };

    createCoche = (event) => {
        event.preventDefault()
        let id = parseInt(this.cajaId.current.value);
        let request = "api/coches/insertcoche";
        let coche = {
            idCoche: id,
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value,
        };
        axios.post(Global.urlCoches + request, coche).then(response => {
            this.setState({
                status: true,
            });
        });
    };

    render() {
        return (
            <div>
                {this.state.status === true && <Navigate to="/" />}
                <form onSubmit={this.createCoche} style={{ margin: "auto", width: "50%" }}>
                    <label className="form-label">Id</label>
                    <input className="form-control" ref={this.cajaId} />
                    <label className="form-label">Marca</label>
                    <input className="form-control" ref={this.cajaMarca} />
                    <label className="form-label">Modelo</label>
                    <input className="form-control" ref={this.cajaModelo} />
                    <label className="form-label">Conductor</label>
                    <input className="form-control" ref={this.cajaConductor} />
                    <label className="form-label">Imagen</label>
                    <input className="form-control" ref={this.cajaImagen} />
                    <br />
                    <button className="btn btn-primary">Insertar</button>
                </form>
            </div>
        );
    }
}
