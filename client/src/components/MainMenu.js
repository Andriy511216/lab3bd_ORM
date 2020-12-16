import React, {Fragment} from 'react'
import './styles.css'
import { Card } from './Card'

export const MainMenu = () => {
    return (
        <Fragment>
            <div className="d-flex flex-wrap">
                <Card link="/students" tableName="students" img="Barca" />
                <Card link="/faculty" tableName="faculty" img="Messi2" />
                <Card link="/speciality" tableName="speciality" img="speciality" />
            </div>
        </Fragment>
    )
}

