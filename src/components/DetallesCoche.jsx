import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class DetallesCoche extends Component {
    state = {
        coche: null,
    };

    encontrarCoche = () => {
        let request = "api/coches/findcoche/" + this.props.id;
        console.log(Global.urlCoches + request);
        axios.get(Global.urlCoches + request).then(response => {
            this.setState({
                coche: response.data,
            });
        });
    };

    componentDidMount = () => {
        this.encontrarCoche();
    };

    render() {
        return (
            <div>
                {this.state.coche && (
                    <div>
                        <h1>
                            Coche: {this.state.coche.marca} {this.state.coche.modelo}
                        </h1>
                        <h2>Conductor: {this.state.coche.conductor}</h2>
                        <img style={{width:"500px"}} src={this.state.coche.imagen} alt="Imagen coche" />
                    </div>
                )}
            </div>
        );
    }
}
