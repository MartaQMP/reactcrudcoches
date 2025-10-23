import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Global from "../Global";

export default class UpdateCoche extends Component {
    cajaConductor = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaImagen = React.createRef();
    cajaId = React.createRef();

    state = {
        status: false,
        coche: null,
    };

    encontrarCoche = () => {
        let request = "api/coches/findcoche/" + this.props.id;
        console.log(Global.urlCoches+request)
        axios.get(Global.urlCoches + request).then(response => {
            this.setState({
                coche: response.data,
            });
        });
    };

    updateCoche = event => {
        event.preventDefault();
        let request = "api/coches/updatecoche";
        let id = parseInt(this.cajaId.current.value);
        let coche = {
            idCoche: id,
            marca: this.cajaMarca.current.value,
            modelo: this.cajaModelo.current.value,
            conductor: this.cajaConductor.current.value,
            imagen: this.cajaImagen.current.value,
        };
        axios.put(Global.urlCoches + request, coche).then(response => {
            this.setState({
                status: true,
            });
        });
    };

    componentDidMount = () => {
        this.encontrarCoche();
    };

    render() {
        return (
            <div>
                {this.state.status === true && <Navigate to="/" />}
                {this.state.coche && (
                    <form onSubmit={this.updateCoche} style={{ margin: "auto", width: "50%" }}>
                        <label className="form-label">Id</label>
                        <input defaultValue={this.props.id} className="form-control" ref={this.cajaId} disabled />
                        <label className="form-label">Marca</label>
                        <input defaultValue={this.state.coche.marca} className="form-control" ref={this.cajaMarca} />
                        <label className="form-label">Modelo</label>
                        <input defaultValue={this.state.coche.modelo} className="form-control" ref={this.cajaModelo} />
                        <label className="form-label">Conductor</label>
                        <input defaultValue={this.state.coche.conductor} className="form-control" ref={this.cajaConductor} />
                        <label className="form-label">Imagen</label>
                        <input defaultValue={this.state.coche.imagen} className="form-control" ref={this.cajaImagen} />
                        <br />
                        <button className="btn btn-primary">Actualizar</button>
                    </form>
                )}
            </div>
        );
    }
}
