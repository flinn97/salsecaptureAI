import { Route, Routes } from 'react-router-dom';
import BaseComponent from '../templateTech/baseClasses/BaseComponent';
import Login from '../templateTech/APITemplates/login';
import Register from '../templateTech/APITemplates/register';

/**
 * The Router class is responsible for rendering and managing application routes.
 * It extends the BaseComponent class and provides functionality to dynamically add routes,
 * render user authentication routes, and handle route mapping.
 */
class Router extends BaseComponent {
    /**
     * Initializes the Router component with default state values.
     * @param {Object} props - Properties passed to the Router component.
     */
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            routes: [], // Stores the list of application routes
            loginComp: Login, // Default login component
            registerComp: Register // Default register component
        };
    }

    /**
     * Adds a new route to the router.
     * @param {Object} route - The route object to add.
     */
    addToRouter(route) {
        let routes = [...this.state.routes, route];
        this.setState({ routes: routes });
    }

    /**
     * Maps a list of route objects to Route components for rendering.
     * @param {Array} routes - The list of route objects.
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element[]} A list of Route components.
     */
    getRouteMap(routes, props) {
        let mapp = <></>;
        if (routes) {
            routes = [...routes];

            // Map each route object to Route elements
            mapp = routes?.map((obj, index) => {
                if (!obj.path) {
                    // Set default path based on the component's class name if no path is provided
                    obj.path = this.classNameToString(obj.comp);
                    if (index === 0) {
                        obj.path = "/"; // Set the first route as the root path
                    }
                }
                return <>
                    <Route path={obj.path} element={<obj.comp props={{ ...props, ...obj.props }} />} />
                    <Route path={obj.path + "/:id"} element={<obj.comp props={{ ...props, ...obj.props }} />} />
                </>;
            });
        }
        return mapp;
    }

    /**
     * Generates the routes to render within the application.
     * If no user is logged in, renders the user authentication routes.
     * @param {Array} routes - The list of route objects.
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element} A Routes component containing the mapped routes.
     */
    getRoutes(routes, props) {
        let renderRoutes = <Routes>
            {this.getRouteMap(routes, props)}
            {this.state.routes.map((r, index) =>
                <>{r}</>
            )}
        </Routes>;

        // If no user is logged in, render user authentication routes
        if (!this.app?.state.currentUser) {
            renderRoutes = this.getUserAuthRoutes(props);
        }
        return renderRoutes;
    }

    /**
     * Renders the user authentication routes (login and register).
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element} A Routes component containing login and register routes.
     */
    getUserAuthRoutes(props) {
        let LoginComp = props.loginComp || this.state.loginComp; // Use custom or default login component
        let RegisterComp = props.registerComp || this.state.registerComp; // Use custom or default register component
        let routes = <Routes>
            <Route path={"/"} element={<LoginComp props={{ ...props }} />} />
            <Route path={"/login"} element={<LoginComp props={{ ...props }} />} />
            <Route path={"/register"} element={<RegisterComp props={{ ...props }} />} />
        </Routes>;
        return routes;
    }

    /**
     * Renders the Router component's HTML structure.
     * Dynamically determines the routes to render based on the application state and props.
     * @returns {JSX.Element} The rendered Router component.
     */
    getHtml() {
        let props = { ...this.props };
        props.app = this.app;
        let state = this.app?.state;
        let routes = this.props.routes || state?.routes;
        let renderRoutes = this.getRoutes(routes, props);

        return (
            <>{renderRoutes}</>
        );
    }
}

export default Router;