import React from "react";  
import { connect } from "react-redux";
import {
    Routes,
    Route,
    BrowserRouter,
    Navigate,
    Outlet
} from "react-router-dom";
import { getToken } from "../apis/ApiCore";
import { API_USER } from "../apis/auth/Auth";
import { GIF_SUSPENSE } from "../assets/images";
import XContainer from "../components/XContainer";
import XImage from "../components/XImage";
import { ROUTE } from "../config/Url";
import { saveUserData } from "../redux/user/userActions";

interface MainRouterProps {
    user?: any;
    dispatch?: any;
    navigate?: any;
};

interface MainRouterState {};

class MainRouter extends React.Component<MainRouterProps, MainRouterState> {
    async getUserData() {
        API_USER(
            (result: any) => {
                this.props.dispatch(saveUserData(result.data));
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    async componentDidMount() {
        await this.getUserData();
    }

    render() {
        const Dashboard                  = React.lazy(() => import('../pages/Dashboard'));
        const Signin                     = React.lazy(() => import('../pages/Signin'));

        const PrivateOutlet = () => {
            const auth = getToken();
            return auth && auth !== 'null' ? <Outlet /> : <Navigate to={ROUTE.SIGNIN} />;
        };

        const PublicOutlet = () => {
            const auth = getToken();
            return !auth || auth === 'null' ? <Outlet /> : <Navigate to={ROUTE.DASHBOARD} />;
        };

        const Loader = () => {
            return (
                <XContainer center style={{ backgroundColor: "#F7F8FC"}}>
                    <XImage src={GIF_SUSPENSE} width={300} height={300} />
                </XContainer>
            );
        };

        return (
            <React.Suspense fallback={<Loader />}>
                <BrowserRouter>
                    <Routes>
                        <Route path={ROUTE.DASHBOARD} element={<PrivateOutlet />}>
                            <Route path={ROUTE.DASHBOARD} element={<Dashboard />}/>
                        </Route>

                        <Route path={ROUTE.SIGNIN} element={<PublicOutlet />}>
                            <Route path={ROUTE.SIGNIN} element={<Signin />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/dashboard" />}/>
                    </Routes>
                </BrowserRouter>
            </React.Suspense>
        );
    };
};

function mapStateToProps(state: any) {
    const user = state.user;
    return {
        user
    };
};

export default connect(mapStateToProps) (MainRouter);