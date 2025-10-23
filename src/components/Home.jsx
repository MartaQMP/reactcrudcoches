import axios from "axios";
import React, { Component } from "react";
import Global from "../Global";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default class Home extends Component {
    state = {
        coches: [],
    };

    getCoches = () => {
        let request = "api/coches";
        axios.get(Global.urlCoches + request).then(response => {
            this.setState({
                coches: response.data,
            });
        });
    };

    componentDidMount = () => {
        this.getCoches();
    };

    componentDidUpdate = oldProps => {
        if (oldProps.idCoche !== this.props.idCoche) {
            this.cargarCoches();
        }
    };

    eliminarCoche = id => {
        let request = "api/coches/deletecoche/" + id;
        console.log(Global.urlCoches + request);
        Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertirlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!",
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(Global.urlCoches + request).then(response => {
                    console.log("Eliminado");
                    this.getCoches();
                });
                Swal.fire({
                    title: "Eiminado!",
                    icon: "success",
                });
            }
        });
    };

    render() {
        return (
            <div>
                <h1>Coches</h1>
                <table style={{ border: "2px solid black", margin: "auto", width: "60%", textAlign: "center" }}>
                    <thead style={{ border: "2px solid black" }}>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.coches.map((coche, index) => {
                            return (
                                <tr style={{ border: "1px solid black" }} key={index}>
                                    <td>{coche.marca}</td>
                                    <td>{coche.modelo}</td>
                                    <td>
                                        <NavLink className="btn btn-primary" to={"/detalles/" + coche.idCoche}>
                                            Detalles
                                        </NavLink>
                                    </td>
                                    <td>
                                        <NavLink className="btn btn-info" to={"/update/" + coche.idCoche}>
                                            Actualizar
                                        </NavLink>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                this.eliminarCoche(coche.idCoche);
                                            }}
                                            className="btn btn-danger">
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
