import React from 'react';
import { IMG_WAVE, LOGO } from '../assets/images';
import XButton from '../components/XButton';
import XContainer from '../components/XContainer';
import XGap from '../components/XGap';
import XGrid from '../components/XGrid';
import XImage from '../components/XImage';
import XInput from '../components/XInput';
import XText from '../components/XText';
import { ROUTE } from '../config/Url';
import { API_SIGNIN } from '../apis/auth/Auth';
import XForm from '../components/XForm';
import XAlert from '../components/XAlert';
import { withRouter } from '../router/Navigation';
import { cookiesClient } from '../apis/ApiCore';
import { connect } from 'react-redux';
import { saveUserData } from '../redux/user/userActions';

interface SigninProps {
    navigate?: any;
    user?: any;
    dispatch?: any;
};

interface SigninState {
    email: string;
    password: string;
    loggingIn: boolean;
    alert: boolean;
    alertMessage: string;
};

class Signin extends React.Component<SigninProps, SigninState>{
    constructor(props: SigninProps){
        super(props);
        this.state = {
            email: "",
            password: "",
            loggingIn: false,
            alert: false,
            alertMessage: ""
        };
        this.onSignin = this.onSignin.bind(this);
    };

    onSignin(e: any) {
        e.preventDefault();
        const data: any = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({loggingIn: true}, () => {
            API_SIGNIN(
                data,
                (result: any) => {
                    this.setState({loggingIn: false, alert: false, alertMessage: ""});
                    cookiesClient().set('token', result.data.token, {
                        path: '/',
                        sameSite: 'lax',
                        maxAge: 31536000 
                    });
                    this.props.dispatch(saveUserData(result.data));
                    this.props.navigate(ROUTE.DASHBOARD);
                },
                (error: any) => {
                    this.setState({loggingIn: false});
                    this.setState({ alert: true, alertMessage: error.message });
                }
            );
        });
    };

    componentDidMount() {
        document.title = "PT. Ambulance Pintar Indonesia | Masuk"
    }

    render() {
        return (
            <XContainer center style={{ backgroundColor: "#F7F8FC" }}>
                <XForm style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", border: "1px solid #DFE0EB" }}>
                    <XText text="PT. Ambulance Indonesia Pintar" color="#FFFFFF" size={16} align="center" style={{ color: "black" }} />
                    <XImage src={LOGO} alt="" style={{ width: "80px", margin: "auto", marginTop: "-10px" }} />
                    <XGap height={30} />
                    <XGrid maxWidth={300} gap={10}>
                        <XInput 
                            placeholder="Username" 
                            value={this.state.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value})}
                            disabled={this.state.loggingIn}
                            style={{ backgroundColor: "#FFF", border: "1px solid #DFE0EB", color: "black" }}
                        />
                        <XInput 
                            placeholder="Password" 
                            type="password" 
                            credential
                            value={this.state.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.currentTarget.value})}
                            disabled={this.state.loggingIn}
                            style={{ backgroundColor: "#FFF", border: "1px solid #DFE0EB", color: "black" }}
                        />
                    </XGrid>
                    <XGap height={30} />
                    {!this.state.loggingIn && this.state.alert && this.state.alertMessage && <XAlert type='danger' message={this.state.alertMessage} maxWidth={300} />}
                    <XGap height={10} />
                    <XButton 
                        label="Masuk" 
                        onClick={this.onSignin} 
                        disabled={this.state.loggingIn}
                        loading={this.state.loggingIn}
                        style={{ backgroundColor: "#428bca" }}
                    />
                </XForm>

                {/* <XImage src={IMG_WAVE} alt="" height={111} width="100%" style={{ position: "absolute", bottom: "0" }} /> */}
            </XContainer>
        );
    };
};

function mapStateToProps(state: any) {
    const user = state.user;
    return {
        user
    };
};

export default connect(mapStateToProps) (withRouter(Signin));