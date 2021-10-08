import React, { Component } from 'react';
import Axios from 'axios';


export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            specialAttack: '',
            specialDefense: '',
            speed: ''
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: ''
    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonResponse = await Axios.get(pokemonUrl);

        const name = pokemonResponse.data.name;
        const imageUrl = pokemonResponse.data.sprites.front_default;

        let { hp, attack, defense, specialAttack, specialDefense, speed } = '';

        pokemonResponse.data.stats.map(stat => {

            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
            }
        });

        //Convert Decimeters to Feet
        const height = Math.round(pokemonResponse.data.height * 0.328084 + 0.0001) * 100 / 100;

        //Convert Hectograms to Lbs
        const weight = Math.round(pokemonResponse.data.weight * 0.220462 + 0.0001) * 100 / 100;

        const types = pokemonResponse.data.types.map(type => type.type.name);

        const abilities = pokemonResponse.data.abilities
            .map(ability => {
                return ability.ability.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            })
            .join(', ');

        const evs = pokemonResponse.data.stats
            .filter(stat => {
                if (stat.effort > 0) {
                    return true;
                }
                return false;
            })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}`;
            })
            .join(', ');

        await Axios.get(pokemonSpeciesUrl).then(response => {
            let description = '';
            response.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });
            const femaleRate = response.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * response.data['capture_rate']);

            const eggGroups = response.data['egg_groups']
                .map(group => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                })
                .join(', ');

            const hatchSteps = 255 * (response.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                specialAttack,
                specialDefense,
                speed
            },
            height,
            weight,
            abilities,

        })
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => {
                                        <span
                                            key={type}
                                            className="badge badge-pill mr-1">{type
                                            }</span>
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}