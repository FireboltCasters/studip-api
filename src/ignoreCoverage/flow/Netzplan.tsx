import React, {useState, useRef, Component, FunctionComponent, useEffect} from 'react';
import {Connector} from "../../api/src";
import UrlHelper from "../../api/src/UrlHelper";
import {InputText} from "primereact/inputtext";

export const Netzplan : FunctionComponent = (props) => {

    const default_domain: string = UrlHelper.STUDIP_DOMAIN_UNI_OSNABRUECK;


    const [domain, setDomain] = useState(default_domain);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Stud.IP-Api Demo"
    }, [])

    async function login(){
        const client = await Connector.getClient(domain, username, password);
        const user = client.getUser();
    }

    const NODE_HEIGHT = 78;
    const DEFAULT_NODE_WIDTH = 150;
    const labelInputStyle = {textAlign: "center", height: (NODE_HEIGHT/4)+"px", width: (DEFAULT_NODE_WIDTH)+"px"}

    return (
                <div style={{width: "100%", height: "100vh"}}>
                        <div style={{display: "flex", flexDirection: "row", height: "100%"}}>
                            <div style={{display: "flex", flex: 3, flexDirection: "column"}}>
                                {"Test"}
                                <InputText value={domain} onChange={(event) => {setDomain(event.target.value)}}/>
                                <InputText value={username} onChange={(event) => {setUsername(event.target.value)}}/>
                                <InputText value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                            </div>
                            <div style={{display: "flex", flex: 1, flexDirection: "column", backgroundColor: "#DDDDDD"}}>
                                {"Sidebar"}
                            </div>
                        </div>
                </div>
        );
}
