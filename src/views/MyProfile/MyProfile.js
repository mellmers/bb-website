import React from "react";
import {connect} from "react-redux";
import DateTime from "react-datetime";
import Helmet from "react-helmet";
import $ from "jquery";

import UsernameInput from "../../components/UsernameInput/UsernameInput";

import {updateUser} from "./../../actions/ApplicationActions";

import API from "./../../utils/API";

import "react-datetime/css/react-datetime.css";
import "./MyProfile.css";

class MyProfile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            usernameValid: true
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let form = $(e.target);
        let formData = form.serializeObject();
        if (form.parent().attr("id") === "hardware") {
            formData = { hardware: formData };
        }
        console.log("submit", formData);
        console.log("username valid?", this.state.usernameValid);
        if (this.state.usernameValid) {
            API.getInstance()._fetch("/users/" + this.props.user._id + "/", "PATCH", formData, null, {
                "Authorization": "Bearer " + this.props.user.accessToken
            })
                .then(response => {
                    if (response && !response.error) {
                        this.props.dispatch(updateUser(response));
                    }
                });
        }
    }

    render() {
        let {user} = this.props;
        console.log(user);
        return (
            <div id="my-profile" className="view full-container my-profile">
                <Helmet><title>Mein Profil - BattleBulls</title></Helmet>
                <div className="container">
                    <h1>Mein Profil</h1>

                    <ul className="nav nav-tabs light">
                        <li className="nav-item"><a href="#personal" className="nav-link" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="personal">Persönliche Informationen</a></li>
                        <li className="nav-item"><a href="#gaming" className="nav-link collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="gaming">Gaming Informationen</a></li>
                        <li className="nav-item"><a href="#hardware" className="nav-link collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="hardware">Deine Hardware</a></li>
                    </ul>

                    <div id="personal" className="collapse show" data-parent="#my-profile">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <UsernameInput
                                        className="username"
                                        defaultValue={true}
                                        onChange={ valid => { this.setState({ usernameValid: valid }); }}
                                        placeholder="Bsp.: xPainHunt3r"
                                    />
                                </div>
                                {/*
                                <div className="col-md-6">
                                    <label htmlFor="gamertag">In-Game Alias</label>
                                    <input
                                        type="text"
                                        name="gamertag"
                                        className="form-control"
                                        id="gamertag"
                                        maxLength={255}
                                        placeholder="In-Game Alias"
                                        defaultValue={user.gamertag}
                                    />
                                </div>
                                */}
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputFirstName">Vorname</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        id="inputFirstName"
                                        maxLength={255}
                                        placeholder="Vorname"
                                        defaultValue={user.firstName}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLastName">Nachname</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        id="inputLastName"
                                        maxLength={255}
                                        placeholder="Nachname"
                                        defaultValue={user.lastName}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputHome">Wohnort</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        id="inputHome"
                                        maxLength={255}
                                        placeholder="Bsp.: Bremen"
                                        defaultValue={user.city}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLand">Land</label>
                                    <select
                                        name="country"
                                        className="form-control"
                                        id="inputLand"
                                        defaultValue={user.country}
                                    >
                                        <option>Deutschland</option>
                                        <option>Österreich</option>
                                        <option>Schweiz</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputGender">Geschlecht</label>
                                    <select
                                        name="gender"
                                        className="form-control"
                                        id="inputGender"
                                        defaultValue={user.gender}
                                    >
                                        <option value="male">Männlich</option>
                                        <option value="female">Weiblich</option>
                                        <option value="divers">Divers</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="birthDate">Geburtstag</label>
                                    <DateTime
                                        closeOnSelect={true}
                                        dateFormat="YYYY-MM-DD"
                                        inputProps={{
                                            id: "birthDate",
                                            name: "birthDate",
                                            type: "date",
                                            placeholder: "Bsp.: 01.01.1990",
                                            autoComplete: "off"
                                        }}
                                        onChange={date => {this.setState({birthDate: new Date(date)})}}
                                        timeFormat={false}
                                        value={this.state.birthDate || new Date(user.birthDate)}
                                        viewMode="years"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="bio">Dein Weg zu den Bullen:</label>
                                    <textarea
                                        name="bio"
                                        id="bio"
                                        className="form-control"
                                        rows={4}
                                        placeholder="Ich bin bei den Bulls, weil ..."
                                        defaultValue={user.bio}
                                    />
                                </div>
                            </div>
                            <div className="form-row actions">
                                <div className="form-group col-md-6">
                                    <button type="submit" className="btn white">Speichern</button>
                                    <button type="reset" className="btn white" onClick={()=>{this.setState({birthDate: ""})}}>Zurücksetzen</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="gaming" className="collapse" data-parent="#my-profile">
                        <form onSubmit={this.onSubmit}>
                            {/*
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputPlattform1">Plattform 1:</label>

                                    <select name="Plattform1" className="form-control" id="inputPlattform1">
                                        <option>Bitte Wählen...</option>
                                        <option>Battle-Net</option>
                                        <option>Epic-Games</option>
                                        <option>Origin</option>
                                        <option>Steam</option>
                                        <option>Uplay</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputPlattform2">Plattform 2:</label>
                                    <select name="Plattform2" className="form-control" id="inputPlattform2">
                                        <option>Bitte Wählen...</option>
                                        <option>Battle-Net</option>
                                        <option>Epic-Games</option>
                                        <option>Origin</option>
                                        <option>Steam</option>
                                        <option>Uplay</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="inputPlattform3">
                                        Plattform 3:
                                    </label>

                                    <select
                                        name="Plattform3"
                                        className="form-control"
                                        id="inputPlattform3">
                                        <option>Bitte Wählen...</option>
                                        <option>Battle-Net</option>
                                        <option>Epic-Games</option>
                                        <option>Origin</option>
                                        <option>Steam</option>
                                        <option>Uplay</option>
                                    </select>
                                </div>
                            </div>
                            */}

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputFavourite">Lieblingsspiele</label>
                                    <input
                                        type="text"
                                        name="games"
                                        className="form-control"
                                        id="inputFavourite"
                                        maxLength={255}
                                        placeholder="Bsp.: PUBG, CS:GO, Rocket League"
                                        defaultValue={user.games}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputClan">Clan | Community</label>
                                    <input
                                        type="text"
                                        name="clan"
                                        className="form-control"
                                        id="inputClan"
                                        maxLength={255}
                                        placeholder="Bsp.: BattleBulls"
                                        defaultValue={user.clan}
                                    />
                                </div>
                            </div>
                            <div className="form-row actions">
                                <div className="form-group col-md-6">
                                    <button type="submit" className="btn white">Speichern</button>
                                    <button type="reset" className="btn white">Zurücksetzen</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="hardware" className="collapse" data-parent="#my-profile">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCase">Gehäuse</label>
                                    <input
                                        type="text"
                                        name="case"
                                        className="form-control"
                                        id="inputCase"
                                        maxLength={255}
                                        placeholder="Bsp.: be quiet! Dark Base 900 Pro"
                                        defaultValue={user.hardware.case}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputProcessor">CPU</label>
                                    <input
                                        type="text"
                                        name="processor"
                                        className="form-control"
                                        id="inputProcessor"
                                        maxLength={255}
                                        placeholder="Bsp.: Intel Core i9-7900X"
                                        defaultValue={user.hardware.processor}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMotherboard">Mainboard</label>
                                    <input
                                        type="text"
                                        name="motherboard"
                                        className="form-control"
                                        id="inputMotherboard"
                                        maxLength={255}
                                        placeholder="Bsp.: MSI X299 XPower Gaming AC"
                                        defaultValue={user.hardware.motherboard}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMemory">Arbeitsspeicher</label>
                                    <input
                                        type="text"
                                        name="memory"
                                        className="form-control"
                                        id="inputMemory"
                                        maxLength={255}
                                        placeholder="Bsp.: Corsair Vengeance RGB 32 GB DDR4"
                                        defaultValue={user.hardware.memory}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputGraphic">Grafikkarte</label>
                                    <input
                                        type="text"
                                        name="graphicsCard"
                                        className="form-control"
                                        id="inputGraphic"
                                        maxLength={255}
                                        placeholder="Bsp.: Nvidia GeForce GTX 1080 Ti"
                                        defaultValue={user.hardware.graphicsCard}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPower">Netzteil</label>
                                    <input
                                        type="text"
                                        name="powerSupply"
                                        className="form-control"
                                        id="inputPower"
                                        maxLength={255}
                                        placeholder="Bsp.: be quiet! DarkPower 750 Watt"
                                        defaultValue={user.hardware.powerSupply}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMonitor">Monitor</label>
                                    <input
                                        type="text"
                                        name="monitor"
                                        className="form-control"
                                        id="inputMonitor"
                                        maxLength={255}
                                        placeholder="Bsp.: Acer Predator XB271"
                                        defaultValue={user.hardware.monitor}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMouse">Maus</label>
                                    <input
                                        type="text"
                                        name="mouse"
                                        className="form-control"
                                        id="inputMouse"
                                        maxLength={255}
                                        placeholder="Bsp.: Logitech G903"
                                        defaultValue={user.hardware.mouse}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputKeyboard">Tastatur</label>
                                    <input
                                        type="text"
                                        name="keyboard"
                                        className="form-control"
                                        id="inputKeyboard"
                                        maxLength={255}
                                        placeholder="Bsp.: Logitech G910 Orion Spark"
                                        defaultValue={user.hardware.keyboard}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="inputMousePad">Mauspad</label>
                                    <input
                                        type="text"
                                        name="mousePad"
                                        className="form-control"
                                        id="inputMousePad"
                                        maxLength={255}
                                        placeholder="Bsp.: Logitech G440 Hard Gaming Mouse Pad"
                                        defaultValue={user.hardware.mousePad}
                                    />
                                </div>
                            </div>
                            <div className="form-row actions">
                                <div className="form-group col-md-6">
                                    <button type="submit" className="btn white">Speichern</button>
                                    <button type="reset" className="btn white">Zurücksetzen</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        user: state.application.user
    };
}
export default connect(mapStateToProps)(MyProfile);
