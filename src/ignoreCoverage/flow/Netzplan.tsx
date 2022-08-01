// @ts-nocheck - may need to be at the start of file
import React, {useState, useRef, Component, FunctionComponent, useEffect} from 'react';
import {Connector} from "../../api/src";
import UrlHelper from "../../api/src/UrlHelper";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import {ProgressSpinner} from "primereact/progressspinner";
import {Card} from "primereact/card";
import {Panel} from "primereact/panel";
import {Skeleton} from "primereact/skeleton";
import FakeBackend from "../../api/src/ignoreCoverage/FakeBackend";
import {Dialog} from "primereact/dialog";
import {Divider} from "primereact/divider";

export const Netzplan : FunctionComponent = (props) => {

    const default_domain: string = UrlHelper.STUDIP_DOMAIN_UNI_OSNABRUECK;
    const current_domain: string = window.location.hostname;
    const isDev = current_domain === "localhost" || current_domain === "127.0.0.1";

    const [domain, setDomain] = useState(default_domain);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(undefined);
    const [showpassword, setShowpassword] = useState(false);
    const [useCorsWorkaround, setUseCorsWorkaround] = useState(isDev);
    const [pleaseActivateCorsWorkaround, setPleaseActivateCorsWorkaround] = useState(false);
    const [error, setError] = useState(undefined);

    const credentialsGiven = !!username && !!password;
    const loginDisabled = !credentialsGiven || isLoading;

    const loginTooltip = credentialsGiven ? "" : "Please enter your username and password";

    useEffect(() => {
        document.title = "Stud.IP-Api Demo"
    }, [])

    let domainToUse = domain;
    const proxyDomain = "https://cors-anywhere.herokuapp.com/";
    if(useCorsWorkaround) {
        domainToUse = proxyDomain + domain;
    }

    function clearOutput() {
        setUser(undefined);
        setError(undefined);
    }

    async function login(){
        clearOutput();
        setIsLoading(true);
        try{
            const client = await Connector.getClient(domainToUse, username, password);
            const user = client.getUser();
            setUser(user);
        } catch(e){
            console.log(e);
            if(useCorsWorkaround && e?.message==="Request failed with status code 403"){
                setPleaseActivateCorsWorkaround(true);
            } else {
                setError(e);
            }
        }
        setIsLoading(false);
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


    function renderUser(){
        if(!!user){
            return(
                <div style={{display: "flex", width: "100%", whiteSpace: "pre-wrap"}}>
                    {JSON.stringify(user, null, 2)}
                </div>
            )
        } else if (isLoading) {
            return <Skeleton />
        }
    }

    function onHide(){
        pleaseActivateCorsWorkaround(false)
    }

    const footer = (
        <div>
            <Button label="Activate CORS bypass" icon="pi pi-check" onClick={() => {
                onHide();
                window.open(proxyDomain, '_blank', 'noopener,noreferrer');
            }} />
            <Button label="No" icon="pi pi-times" onClick={onHide} />
        </div>
    );

    return (
                <div style={{width: "100%", height: "100vh"}}>
                    <Dialog header="Activate CORS workaround" footer={footer} visible={pleaseActivateCorsWorkaround} style={{width: '50vw'}} modal onHide={onHide}>
                        In order to allow the API to work, you need to activate the CORS workaround. This will open a new tab in your browser. Please click on the button to activate the workaround.
                    </Dialog>
                        <div style={{display: "flex", flexDirection: "column", height: "100%", margin: "3%"}}>
                            <h3>Stud.IP-Api Demo</h3>
                            <Panel header={"Description"} toggleable>
                                <div style={{whiteSpace: "pre-line", display: "flex", width: "100%"}}>
                                    {"This is a simple demo of the Stud.IP-Api. It allows you to login to your Stud.IP account and see the result of the API calls."}
                                    {useCorsWorkaround ? "Your data will be forwarded to Stud.IP via "+proxyDomain+". The CORS workaround is activated. This means that the API will use a proxy to access the Stud.IP-Api. This is necessary for the API to work. " : "Your data will be send directly to Stud.IP."}
                                </div>
                            </Panel>
                            <Divider />
                            <div style={{display: "flex", width: "100%", flexDirection: "row"}}>
                                    <Panel header={"Input"} style={{display: "flex", flexDirection: "column", flex: 3}}>
                                        <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
                                            {"Domain"}
                                            <div style={{display: "flex", width: "100%", flexDirection: "row"}} >
                                                <InputText style={{width: "100%", flex: 1}} value={domain} onChange={(event) => {setDomain(event.target.value)}}/>
                                                <Button tooltipOptions={{position: 'bottom'}} tooltip={"In the Proxy mode we will use: "+proxyDomain+" to bypass CORS problems and forward the request."} label={useCorsWorkaround ? "Proxy" : "Direct"} icon={useCorsWorkaround ? "pi pi-cloud" : "pi pi-desktop"} className="p-button-success" style={{margin: 5}} onClick={() => {setUseCorsWorkaround(!useCorsWorkaround)}} />
                                            </div>
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
                                            <div tooltipOptions={{position: 'bottom'}} tooltip={loginTooltip}>
                                                <Button disabled={loginDisabled} label="Login" icon="pi pi-sitemap" className="p-button-success" style={{margin: 5}} onClick={() => {login()}} />
                                            </div>
                                        </div>
                                    </Panel>
                                <div style={{width: "30px"}}></div>
                                <Panel header={"Example Roles"}>
                                    <div style={{display: "flex", flex: 3, flexDirection: "column"}}>
                                        <Button label={"Example Root"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("root"))}} />
                                        <Button label={"Example Admin"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("admin"))}} />
                                        <Button label={"Example Dozent"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("dozent"))}} />
                                        <Button label={"Example Tutor"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("tutor"))}} />
                                        <Button label={"Example Autor"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("autor"))}} />
                                        <Button label={"Example User"} icon={"pi pi-user"} className="p-button-success" style={{margin: 5}} onClick={() => {setUser(FakeBackend.getRawExampleUserWithRole("user"))}} />
                                        <a href="https://hilfe.studip.de/admin/Admins/Benutzer" target="_blank" rel="noreferrer">
                                        <Button label={"More Information"} icon={"pi pi-info"} className="p-button-secondary" style={{margin: 5}} />
                                        </a>
                                    </div>
                                </Panel>
                            </div>
                            <Divider />
                            <Panel header={!!error ? "Error" : "Output"} toggleable collapsed={false} onToggle={(e) => {
                                clearOutput()
                            }}>
                                {renderUser()}
                                <div style={{display: "flex", width: "100%", whiteSpace: "pre-wrap"}}>
                                    {JSON.stringify(error, null, 4)}
                                </div>
                            </Panel>
                        </div>
                </div>
        );
}
