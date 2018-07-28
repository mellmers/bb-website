﻿import React from "react";
import {Helmet} from "react-helmet";

import Member from "../../components/Member/Member";

import "./Bulls.css";

import img_xPain from "./img/Malthe_xPainHunt3r.png";
import img_unknown from "./img/Andi_MrMadness.png";

export default class Bulls extends React.PureComponent {

    render() {
        return (
            <div className="view full-container bulls">
                <Helmet><title>Member - Battleground-Bulls</title></Helmet>
                <div className="container">
                    <h1>Das sind wir - die Bullen im Stall</h1>

                    <div className="row">
                        <div className="col-md-6">
                            <Member
                                name="Malthe aka xPainHunt3r"
                                job={["Gründer", "Streamer", "Admin"]}
                                games={["Rocket League", "PUBG"]}
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim."
                                img={img_xPain}
                            />
                        </div>
                        <div className="col-md-6">
                            <Member
                                name="Andi"
                                job="Member"
                                games="CS 1.6"
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
                                img={img_unknown}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Member
                                name="Moritz aka v!ruZ"
                                job={["Gründer", "Admin"]}
                                games={["Rocket League", "PUBG", "CS:GO"]}
                                description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus."
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}