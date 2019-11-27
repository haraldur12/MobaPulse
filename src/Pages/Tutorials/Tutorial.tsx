import React, { FunctionComponent, useEffect, useState } from 'react';
import './Tutorial.css';
import { withFirebase } from '../../services';
import { getChampion } from './utilities/getChampion';

const TutorialPage: FunctionComponent<{ firebase: any; match: any }> = props => {
    const tutorialId = props.match.params.id;
    const [tutorial, setTutorial] = useState<Tutorial>({
        champion: '',
        spells: {
            q: [],
            w: [],
            e: [],
            r: [],
        },
        description: '',
        createdAt: {
            seconds: 0,
        },
        itemIds: [],
        data: {},
        id: '',
    });
    const [championData, setChampionData] = useState<Champion>({
        name: '',
        spells: [],
        title: '',
        blurb: '',
        id: '',
        stats: {},
        lore: '',
        enemytips: [],
        allytips: [],
    });
    useEffect(() => {
        props.firebase.getDocumentById(tutorialId).then((doc: Tutorial) => {
            const { champion } = doc;
            getChampion(champion).then(data => {
                setTutorial(doc);
                setChampionData(data);
            });
        });
    }, []);
    const { champion, description, spells: spellsFormTutorial } = tutorial;
    const skillCount = Array(18).fill(null);
    const { spells } = championData;
    return (
        <div className="tutorial-page">
            <div className="tutorial-page-block">
                <div className="tutorial-page-header">{champion}</div>
                <div className="tutorial-page-description">{description}</div>
                {['q', 'w', 'e', 'r'].map((spell, index: number) => {
                    const currentSpellSet = spells[index] || {};
                    const { image = { group: '', full: '' } } = currentSpellSet;
                    return (
                        <div className="tutorial-page-skills" key={spell}>
                            <div className="tutorial-page-skill-row">
                                <img
                                    className="tutorial-page-skill-item-image"
                                    src={`http://ddragon.leagueoflegends.com/cdn/9.22.1/img/${image.group}/${image.full}`}
                                />
                                {skillCount.map((_, index) => (
                                    <div
                                        key={index}
                                        className={
                                            spellsFormTutorial[spell].includes(index)
                                                ? 'tutorial-page-skill-box-filled'
                                                : 'tutorial-page-skill-box'
                                        }
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Tutorial = withFirebase(TutorialPage);
export { Tutorial };