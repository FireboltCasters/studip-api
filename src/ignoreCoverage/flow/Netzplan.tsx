import React, {useState, useRef, Component, FunctionComponent, useEffect} from 'react';
import {Connector} from "../../api/src";
import UrlHelper from "../../api/src/UrlHelper";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";

export const Netzplan : FunctionComponent = (props) => {

    const default_domain: string = UrlHelper.STUDIP_DOMAIN_UNI_OSNABRUECK;


    const [domain, setDomain] = useState(default_domain);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(undefined);
    const [showpassword, setShowpassword] = useState(false);

    useEffect(() => {
        document.title = "Stud.IP-Api Demo"
    }, [])

    const testDomain = "https://cors-anywhere.herokuapp.com/"+domain;

    async function login(){
        const client = await Connector.getClient(testDomain, username, password);
        const user = client.getUser();
        //@ts-ignore
        setUser(user);
    }

    const NODE_HEIGHT = 78;
    const DEFAULT_NODE_WIDTH = 150;
    const labelInputStyle = {textAlign: "center", height: (NODE_HEIGHT/4)+"px", width: (DEFAULT_NODE_WIDTH)+"px"}

    function renderPassword(){
        if(showpassword){
            return <InputText style={{width: "100%", flex: 1}} value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        }
        return(
            <Password inputStyle={{width: "100%", flex: 1}} style={{width: "100%", flex: 1}} value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        )
    }

    return (
                <div style={{width: "100%", height: "100vh"}}>
                        <div style={{display: "flex", flexDirection: "row", height: "100%"}}>
                            <div style={{display: "flex", flex: 3, flexDirection: "column"}}>
                                {"Domain"}
                                <InputText value={domain} onChange={(event) => {setDomain(event.target.value)}}/>
                                <div style={{height: "30px"}}></div>
                                {"Username"}
                                <InputText value={username} onChange={(event) => {setUsername(event.target.value)}}/>
                                <div style={{height: "30px"}}></div>
                                {"Password"}
                                <div style={{display: "flex", width: "100%", flexDirection: "row"}} >
                                    {renderPassword()}
                                    <Button label={showpassword ? "Hide" : "Show"} icon={showpassword ? "pi pi-eye-slash" : "pi pi-eye"} className="p-button-success" style={{margin: 5}} onClick={() => {setShowpassword(!showpassword)}} />
                                </div>
                                <div style={{height: "30px"}}></div>
                                <Button label="Login" icon="pi pi-sitemap" className="p-button-success" style={{margin: 5}} onClick={() => {login()}} />
                                <div style={{height: "30px"}}></div>
                                {"Output:"}
                                <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
                                    {JSON.stringify(user, null, 2)}
                                </div>
                            </div>
                        </div>
                </div>
        );
}
