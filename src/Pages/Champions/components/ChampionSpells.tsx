import React, { FunctionComponent } from 'react';
import './ChampionSpells.css';

const ChampionSpells: FunctionComponent<{ spells: Array<Spell> }> = ({ spells }) => {
    return (
        <div className="champion-page-spells">
            {spells.map(({ image, name, description }) => {
                return (
                    <div className="champion-page-skill-group" key={name}>
                        <div className="champion-page-skill-item">
                            <div className="champion-page-skill-item-header">
                                <span>
                                    <img
                                        className="champion-page-skill-item-image"
                                        src={`https://ddragon.leagueoflegends.com/cdn/9.22.1/img/${image.group}/${image.full}`}
                                    />
                                </span>
                                <span className="champion-page-skill-item-name">{name}</span>
                            </div>
                            {description}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { ChampionSpells };
