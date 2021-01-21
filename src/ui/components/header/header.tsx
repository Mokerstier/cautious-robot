import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import $ from './header.module.scss';

interface ParamTypes {
    mainIndex: string;
    maintopicId: string;
    subtopicId: string;
    subIndex: string;
}

const Header: React.FC = () => {
    const history = useHistory();
    const {
        mainIndex, maintopicId, subtopicId,
    } = useParams<ParamTypes>();
    const firstLink = maintopicId;
    const firstText = firstLink && firstLink.split('_').join(', ');
    const secondLink = subtopicId;
    const secondText = secondLink && secondLink.split('_').join(', ');

    const linkTarget = {
        pathname: '/',
        state: 'query-home',
        search: history.location.search,
    };

    return (
        <header className={secondLink ? `${$.header} ${$.comment_view}` : $.header}>
            <h1>
                {firstLink ? (
                    secondText || firstText
                ) : (
                    'Dashboard'
                )}
            </h1>
            <nav className={$.navigation}>
                <ul>
                    {firstLink && (
                        <>
                            <li>
                                <Link
                                    to={linkTarget}
                                >
                                    Dashboard
                                </Link>
                                
                            </li>
                            <li className={!secondLink ? $.link_active : undefined}>
                                <Link
                                    to={`/${history.location.search}`}
                                >
                                    {firstText}
                                </Link>
                                
                            </li>
                        </>
                    )}
                    {secondLink && (
                        <li className={$.link_active}>
                            <Link
                                to={`/${history.location.search}`}
                            >
                                {secondText}
                            </Link>
                            
                            <span className={$.link_text}>Comments</span>
                        </li>
                    )}
                </ul>
            </nav>
            {/* @TODO: Enable this once the header can also read all the nodes active in the dashboard */}
            {/* <div className={$.extraInfo}>
                <TotalMessagesModule extended totalMessages={30} />
                <NpsModule />
            </div> */}
        </header>
    );
};

export default Header;
