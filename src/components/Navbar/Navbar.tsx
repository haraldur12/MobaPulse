import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../services';

import './Navbar.css';

const Navbar: FunctionComponent = props => {
    const [isActive, setActive] = useState(false);
    return (
        <AuthUserContext.Consumer>
            {(authUser: any) => {
                const { displayName = '' } = authUser;
                return (
                    <nav className={`navbar ${isActive ? 'active' : ''}`}>
                        <span onClick={(): void => setActive(!isActive)} className="toggle">
                            <i className="fa fa-reorder"></i>
                        </span>
                        <Link to="/">
                            <span className="brand">LoL Detay</span>
                        </Link>
                        <div className="left">
                            <Link to="/champions" className="link" onClick={(): void => setActive(false)}>
                                Sampiyonlar
                            </Link>
                            <Link to="/items" className="link" onClick={(): void => setActive(false)}>
                                Esyalar
                            </Link>
                            <Link to="/tutorials" className="link" onClick={(): void => setActive(false)}>
                                Rehberler
                            </Link>
                            <Link to="/questions" className="link" onClick={(): void => setActive(false)}>
                                Sorular
                            </Link>
                            <Link to="/rankings" className="link" onClick={(): void => setActive(false)}>
                                Siralamalar
                            </Link>
                        </div>
                        <div className="right">
                            <Link
                                to={displayName ? '/profile' : '/login'}
                                className="link"
                                onClick={(): void => setActive(false)}
                            >
                                {displayName ? displayName : 'Giris Yap'}
                            </Link>
                        </div>
                    </nav>
                );
            }}
        </AuthUserContext.Consumer>
    );
};
export { Navbar };
